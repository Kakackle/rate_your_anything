import '../App.css'
import { useState, useEffect } from 'react'
import { supabase } from '../features/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
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

  useEffect(()=>{
    const fetchPosts = async () => {
      const {data: postsData, postsError} = await supabase
      .from('posts')
      .select(
        `id, created_at, avg_rating, description, author, photoUrl, name,
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

      if (postsError){
        console.log(postsError)
      }

      if(postsData){
        console.log('posts', postsData);
        setPosts(postsData);
      }
    }

    fetchPosts();
  }, [])
  

  return (
    // <div className="container" style={{ padding: '50px 0 100px 0' }}>
    //   {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    // </div>
    <Main>
        <Title>Rate Your Stuff</Title>
        {/* { fetchError && (<p>{fetchError}</p>)} */}
        {posts ? <Grid posts={posts}></Grid> : "No posts to display"}
    </Main>
  )
}
