import styled from "styled-components";
import { supabase } from "../features/supabaseClient";
import { useEffect, useState } from "react";
import { useOutletContext } from 'react-router-dom'

export default function NewPostPage(){
    const [categories, setCategories] = useState(null);
    const [author, setAuthor] = useState(null);
    const rating_options = [1,2,3,4,5];
    const session = useOutletContext();

    useEffect(()=>{
        const fetchCategories = async () => {
            const {data: catData, catError} = await supabase
            .from('categories')
            .select()
            
            if (catError){
                console.log(catError)
            }

            if (catData){
                // console.log('cats:', catData)
                setCategories(catData);
            }
        }

        fetchCategories();
    }, [categories])
    
    useEffect(()=>{
        if (session) {
            const {user} = session;
            setAuthor(user.id);
        }
    }, [session])

    return (
        <Main>
            <Title>Add a new post</Title>
            <Form>
                {
                    author ?
                    <p>Logged in: {author}</p>
                    : <p>No user logged</p>
                }
                <label htmlFor="name">Name</label>
                <input name="name" type="text" placeholder="Your favourite thing"></input>
                <label htmlFor="description">Description</label>
                <textarea name="description"></textarea>
                <label htmlFor="category">Category</label>
                {categories ? 
                    <select name="category">
                        {categories.map(cat => {
                            return (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            )
                        }
                        )}
                    </select>
                    :
                    ""
                }
                <label htmlFor="new_category">New category</label>
                <input type="text" name="new_category"></input>
                <button>Add new category</button>
                <label htmlFor="rating">Initial rating</label>
                <select name="rating">
                    {
                        rating_options.map(rating =>{
                            return (
                                <option value={rating} key={rating}>{rating}</option>
                            )
                        })
                    }
                </select>
                <label htmlFor="photo">Photo</label>
                <input type="file" name="photo"></input>
                <button type="submit">CREATE</button>
            </Form>
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
    align-items: center;
`
const Title = styled.h1`
    font-size: 36px;
    color: var(--almost-black);
`

const Form = styled.form`
display: flex;
flex-direction: column;
gap: 5px;
width: 90%;
`