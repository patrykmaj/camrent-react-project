import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Cameras from "./pages/Cameras/Cameras"
import CameraDetail from "./pages/Cameras/CameraDetail"
import Login from "./pages/Login"
import Dashboard from "./pages/Host/Dashboard"
import HostCameras from "./pages/Host/HostCameras"
import HostCameraDetail from "./pages/Host/HostCameraDetail"
import HostCameraInfo from "./pages/Host/HostCameraInfo"
import HostCameraPricing from "./pages/Host/HostCameraPricing"
import HostCameraMovie from "./pages/Host/HostCameraMovie"
import NotFound from "./pages/NotFound"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import AuthRequired from "./components/AuthRequired"

function App() {

  return (
    <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />  
          <Route path="cameras" element={<Cameras />} />
          <Route path="cameras/:id" element={<CameraDetail />} />
        
          <Route path="login" element={<Login />}/>
          
          {/* You need log in to display all below */}
          <Route element={<AuthRequired />}> 
            <Route path="user" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="cameras" element={<HostCameras />} />
              <Route path="cameras/:id" element={<HostCameraDetail />}>
                <Route index element={<HostCameraInfo />} />
                <Route path="pricing" element={<HostCameraPricing />} />
                <Route path="movies" element={<HostCameraMovie />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);