import React from "react"
import { useParams, Link, NavLink, Outlet } from "react-router-dom"
import { getCamera } from "../../api"

export default function HostCameraDetail() {
    const [currentCamera, setCurrentCamera] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const { id } = useParams()
    {/* Loading Cameras list */}
    React.useEffect(() => {
        async function loadCameras() {
            setLoading(true)
            try {
                const data = await getCamera(id)
                setCurrentCamera(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadCameras()
    }, [id])

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }
    {/* active current menu position styling */}
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all cameras</span></Link> {/* back arrow */}
            {currentCamera &&
                <div className="host-camera-detail-layout-container">
                    <div className="host-camera-detail">
                        <img src={currentCamera.imageUrl} />
                        <div className="host-camera-detail-info-text">
                            <i className={`camera-type camera-type-${currentCamera.type}`}>
                                {currentCamera.type} camera
                            </i>
                            <h3>{currentCamera.name}</h3>
                            <h4>${currentCamera.price}/day</h4>
                        </div>
                    </div>

                    <nav className="host-camera-detail-nav">
                        <NavLink
                            to="."
                            end
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Details
                    </NavLink>
                        <NavLink
                            to="pricing"
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Pricing
                    </NavLink>
                        <NavLink
                            to="movies"
                            style={({ isActive }) => isActive ? activeStyles : null}
                        >
                            Movies
                    </NavLink>
                    </nav>
                    <Outlet context={{ currentCamera }} />
                </div>}
        </section>
    )
}
