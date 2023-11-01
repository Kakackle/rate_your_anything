import { supabase } from "../../features/supabaseClient";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Delete = styled.button`
border: none;
background-color: transparent;
font-size: 16px;
color: var(--gray-mid);
&:hover{
    cursor: pointer;
    text-decoration: underline;
}
`

export default function DeletePost({post_id}){

    const navigate = useNavigate();

    const deletePost = async () =>{
        const {error} = await supabase
        .from('posts')
        .delete()
        .eq('id', post_id)

        if(error){console.log(error)}
        else{
            navigate("/");
        }
        // console.log(`post_id: ${post_id}`)
    }

    return(
        <Delete onClick={deletePost}>Delete post</Delete>
    )
}