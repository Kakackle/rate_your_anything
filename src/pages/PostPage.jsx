import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../features/supabaseClient";
export default function PostPage(){
    const {post_id} = useParams();
    const [post, setPost] = useState(null);
    useEffect(()=>{
        console.log(post_id);
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
                )
                `
            )
            .eq('id', post_id)
            .maybeSingle()

            if(postError){
                console.log(postError)
            }

            if(postData){
                console.log(postData)
                setPost(postData);
            }
        }

        fetchPost();
    }, [])

    return (
        <>
        {   post ?
            <p>{post.name}</p>
            : <p>No post to display</p> 
        }
        </>
        
    )
}