import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomePage from './pages/HomePage.jsx'
import AuthTestPage from './pages/AuthTestPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";

// const routes = []
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/about" element={<AboutPage></AboutPage>}></Route>
      <Route path="/authtest" element={<AuthTestPage></AuthTestPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
    </Route>
  )  
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
)
