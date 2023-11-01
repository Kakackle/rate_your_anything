import styled from "styled-components"
import { supabase } from "../../features/supabaseClient"
import { useState, useEffect } from "react"
const Top = styled.div`
// width: 100%;
align-self: flex-end;
display: flex;
gap: 10px;
`

const Criteria = styled.p`
font-weight: 400;
&:hover{
    cursor:pointer;
    text-decoration: underline;
}
`

const active = {
    fontWeight: 500,
}

export default function TopSorting({order}){
    // const [orderBy, setOrderBy] = useState('created_at');

    // useEffect(()=>{
    //     async function sortPosts(){
    //         const {data, error} = await supabase
    //         .from('posts')
    //         .select(
    //             `id, created_at, avg_rating, description, author, photoUrl, name,
    //             category (
    //               id,
    //               name
    //             ),
    //             author (
    //               username,
    //               full_name
    //             ),
    //             ratings(
    //                 value,
    //                 author
    //             )
    //             `
    //           )
    //           .order(orderBy)
    //         if(error){console.log(error);}
    //         if(data){setPosts(data);}
    //     }
    //     sortPosts();
    // }, [orderBy])


    return (
        <Top>
        <p>Sort by:</p>
        <Criteria onClick={()=>order.setOrderBy('created_at')}
        style={order.orderBy == 'created_at' ? active : {}}>Date</Criteria>
        <Criteria onClick={()=>order.setOrderBy('name')}
        style={order.orderBy == 'name' ? active : {}}>Alphabetically</Criteria>
        </Top>
    )
}