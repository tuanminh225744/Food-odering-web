import React, { useState } from "react";
import './navbar.css';
import { useSelector } from "react-redux";

const Navbar = () => {
    const user = useSelector((state) => state.auth.login.currentUser.others);
    return (
        <>
            <nav className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item navbar-item--separate navbar-item--has-qr pb-2px">
                        <span>Vào cửa hàng</span>
                        {/* Ma QR */}
                        <div className="navbar-qr">
                            <img src="/assets/img/anh-tai-app/anhQR.png" alt="QR code" className="navbar-qr-img" />
                            <div className="navbar__qr-apps">
                                <a href="" className="navbar__qr-download-link">
                                    <img src="/assets/img/anh-tai-app/anh-app-store.png" alt="app-store" className="navbar__qr-download-img" />
                                </a>
                                <a href="" className="navbar__qr-download-link">
                                    <img src="/assets/img/anh-tai-app/google-play.png" alt="google-play" className="navbar__qr-download-img" />
                                </a>
                            </div>
                        </div>
                    </li>
                    <li className="navbar-item navbar-item--separate">
                        <a href="#" className="navbar-item--no-hover">Kết nối</a>
                        <a href="#" className="navbar-icon-link">
                            <i className="navbar-icon fa-brands fa-facebook"></i>
                        </a>
                        <a href="#" className="navbar-icon-link">
                            <i className="navbar-icon fa-brands fa-instagram"></i>
                        </a>
                    </li>
                </ul>

                <ul className="navbar-list">
                    <li className="navbar-item navbar-item--has-notify">
                        <a className="navbar-item-link" href="#">
                            <i className="navbar-icon fa-solid fa-bell"></i>
                            Thông báo
                        </a>
                        {/* cua so thong bao */}
                        {/* <div className="navbar__notify">
                            <header className="navbar__notify-header">
                                <p>Thông báo mới nhận</p>
                            </header>
                            <ul className="navbar__notify-list">
                                <li className="navbar__notify-item">
                                    <a href="#" className="navbar__notify-link">
                                        <img src="/assets/img/anh-thong-bao/anh-my-pham.jpg" alt="" className="navbar__notify-img" />
                                        <div className="navbar__notify-info">
                                            <span className="navbar__notify-name">
                                                Mỹ phẩm chính hãng
                                            </span>
                                            <span className="navbar__notify-description">
                                                Mô tả mỹ phẩm
                                            </span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <div>
                                <footer className="navbar__notify-footer">
                                    <a href="" className="navbar__notify-footer-btn">Xem tất cả</a>
                                </footer>
                            </div>
                        </div> */}
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-item-link" href="#">
                            <i className="navbar-icon fa-solid fa-circle-question"></i>
                            Trợ giúp
                        </a>
                    </li>
                    <li className="navbar-item navbar-user">
                        <img
                            src={user.userImgURL || "/assets/img/anh_user/default-user.jpg"}
                            alt=""
                            className="navbar-user-img"
                        />
                        <span className="navbar-user-name">{user.username}</span>
                        <ul className="navbar-user-menu">
                            <li className="navbar-user-item navbar-user-item--user-profile-btn">
                                <a href="#">Tài khoản của tôi</a>
                            </li>
                            <li className="navbar-user-item navbar-user-item--order-btn">
                                <a href="#">Đơn mua</a>
                            </li>
                            <li className="navbar-user-item navbar-user-item--logout-btn navbar-user-item--separate">
                                <a href="#">Đăng xuất</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
