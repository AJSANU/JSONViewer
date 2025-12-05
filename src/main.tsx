import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import JsonViewerPage from './pages/JsonViewer'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Home /> },
    { path: 'viewer', element: <JsonViewerPage /> },
  ]}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
