import '../App.css'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Auth from '../components/Auth'
import Account from '../components/Account'
import LogOut from '../components/LogOut'
import { useOutletContext } from 'react-router-dom'

export default function HomePage() {
  const session = useOutletContext();
  const [users, setUsers] = useState(null)
  const [fetchError, setFetchError] = useState(null);

  useEffect(()=>{
    const fetchUsers = async () => {
      const {data, error} = await supabase
      .from('profiles')
      .select()
  
      if(error){ 
      console.log(error)
      setFetchError(error)
      }
  
      if (data) {
        setUsers(data);
      }
    }
    fetchUsers()
  }, [])
  

  return (
    // <div className="container" style={{ padding: '50px 0 100px 0' }}>
    //   {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    // </div>
    <>
        <h1>Home page</h1>
        {session? <LogOut></LogOut> : ""}
        { fetchError && (<p>{fetchError}</p>)}
        { users && (
          <ul>
            {users.map(user => {
              return(
                <li key={user.id}>
                  {user.username}
                </li>
              )
            })}
          </ul>
        )}
    </>
  )
}
