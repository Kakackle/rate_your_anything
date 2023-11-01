import { useEffect, useState, useRef } from "react";
import styled from "styled-components"
import { supabase } from "../../features/supabaseClient";

const Pages = styled.div`
display: flex;
align-self: center;
gap: 10px;
`

const Page = styled.p`
&:hover{
    cursor: pointer;
    text-decoration: underline;
}
`

const active = {
    fontWeight: 500,
}

const getPagination = (page, size) => {
    const limit = size ? +size : 9;
    const from = page ? page * limit : 0;
    const to = page ? from + size-1 : size-1;
    
    return { from, to};
  };

export default function Pagination({posts, page_size, setPageRange}){
    const [page, setPage] = useState(0);
    const [postsLen, setPostsLen] = useState(0);
    
    const pages = useRef([]);

    useEffect(()=>{
        async function fetchCount() {
            const {data, count} = await supabase
            .from('posts')
            .select('*', {count: 'exact', head: true})
            if(count) {
                setPostsLen(count);
                // console.log(`count: ${count}`)
                let num_pages = Math.ceil(parseInt(count) / parseInt(page_size))
                pages.current = [...Array(num_pages).keys()];
                // console.log(`num_pages: ${num_pages}`)
                // console.log(`pages: ${pages.current}`)
            }
        }
        fetchCount();
    },[page])

    useEffect(()=>{
        const {from, to} = getPagination(page, page_size);
        console.log(`from: ${from}, to: ${to}`);
        setPageRange({from: from, to: to});
    },[page])


    return (
        <Pages>
            {
                pages.current ?
                    pages.current.map(ppage=>{
                        return (
                        <Page key={ppage}
                        onClick={()=>setPage(ppage)}
                        style={page == ppage ? active: {}}>{ppage+1}</Page>
                        )
                    })
                : ""
            }
        </Pages>
    )
}