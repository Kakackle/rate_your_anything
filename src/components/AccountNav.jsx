import { useState, useEffect } from 'react'
import { supabase } from '../client'
import AvatarNav from './AvatarNav'
import styled from 'styled-components'

const ColorMain = styled.div`
background-color: purple;
`


export default function AccountNav({session}){
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        async function getProfile() {
          setLoading(true)
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

    return (
        <ColorMain>
            {username}
            <AvatarNav url={avatar_url} size={`75px`}></AvatarNav>
        </ColorMain>
    )
}