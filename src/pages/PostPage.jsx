import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../features/supabaseClient";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

import Ratings from "../components/PostPage/Ratings";
import DeletePost from "../components/PostPage/DeletePost";

const calc_avg = function (post, ratings){
    let val = parseInt(post.avg_rating);
    ratings.forEach((rat)=>{
        val += parseInt(rat.value);
    })
    // console.log('calc_avg: ', val/(ratings.length + 1));
    return val/(ratings.length + 1);
}

export default function PostPage(){
    const {post_id} = useParams();
    const [post, setPost] = useState(null);
    const [avgRating, setAvgRating] = useState(0);
    const session = useOutletContext();

    useEffect(()=>{
        // console.log(post_id);
        const fetchPost = async () => {
            const {data: postData, postError} = await supabase
            .from('posts')
            .select(
                `id, created_at, avg_rating, description, author, photoUrl, name,
                category (
                  id,
                  name
                ),
                author (
                  id,
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
                console.log(`ratings: ${JSON.stringify(postData.ratings)}`);
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
                        <BottomTopRight>
                            <Score>Avg.: {avgRating}/5</Score>
                            <p>Initial: {post.avg_rating}</p>
                        </BottomTopRight>
                        
                    </BottomTop>
                    {post.description}
                    {
                        session.user.id == post.author.id ?
                        <DeletePost post_id={post.id}></DeletePost>
                        : <p></p>
                    }
                    
                </PostBottom>
            </Post>
            : <p>No post to display</p> 
        }
        </Post>
        <Ratings post_id={parseInt(post_id)}>
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

const BottomTopRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`

const Score = styled.p`
    font-size: 24px;
    font-weight: 500;
`