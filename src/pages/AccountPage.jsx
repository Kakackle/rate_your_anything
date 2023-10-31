import { useState, useEffect } from 'react'
import { supabase } from '../features/supabaseClient'
import Avatar from '../components/AccountPage/Avatar'
import { useOutletContext } from 'react-router-dom'
import styled from 'styled-components'

const Main = styled.main`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
gap: 10px;
width: 100%;
`

const Form = styled.form`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
gap: 10px;
width: 100%;
`

export default function Account() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
//const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const session = useOutletContext();

  useEffect(() => {
    async function getProfile() {
      setLoading(true)
      if (!session){
        return
      }
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setUsername(data.username)
        // setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }

      setLoading(false)
    }

    getProfile()
  }, [session])

  async function updateProfile(event, avatarUrl) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username: username,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <Main>
    { session ? 
    <Form onSubmit={updateProfile} className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Upload a new avatar:</p>
        <Avatar
        url={avatar_url}
        size={150}
        onUpload={(event, url) => {
            updateProfile(event, url)
        }}
        />
      </div>

      <div>
        <button className="button block primary" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </Form>
    :
    <p>Log in first!</p>
    }
    </Main>
  
  )
    }