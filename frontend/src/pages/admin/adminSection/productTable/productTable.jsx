import React from 'react'
import './productTable.css'

function ProductTable({ products, onEdit, onDelete }) {
    return (
        <div className="grid__column-10">
            <div className="admin__content">
                <h1 className="admin__content-heading">Quản lý sản phẩm</h1>

                <div id="admin__table">
                    <div className="admin__content-search">
                        <input
                            type="text"
                            className="admin__content-search-input"
                            placeholder="Tìm kiếm sản phẩm..."
                        />
                        <button className="admin__content-search-btn">Tìm kiếm</button>
                    </div>

                    <button className="btn btn-primary" id="addProductBtn">
                        + Thêm sản phẩm
                    </button>

                    <div className="admin__content-table">
                        <table className="admin__content-table-list" id="productTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Hình ảnh</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <img
                                                src={product.image}
                                                className="admin__content-table-img"
                                                alt={product.name}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="admin__content-table-btn"
                                                onClick={() => onEdit(product)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="admin__content-table-btn"
                                                onClick={() => onDelete(product.id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductTable