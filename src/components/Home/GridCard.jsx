import { useEffect, useState } from "react"
import { supabase } from "../../features/supabaseClient"
import { useNavigate, useOutletContext } from 'react-router-dom'
import styled from "styled-components"

import calc_avg from "../../utils/calc_avg.js"

const Card = styled.div`
border: 1px solid black;
// border-radius: 9px;
width: 200px;
height: 320px;
// background-color: lightgray;
display: flex;
flex-direction: column;
padding: 5px;
position: relative;
`

const CardImg = styled.img`
width: 180px;
height: 180px;
// object-fit: contain;
align-self: center;
// background-color: var(--almost-black);
`

const CardBottom = styled.div`
padding: 5px;
font-size: 14px;
`

const CardTitle = styled.p`
font-size: 20px;
&:hover{
    cursor: pointer;
    text-decoration: underline;
}
`

const FavButton = styled.button`
position: absolute;
top: 0;
right: 0;
width: 30px;
height: 30px;
background-color: var(--almost-white);
border: 1px solid var(--almost-black);
&:hover{
    cursor: pointer;
    filter: brightness(0.75);
}
`

const iconStyle = {
    height: 25,
    width: 25,
    color: 'var(--color-2)'
}

export default function GridCard({post}){
    const session = useOutletContext();
    const navigate = useNavigate();
    const [favAdded, setFavAdded] = useState(false);
    const [favourites, setFavourites] = useState(null);
    const [userInFav, setUserInFav] = useState(false);

    useEffect(()=>{
        async function fetchFavourites(){
            const {data, error} = await supabase
            .from('favourites')
            .select(
                `id, created_at,
                user(
                    id,
                    username
                ),
                post(id)`
                )
            .eq('post.id', post.id)

            if(error){
                console.log(error);
            }

            if(data){
                setFavourites(data);
                if (session) {
                    data.forEach(fav=>{
                        if (session.user.id === fav.user.id){
                            setUserInFav(true);
                        }
                        else { setUserInFav(false); }
                    })
                }
                
            }
        }
        fetchFavourites();
    },[session, favAdded])

    async function addToFavs() {
        if(session){

        const {user} = session

        const {data, error} = await supabase
        .from('favourites')
        .insert([
            {
                user: user.id,
                post: post.id,
            }
        ])
        .select()

        if(error){
            console.log(error);
        }
        if(data){
            console.log(data);
        }
        setFavAdded(prevAdded => !prevAdded);
        }
    }

    async function removeFromFavs() {
        if(session){
            const {user} = session;

            const {data, error} = await supabase
            .from('favourites')
            .delete()
            .eq('post', post.id)

            if(error){console.log(error);}

            if(data){console.log(data);}

            setFavAdded(prevAdded => !prevAdded);
        }
    }

    return (
        <>
        {
            post ?
            <Card>
            {/* <Card onClick={navigateTest}> */}
                { post.photoUrl ? (
                    <CardImg src={post.photoUrl} alt="thing image"></CardImg>
                ):
                <p>No image to display</p>
                }
                {/* <p>{post.photoUrl}</p> */}
                <CardBottom>
                    <CardTitle onClick={()=>navigate(`/posts/${post.id}`)}
                    >{post.name}</CardTitle>
                    {post.category && <p>category: {post.category.name}</p>}
                    <p>Avg.: {calc_avg(post, post.ratings)}</p>
                    <p>{new Date(post.created_at).toDateString()}</p>
                    <p>{post.author.username}</p>
                    {/* <p>{post.created_at}</p> */}
                </CardBottom>
                {
                    !userInFav ?
                    <FavButton onClick={addToFavs}>
                    <ion-icon name="heart-outline"
                    style={iconStyle}></ion-icon>
                    </FavButton>
                    :
                    <FavButton onClick={removeFromFavs}>
                    <ion-icon name="heart"
                    style={iconStyle}></ion-icon>
                    </FavButton>
                }
                
            </Card>
            : ""
        }
        </>
    )
}