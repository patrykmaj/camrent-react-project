import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostCameraMovie() {
    const { currentCamera } = useOutletContext()
    return (
        <>
        {currentCamera.moviesUrl?<a className="host-camera-movies" href={currentCamera.moviesUrl} target="_blank">Click to see movies shot on that camera</a>:<p>No movie yet</p>}
        </>
    )
}