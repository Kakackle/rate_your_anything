import { Outlet } from 'react-router-dom'
import NavBar from './components/Nav/NavBar'
import './App.css'
import {useState, useEffect} from 'react'
import {supabase} from './features/supabaseClient'


function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  return (
    <>
      <NavBar session={session}></NavBar>
      {/* <h1>Rate your stuff</h1> */}
      {/* <Outlet session={session}></Outlet> */}
      <Outlet context={session}></Outlet>
    </>
  )
}

export default App
