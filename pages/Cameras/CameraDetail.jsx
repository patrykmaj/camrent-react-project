import React from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { getCamera } from "../../api"

export default function CameraDetail() {
    const [camera, setCamera] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const { id } = useParams()
    const location = useLocation()

    React.useEffect(() => {
        async function loadCameras() {
            setLoading(true)
            try {
                const data = await getCamera(id)
                setCamera(data)
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

    const search = location.state?.search || "";
    const type = location.state?.type || "all";
    
    return (
        <div className="camera-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} cameras</span></Link>
            
            {camera && (
                <div className="camera-detail">
                    <img src={camera.imageUrl} />
                    <i className={`camera-type ${camera.type} selected`}>
                        {camera.type}
                    </i>
                    <h2>{camera.name}</h2>
                    <p className="camera-price"><span>${camera.price}</span>/day</p>
                    <p>{camera.description}</p>
                    <button className="link-button">Rent this camera</button>
                </div>
            )}
        </div>
    )
}