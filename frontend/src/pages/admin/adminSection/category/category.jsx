import React from 'react'
import './category.css'

function Category({ currentSection, setCurrentSection }) {
    return (
        <div className="grid__column-2">
            <nav className="category mt32">
                <h3 className="category-heading">
                    <i className="category-heading-icon fa-solid fa-bars"></i>
                    Menu
                </h3>
                <ul className="category-list">
                    <li className={`category-item ${currentSection === 'products' ? 'category-item--active' : ''}`}>
                        <button className="category-item-link" onClick={() => setCurrentSection('products')}>
                            Quản lý sản phẩm
                        </button>
                    </li>
                    <li className={`category-item ${currentSection === 'orders' ? 'category-item--active' : ''}`}>
                        <button className="category-item-link" onClick={() => setCurrentSection('orders')}>
                            Quản lý đơn hàng
                        </button>
                    </li>
                    <li className={`category-item ${currentSection === 'users' ? 'category-item--active' : ''}`}>
                        <button className="category-item-link" onClick={() => setCurrentSection('users')}>
                            Quản lý khách hàng
                        </button>
                    </li>
                    <li className={`category-item ${currentSection === 'statistical' ? 'category-item--active' : ''}`}>
                        <button className="category-item-link" onClick={() => setCurrentSection('statistical')}>
                            Thống kê
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Category