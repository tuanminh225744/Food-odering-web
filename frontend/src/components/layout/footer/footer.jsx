import React from "react";
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="grid">
                <div className="grid__row">
                    <div className="grid__column-2-4">
                        <h3 className="footer-heading">Chăm sóc khách hàng</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="#" className="footer-item__link">Trung tâm trợ giúp</a>
                            </li>
                            <li className="footer-item">
                                <a href="#" className="footer-item__link">Shopee mall</a>
                            </li>
                            <li className="footer-item">
                                <a href="#" className="footer-item__link">Hướng dẫn mua hàng</a>
                            </li>
                        </ul>
                    </div>

                    <div className="grid__column-2-4">
                        <h3 className="footer-heading">Giới thiệu</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="#" className="footer-item__link">Giới thiệu</a>
                            </li>
                            <li className="footer-item">
                                <a href="#" className="footer-item__link">Tuyển dụng</a>
                            </li>
                            <li className="footer-item">
                                <a href="#" className="footer-item__link">Điều khoản</a>
                            </li>
                        </ul>
                    </div>

                    <div className="grid__column-2-4"></div>
                    <div className="grid__column-2-4"></div>

                    <div className="grid__column-2-4">
                        <h3 className="footer-heading">Theo dõi chúng tôi</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="#" className="footer-item__link">
                                    <i className="footer-item-icon fa-brands fa-facebook"></i>
                                    Facebook
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="#" className="footer-item__link">
                                    <i className="footer-item-icon fa-brands fa-instagram"></i>
                                    Instagram
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="#" className="footer-item__link">
                                    <i className="footer-item-icon fa-brands fa-linkedin"></i>
                                    Linkedin
                                </a>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        </footer>
    );
};

export default Footer;
