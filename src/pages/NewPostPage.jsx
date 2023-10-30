import styled from "styled-components";
import { supabase } from "../features/supabaseClient";
import { useEffect, useState } from "react";
import { useOutletContext } from 'react-router-dom'

import UploadImage from "../components/NewPost/UploadImage";

export default function NewPostPage(){
    const [categories, setCategories] = useState(null);
    const [author, setAuthor] = useState(null);
    const rating_options = [1,2,3,4,5];
    const session = useOutletContext();

    // form data
    const [formName, setFormName] = useState(null);
    const [formDesc, setFormDesc] = useState(null);
    const [formCat, setFormCat] = useState(1);
    const [newCat, setNewCat] = useState(null);
    const [newRating, setNewRating] = useState(5);
    const [newCatAdded, setNewCatAdded] = useState(false);
    const [newPhoto, setNewPhoto] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [photoLoading, setPhotoLoading] = useState(true);


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
    }, [categories, newCatAdded])
    
    useEffect(()=>{
        if (session) {
            const {user} = session;
            setAuthor(user.id);
        }
    }, [session])

    async function createPost(event) {
        event.preventDefault();
        const date_now = new Date().toISOString();
        let new_object = {
            name: formName,
            // created_at: date_now,
            description: formDesc,
            author: session.user.id,
            photoUrl: photoUrl,
            category: formCat,
            avg_rating: newRating
        }
        // console.log(JSON.stringify())
        console.log(new_object)
        const {data, error} = await supabase
        .from('posts')
        .insert([new_object])
        .select()

        if(error){
            console.log(error);
        }

        if(data){
            console.log(data);
            setFormName('');
            setFormDesc('');
            setPhotoUrl('');
            setNewPhoto(null);
        }
    } 

    async function createCat(event) {
        event.preventDefault()
        if (newCat) {
            // setNewCatAdded(false);

            const {data, error} = await supabase
            .from('categories')
            .insert([
                {name: newCat}
            ])
            .select()

            if(error){
                console.log(error);
            }

            if(data){
                console.log(data);
            }
            setNewCat('');
            setNewCatAdded(prevAdded => !prevAdded);
        }
    }

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
                <input name="name" type="text" placeholder="Your favourite thing"
                onChange={(e)=>setFormName(e.target.value)}>{formName}</input>

                <label htmlFor="description">Description</label>
                <textarea name="description"
                onChange={(e)=>setFormDesc(e.target.value)}>{formDesc}</textarea>

                <label htmlFor="category">Category</label>
                {categories ? 
                    <select name="category"
                    onChange={(e)=>setFormCat(e.target.value)}
                    value={formCat}>
                        {categories.map(cat => {
                            return (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            )
                        }
                        )}
                    </select>
                    :
                    ""
                }

                <label htmlFor="new_category">New category</label>
                <input type="text" name="new_category"
                onChange={(e)=>{setNewCat(e.target.value)}}></input>
                <button onClick={createCat}>Add new category</button>

                <label htmlFor="rating">Initial rating</label>
                <select name="rating" value={newRating}
                onChange={(event)=>setNewRating(event.target.value)}>
                    {
                        rating_options.map(rating =>{
                            return (
                                <option value={parseInt(rating)}
                                key={parseInt(rating)}>{parseInt(rating)}</option>
                            )
                        })
                    }
                </select>
                <UploadImage photoUrl={photoUrl} setPhotoUrl={setPhotoUrl}
                session={session} photoLoading={photoLoading}
                setPhotoLoading={setPhotoLoading}
                newPhoto={newPhoto} setNewPhoto={setNewPhoto}></UploadImage>
                {
                    photoLoading ? <p>Please upload an image before submitting the form</p>
                    : <button type="submit" onClick={createPost}>CREATE</button>
                }
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

