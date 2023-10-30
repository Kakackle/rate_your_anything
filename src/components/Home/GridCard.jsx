import { useEffect, useState } from "react"
import { supabase } from "../../features/supabaseClient"
import { useNavigate } from 'react-router-dom'
import styled from "styled-components"

const Card = styled.div`
border: 1px solid black;
// border-radius: 9px;
width: 200px;
height: 300px;
// background-color: lightgray;
display: flex;
flex-direction: column;
padding: 5px;
`

const CardImg = styled.img`
width: 180px;
height: 180px;
align-self: center;
`

const CardBottom = styled.div`
padding: 5px;
`

const CardTitle = styled.p`
font-size: 20px;
`

export default function GridCard({post}){
    const [photoUrl, setPhotoUrl] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        let photo_url = post.photoUrl;
        if (photo_url) downloadImage(photo_url)
    }, [post.photoUrl])

    async function downloadImage(path) {
        try {
            const {data, error} = await supabase.storage.from('things').download(path)
            if (error){
                throw error
            }
            const url = URL.createObjectURL(data)
            setPhotoUrl(url)
        } catch(error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    // const navigateTest = () => {
    //     console.log(post);
    // }

    return (
        <>
        {
            post ? 
            <Card onClick={()=>navigate(`/posts/${post.id}`)}>
            {/* <Card onClick={navigateTest}> */}
                { post.photoUrl ? (
                    <CardImg src={post.photoUrl} alt="thing image"></CardImg>
                ):
                <p>No image to display</p>
                }
                {/* <p>{post.photoUrl}</p> */}
                <CardBottom>
                    <CardTitle>{post.name}</CardTitle>
                    <p>category: {post.category.name}</p>
                    <p>{post.avg_rating}</p>
                    <p>{post.created_at}</p>
                    <p>{post.author.username}</p>
                    {/* <p>{post.created_at}</p> */}
                </CardBottom>
            </Card>
            : ""
        }
        </>
    )
}