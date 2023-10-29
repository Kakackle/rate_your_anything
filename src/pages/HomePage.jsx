import '../App.css'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Auth from '../components/Auth'
import Account from '../components/Account'
import LogOut from '../components/LogOut'
import { useOutletContext } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../counter/counterSlice'

export default function HomePage() {
  const session = useOutletContext();
  const [users, setUsers] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const [posts, setPosts] = useState(null);

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

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
    // fetchUsers();

    const fetchPosts = async () => {
      const {postsData, postsError} = await supabase
      .from('posts')
      .select('*')

      if (postsError){
        console.log(postsError)
      }

      if(postsData){
        console.log('posts', postsData)
        setPosts(postsData);
      }
    }

    fetchPosts();
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
        {
          posts && (
            <ul>
              {posts.map(post => {
                return(
                  <li key={post.id}>
                    name: {post.name}, category: {post.category}
                  </li>
                )
              })}
            </ul>
          )
        }
        {/* counter */}
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
    </>
  )
}
