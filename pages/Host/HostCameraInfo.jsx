import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostCameraInfo() {
    const { currentCamera } = useOutletContext()
    
    return (
        <section className="host-camera-detail-info">
            <h4>Name: <span>{currentCamera.name}</span></h4>
            <h4>Category: <span>{currentCamera.type}</span></h4>
            <h4>Description: <span>{currentCamera.description}</span></h4>
        </section>
    )
}