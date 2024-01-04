import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getCameras } from "../../api"

export default function Cameras() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [cameras, setCameras] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const typeFilter = searchParams.get("type")

    React.useEffect(() => {
        async function loadCameras() {
            setLoading(true)
            try {
                const data = await getCameras()
                setCameras(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        loadCameras()
    }, [])

    const displayedCameras = typeFilter
        ? cameras.filter(camera => camera.type === typeFilter)
        : cameras

    const cameraElements = displayedCameras.map(camera => (
        <div key={camera.id} className="camera-tile">
            <Link
                to={camera.id}
                state={{
                    search: `?${searchParams.toString()}`,
                    type: typeFilter
                }}
            >
                <img src={camera.imageUrl} />
                <div className="camera-info">
                    <h3>{camera.name}</h3>
                    <p>${camera.price}<span>/day</span></p>
                </div>
                <i className={`camera-type ${camera.type} selected`}>{camera.type}</i>
            </Link>
        </div>
    ))

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <div className="camera-list-container">
            <h1>Explore our camera options</h1>
            <div className="camera-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange("type", "digital")}
                    className={
                        `camera-type digital 
                        ${typeFilter === "digital" ? "selected" : ""}`
                    }
                >Digital</button>
                <button
                    onClick={() => handleFilterChange("type", "movie")}
                    className={
                        `camera-type movie 
                        ${typeFilter === "movie" ? "selected" : ""}`
                    }
                >Movie</button>
                <button
                    onClick={() => handleFilterChange("type", "sport")}
                    className={
                        `camera-type sport 
                        ${typeFilter === "sport" ? "selected" : ""}`
                    }
                >Sport</button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="camera-type clear-filters"
                    >Clear filter</button>
                ) : null}

            </div>
            <div className="camera-list">
                {cameraElements}
            </div>
        </div>
    )
}