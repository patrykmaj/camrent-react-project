import React from "react"
import { Link } from "react-router-dom"
import { getUserCameras } from "../../api"

export default function HostCameras() {
    const [cameras, setCameras] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function loadCameras() {
            setLoading(true)
            try {
                const data = await getUserCameras()
                setCameras(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadCameras()
    }, [])

    const hostCamerasEls = cameras.map(camera => (
        <Link
            to={camera.id}
            key={camera.id}
            className="host-camera-link-wrapper"
        >
            <div className="host-camera-single" key={camera.id}>
                <img src={camera.imageUrl} alt={`Photo of ${camera.name}`} />
                <div className="host-camera-info">
                    <h3>{camera.name}</h3>
                    <p>${camera.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <section>
            <h1 className="host-cameras-title">Your listed cameras</h1>
            <div className="host-cameras-list">
                {
                    cameras.length > 0 ? (
                        <section>
                            {hostCamerasEls}
                        </section>

                    ) : (
                            <h2>Loading...</h2>
                        )
                }
            </div>
        </section>
    )
}