import '../App.css'
import { useState, useEffect } from 'react'
import { supabase } from '../features/supabaseClient'
import Auth from '../components/Auth'
import Account from './AccountPage'
import LogOut from '../components/Nav/LogOut'
import Grid from '../components/Home/Grid'
import { useOutletContext } from 'react-router-dom'


import styled from 'styled-components'

const Title = styled.h1`
  font-size: 36px;
  color: var(--color-2);
  // background-color: var(--color-4);
  display: block;
  position: relative;
  align-self: center;

  &:after{
    content:"";
    background-color: var(--color-4);
    height: 100%;
    width: 250px;
    // width: 100%;
    // height: 100%;
    position: absolute;
    transform: translateX(-100%) rotate(-8deg);
    z-index: -1;
  }
`

const Note = styled.h2`
  font-size: 20px;
  color: var(--gray-mid);
  align-self: center;
  font-weight: 300;
`

const Main = styled.main`
padding: 20px;
display: flex;
flex-direction: column;
gap: 10px;
`


export default function HomePage() {
  const session = useOutletContext();
  // const [fetchError, setFetchError] = useState(null); 

  const [posts, setPosts] = useState(null);

  const [orderBy, setOrderBy] = useState('created_at');
  const [searchBy, setSearchBy] = useState(null);
  const [checkedCats, setCheckedCats] = useState([]);
  const [filtering, setFiltering] = useState(false);

  const [pageRange, setPageRange] = useState({from: 0, to:2});

  useEffect(()=>{
    const fetchPosts = async () => {

      let query = supabase
      .from('posts')
      .select(
        `id, created_at, avg_rating, description, author, photoUrl, name,
        category!inner(
          id,
          name
        ),
        author(
          username,
          full_name
        ),
        ratings(
            value,
            author
        )
        `
      )
      
      // FILTERING

      let search_query = searchBy;
      if (!search_query) search_query='*'
      query = query.ilike('name', `%${search_query}%`)

      if (checkedCats.length) {
        console.log(`filtering by cats: ${checkedCats}`)
        query = query.in('category.name', checkedCats)
      }

      // ORDERING

      if (orderBy.length) { query = query.order(orderBy)}

      // PAGINATION
      console.log(`pageRange from: ${pageRange.from}, to: ${pageRange.to}`);
      query = query.range(pageRange.from, pageRange.to);

      // FINAL QUERY
      const {data: postsData, postsError} = await query

      if (postsError){
        console.log(postsError)
      }

      if(postsData){
        console.log('posts', postsData);
        setPosts(postsData);
      }
    }

    fetchPosts();
  }, [orderBy, filtering, pageRange])
  

  return (
    // <div className="container" style={{ padding: '50px 0 100px 0' }}>
    //   {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    // </div>
    <Main>
        <Title>Rate Your Stuff</Title>
        <Note>Please note the visuals are a work in progress, otherwise enjoy the retro feel</Note>
        {/* { fetchError && (<p>{fetchError}</p>)} */}
        {posts ? <Grid posts={posts}
        order={{orderBy: orderBy, setOrderBy: setOrderBy}}
        search={{searchBy, setSearchBy: setSearchBy}}
        check={{checkedCats: checkedCats, setCheckedCats: setCheckedCats}}
        setFiltering={setFiltering}
        setPageRange={setPageRange}
        ></Grid> : "No posts to display"}
    </Main>
  )
}
