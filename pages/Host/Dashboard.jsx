import React from "react"
import { Link } from "react-router-dom"
import { getUserCameras } from "../../api"

export default function Dashboard() {
    const [cameras, setCameras] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    React.useEffect(() => {
        setLoading(true)
        getUserCameras()
            .then(data => setCameras(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    function renderCameraElements(cameras) {
        const hostCamerasEls = cameras.map((camera) => (
            <div className="host-camera-single" key={camera.id}>
                <img src={camera.imageUrl} alt={`Photo of ${camera.name}`} />
                <div className="host-camera-info">
                    <h3>{camera.name}</h3>
                    <p>${camera.price}/day</p>
                </div>
                <Link to={`cameras/${camera.id}`}>View</Link>
            </div>
        ))

        return (
            <div className="host-cameras-list">
                <section>{hostCamerasEls}</section>
            </div>
        )
    }

    // if (loading) {
    //     return <h1>Loading...</h1>
    // }

    if (error) {
        return <h1>Error: {error.message}</h1>
    }

    return (
        <>
            <div className="host-dashboard-info">
                <h1>Welcome!</h1>
            </div>
            <section className="host-dashboard-cameras">
                <div className="top">
                    <h2>Your listed cameras</h2>
                    <Link to="cameras">View all</Link>
                </div>
                {
                    loading && !cameras
                    ? <h1>Loading...</h1>
                    : (
                        <>
                            {renderCameraElements(cameras)}
                        </>
                    )
                }
                {/*<React.Suspense fallback={<h3>Loading...</h3>}>
                    <Await resolve={loaderData.cameras}>{renderCameraElements}</Await>
                </React.Suspense>*/}
            </section>
        </>
    )
}
