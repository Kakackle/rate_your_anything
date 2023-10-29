import { useState, useEffect } from 'react'
import { supabase } from '../client'
import AvatarNav from './AvatarNav'
import styled from 'styled-components'

const AccountDiv = styled.div`
// background-color: purple;
display: flex;
align-items: center;
gap: 10px;
font-size: 20px;
font-weight: 500;
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
        <AccountDiv>
            {username}
            <AvatarNav url={avatar_url} size={`75px`}></AvatarNav>
        </AccountDiv>
    )
}