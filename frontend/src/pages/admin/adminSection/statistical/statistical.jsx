import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../api/axiosClient';
import './statistical.css';

function Statistical() {
    const [stats, setStats] = useState({
        userCount: 0,
        orderCount: 0,
        productCount: 0,
        totalRevenue: 0,
        bestProduct: null,
        worstProduct: null,
        monthlyRevenue: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosClient.get('/statistical');
                setStats(res.data);
            } catch (error) {
                setStats({
                    userCount: 0,
                    orderCount: 0,
                    productCount: 0,
                    totalRevenue: 0,
                    bestProduct: null,
                    worstProduct: null,
                    monthlyRevenue: []
                });
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="grid__column-10">
            <div className="admin__content">
                <h1 className="admin__content-heading">Thống kê tổng quan</h1>
                <div className="admin__stat-cards">
                    <div className="admin__stat-card">
                        <h3>Tổng người dùng</h3>
                        <div className="admin__stat-value">{stats.userCount}</div>
                    </div>
                    <div className="admin__stat-card">
                        <h3>Tổng đơn hàng</h3>
                        <div className="admin__stat-value">{stats.orderCount}</div>
                    </div>
                    <div className="admin__stat-card">
                        <h3>Tổng sản phẩm</h3>
                        <div className="admin__stat-value">{stats.productCount}</div>
                    </div>
                    <div className="admin__stat-card">
                        <h3>Tổng doanh thu</h3>
                        <div className="admin__stat-value">{stats.totalRevenue.toLocaleString()}₫</div>
                    </div>
                </div>
                {/* <div className="admin__stat-cards">
                    <div className="admin__stat-card">
                        <h3>Sản phẩm bán chạy nhất</h3>
                        <div className="admin__stat-value">
                            {stats.bestProduct
                                ? `${stats.bestProduct.name} (${stats.bestProduct.totalSold} lượt mua)`
                                : 'Không có dữ liệu'}
                        </div>
                    </div>
                    <div className="admin__stat-card">
                        <h3>Sản phẩm ít được mua</h3>
                        <div className="admin__stat-value">
                            {stats.worstProduct
                                ? `${stats.worstProduct.name} (${stats.worstProduct.totalSold} lượt mua)`
                                : 'Không có dữ liệu'}
                        </div>
                    </div>
                </div> */}
                <div className="admin__stat-chart">
                    <h3>Bảng doanh thu theo tháng</h3>
                    <table className="admin__stat-table">
                        <thead>
                            <tr>
                                <th>Tháng</th>
                                <th>Doanh thu</th>
                                <th>Số đơn nhận</th>
                                <th>Số đơn hủy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.monthlyRevenue && stats.monthlyRevenue.length > 0 ? (
                                stats.monthlyRevenue.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.total.toLocaleString()}₫</td>
                                        <td>{item.deliveredCount || 0}</td>
                                        <td>{item.cancelledCount || 0}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>Không có dữ liệu</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Statistical;
