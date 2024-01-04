import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const [error, setError] = React.useState(null)

    const location = useLocation() 
    const navigate = useNavigate()

    const from = (location.state?.from == "/login" ? "/user":location.state?.from) || "/user";

    function handleSubmit(e) {
        e.preventDefault()
        // fake log in logic
        if(loginFormData.email == "admin@admin.com" && loginFormData.password == "admin"){
            localStorage.setItem("loggedin", true)
            navigate(from, { replace: true })
            window.location.reload()
        }else{
            setError("Wrong login data!")
        }
        
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            {
                // "you must log in" message conditional render
                location.state?.message &&
                    <h3 className="login-error">{location.state.message}</h3> 
            }
            <h1>Sign in to your account</h1>
            { 
                // error conditional render
                error && <h3 className="login-error">{error}</h3>
            }
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email address (admin@admin.com)"
                    onChange={handleChange}
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password (admin)"
                    onChange={handleChange}
                    value={loginFormData.password}
                />
                <button>Log in</button>
            </form>
        </div>
    )

}