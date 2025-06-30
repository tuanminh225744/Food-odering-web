import React, { useState } from 'react'
import './adminSection.css'
import Category from './category/category'
import UserTable from './userTable/userTable'
import ProductTable from './productTable/productTable'
import OrderTable from './orderTable/orderTable'
import Statistical from './statistical/statistical'

function AdminSection() {

    const [currentSection, setCurrentSection] = useState('products');



    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row app__content">
                    <Category currentSection={currentSection} setCurrentSection={setCurrentSection} />

                    {currentSection === 'products' && (
                        <ProductTable />
                    )}
                    {currentSection === 'orders' && (
                        <OrderTable />
                    )}
                    {currentSection === 'users' && (
                        <UserTable />
                    )}
                    {currentSection === 'statistical' && (
                        <Statistical />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminSection