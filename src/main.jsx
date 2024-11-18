import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Create from './pages/Create.jsx'
import View from './pages/View.jsx'

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/posts/:postId" element={<View />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
