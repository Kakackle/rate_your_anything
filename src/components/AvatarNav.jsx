import { useEffect, useState } from 'react'
import { supabase } from '../client'
import styled from 'styled-components'

const ColorMain = styled.div`
background-color: teal;
`

export default function Avatar({ url, size}) {
    const [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(() => {
        if (url) downloadImage(url)
      }, [url])

    async function downloadImage(path) {
        try {
          const { data, error } = await supabase.storage.from('avatars').download(path)
          if (error) {
            throw error
          }
          const url = URL.createObjectURL(data)
          setAvatarUrl(url)
        } catch (error) {
          console.log('Error downloading image: ', error.message)
        }
    }    

    return (
        <ColorMain>
              {avatarUrl ? (
                <img
                src={avatarUrl}
                alt="Avatar"
                className="avatar image"
                style={{ height: size, width: size }}
                />
            ) : (
                <div className="avatar no-image" style={{ height: size, width: size }} />
            )}
        </ColorMain>
    )
}