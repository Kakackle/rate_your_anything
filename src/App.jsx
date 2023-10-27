import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import './App.css'

function App() {

  return (
    <>
      <NavBar></NavBar>
      <h1>Rate your stuff</h1>
      <Outlet></Outlet>
    </>
  )
}

export default App
