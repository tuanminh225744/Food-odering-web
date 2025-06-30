import React, { useEffect, useState } from 'react'
import './productTable.css'
import axiosClient from '../../../../api/axiosClient'

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [showCreate, setShowCreate] = useState(false);
    const [createForm, setCreateForm] = useState({
        name: '',
        price: '',
        imageUrl: '',
        saleOffPrecent: 0,
        description: '',
        quantity: 0,
        category: '',
        type: ''
    });
    const [search, setSearch] = useState('');

    const fetchProducts = async (searchValue = '') => {
        try {
            const res = await axiosClient.get('/food', {
                params: searchValue ? { search: searchValue } : {}
            });
            setProducts(res.data || []);
        } catch (error) {
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
        try {
            await axiosClient.delete(`/food/${productId}`);
            setProducts(prev => prev.filter(p => p._id !== productId));
        } catch (error) {
            alert('Xóa sản phẩm thất bại!');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setEditForm({
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            saleOffPrecent: product.saleOffPrecent || 0,
            description: product.description || '',
            quantity: product.quantity,
            category: product.category || '',
            type: product.type || ''
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.put(`/food/${editingProduct._id}`, editForm);
            fetchProducts();
            setEditingProduct(null);
        } catch (error) {
            alert('Cập nhật sản phẩm thất bại!');
        }
    };

    const handleEditCancel = () => {
        setEditingProduct(null);
    };

    // Tạo sản phẩm mới
    const handleCreateChange = (e) => {
        const { name, value } = e.target;
        setCreateForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/food', createForm);
            fetchProducts();
            setShowCreate(false);
            setCreateForm({
                name: '',
                price: '',
                imageUrl: '',
                saleOffPrecent: 0,
                description: '',
                quantity: 0,
                category: '',
                type: ''
            });
        } catch (error) {
            alert('Tạo sản phẩm thất bại!');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts(search.trim());
    };

    return (
        <div className="grid__column-10">
            <div className="admin__content">
                <h1 className="admin__content-heading">Quản lý sản phẩm</h1>
                <div id="admin__table">
                    <form className="admin__content-search" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="admin__content-search-input"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button className="admin__content-search-btn" type="submit">Tìm kiếm</button>
                    </form>
                    <button
                        className="btn btn-primary"
                        id="addProductBtn"
                        onClick={() => setShowCreate(true)}
                        style={{ marginBottom: 16 }}
                    >
                        + Thêm sản phẩm
                    </button>
                    <div className="admin__content-table">
                        <table className="admin__content-table-list" id="productTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>% Giảm giá</th>
                                    <th>Số lượng</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>
                                            <img
                                                src={product.imageUrl}
                                                className="admin__content-table-img"
                                                alt={product.name}
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.price?.toLocaleString()}₫</td>
                                        <td>{product.saleOffPrecent || 0}%</td>
                                        <td>{product.quantity || 0}</td>
                                        <td>
                                            <button
                                                className="admin__content-table-btn pr-13px mb-2px"
                                                onClick={() => handleEdit(product)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="admin__content-table-btn"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Modal/Form sửa sản phẩm */}
                    {editingProduct && (
                        <div className="order-modal">
                            <div className="order-modal-content">
                                <h2>Sửa sản phẩm</h2>
                                <form onSubmit={handleEditSubmit}>
                                    <div className="form-group">
                                        <label>Tên sản phẩm</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả</label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={editForm.description}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Giá</label>
                                        <input
                                            type="number"
                                            name="price"
                                            className='admin__content-product-table-input'
                                            value={editForm.price}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Hình ảnh (URL)</label>
                                        <input
                                            type="text"
                                            name="imageUrl"
                                            value={editForm.imageUrl}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>% Giảm giá</label>
                                        <input
                                            type="number"
                                            name="saleOffPrecent"
                                            className='admin__content-product-table-input'
                                            value={editForm.saleOffPrecent}
                                            onChange={handleEditChange}
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Số lượng</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            className='admin__content-product-table-input'
                                            value={editForm.quantity || 0}
                                            min="0"
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Loại</label>
                                        <input
                                            type="text"
                                            name="type"
                                            value={editForm.type}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </div>

                                    <div style={{ marginTop: 16 }}>
                                        <button type="submit" className="admin__content-table-btn">Lưu</button>
                                        <button type="button" className="admin__content-table-btn" style={{ background: '#888' }} onClick={handleEditCancel}>Hủy</button>
                                    </div>
                                </form>
                            </div>
                            <div className="order-modal-overlay" onClick={handleEditCancel}></div>
                        </div>
                    )}
                    {/* Modal/Form tạo sản phẩm */}
                    {showCreate && (
                        <div className="order-modal">
                            <div className="order-modal-content">
                                <h2>Thêm sản phẩm mới</h2>
                                <form onSubmit={handleCreateSubmit}>
                                    <div className="form-group">
                                        <label>Tên sản phẩm</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={createForm.name}
                                            onChange={handleCreateChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả</label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={createForm.description}
                                            onChange={handleCreateChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Giá</label>
                                        <input
                                            type="number"
                                            name="price"
                                            className='admin__content-product-table-input'
                                            value={createForm.price}
                                            onChange={handleCreateChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Hình ảnh (URL)</label>
                                        <input
                                            type="text"
                                            name="imageUrl"
                                            value={createForm.imageUrl}
                                            onChange={handleCreateChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>% Giảm giá</label>
                                        <input
                                            type="number"
                                            name="saleOffPrecent"
                                            className='admin__content-product-table-input'
                                            value={createForm.saleOffPrecent}
                                            onChange={handleCreateChange}
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Số lượng</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            className='admin__content-product-table-input'
                                            value={createForm.quantity || 0}
                                            min="0"
                                            onChange={handleCreateChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Loại</label>
                                        <input
                                            type="text"
                                            name="type"
                                            value={createForm.type}
                                            onChange={handleCreateChange}
                                            required
                                        />
                                    </div>
                                    <div style={{ marginTop: 16 }}>
                                        <button type="submit" className="admin__content-table-btn">Tạo</button>
                                        <button type="button" className="admin__content-table-btn" style={{ background: '#888' }} onClick={() => setShowCreate(false)}>Hủy</button>
                                    </div>
                                </form>
                            </div>
                            <div className="order-modal-overlay" onClick={() => setShowCreate(false)}></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductTable