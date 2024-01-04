import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostCameraPricing() {
    const { currentCamera } = useOutletContext()
    return (
        <h3 className="host-camera-price">${currentCamera.price}<span>/day</span></h3>
    )
}