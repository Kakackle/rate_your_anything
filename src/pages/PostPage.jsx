import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../features/supabaseClient";
import styled from "styled-components";

import Ratings from "../components/PostPage/Ratings";

const calc_avg = function (post, ratings){
    let val = parseInt(post.avg_rating);
    ratings.forEach((rat)=>{
        val += parseInt(rat.value);
    })
    // console.log('val: ', val);
    console.log('calc_avg: ', val/(ratings.length + 1));
    return val/(ratings.length + 1);
}

export default function PostPage(){
    const {post_id} = useParams();
    const [post, setPost] = useState(null);
    const [avgRating, setAvgRating] = useState(0);
    useEffect(()=>{
        // console.log(post_id);
        const fetchPost = async () => {
            const {data: postData, postError} = await supabase
            .from('posts')
            .select(
                `created_at, avg_rating, description, author, photoUrl, name,
                category (
                  id,
                  name
                ),
                author (
                  username,
                  full_name
                ),
                ratings(
                    value,
                    author
                )
                `
            )
            .eq('id', post_id)
            .maybeSingle()

            if(postError){
                console.log(postError)
            }

            if(postData){
                // console.log(postData)
                // console.log(postData.ratings);
                setPost(postData);
                setAvgRating(calc_avg(postData, postData.ratings));
            }
        }

        fetchPost();
    }, [])

    return (
        <Main>
        <Post>
        {   post ?
            <Post>
                <Title>{post.name}</Title>
                <PostImg src={post.photoUrl}></PostImg>
                <PostBottom>
                    <BottomTop>
                        <BottomTopLeft>
                            <p>by: {post.author.username}</p>
                            <p>| {post.created_at}</p>
                        </BottomTopLeft>
                        <Score>Avg.: {avgRating}/5</Score>
                    </BottomTop>
                    {post.description}
                </PostBottom>
            </Post>
            : <p>No post to display</p> 
        }
        </Post>
        <Ratings post_id={post_id}>
        </Ratings>
        </Main>
    )
}

const Main = styled.main`
padding: 20px;
display: flex;
gap: 20px;
flex-wrap: wrap;
`

const Post = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`

const PostImg = styled.img`
max-width: 600px;
width: 100%;
object-fit: contain;
`

const Title = styled.p`
font-size: 30px;
color: var(--almost-black);
font-weight: 500;
`

const PostBottom = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const BottomTop = styled.div`
    display: flex;
    justify-content: space-between;
`

const BottomTopLeft = styled.div`
    display: flex;
    gap: 10px;
`

const Score = styled.p`
    font-size: 24px;
    font-weight: 500;
`