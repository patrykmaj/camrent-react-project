import React from "react"
import { Link, NavLink } from "react-router-dom"
import loginImageUrl from "/assets/images/avatar-icon.png"
import logoutImageUrl from "/assets/images/logout-icon.png"

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    function fakeLogOut() {
        localStorage.removeItem("loggedin")
        location.reload();
    }

    return (
        <header>
            <Link className="site-logo" to="/">CAMRENT</Link>
            <nav>
                <NavLink
                    to="/cameras"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Cameras
                </NavLink>
                <Link to="/user" className="login-link">
                    <img
                        src={loginImageUrl}
                        className="login-icon"
                    />
                </Link>
                {(localStorage.getItem('loggedin')==null)?
                null:
                <Link to="login" className="login-link" onClick={fakeLogOut}>
                    <img
                        src={logoutImageUrl}
                        className="login-icon"
                    />
                </Link>}
            </nav>
        </header>
    )
}