import styled from "styled-components"
import { supabase } from "../../features/supabaseClient"
import { useState, useEffect } from "react"

const Side = styled.aside`
max-width: 200px;
border: 1px solid var(--almost-black);
display: flex;
flex-direction: column;
gap: 10px;
padding: 5px;
height: 100%;
margin-top: 30px;
`

const InputLabel = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 2px;
`

const Search = styled.input`
width: 150px;
`

const Checkboxes = styled.div`
display: flex;
flex-direction: column;
padding: 5px;
border: 1px solid var(--color-1);
width: 100%;
`

const CheckboxFlex = styled.div`
display: flex;
gap: 5px;`

export default function SideFilters({setPosts}){
    const [searchBy, setSearchBy] = useState(null);
    const [filterBy, setFilterBy] = useState(null);
    const [categories, setCategories] = useState(null);
    const [checkedCats, setCheckedCats] = useState([]);

    useEffect(()=>{
        async function fetchCategories(){
            const {data, error} = await supabase
            .from('categories')
            .select()

            if(error){console.log(error)}
            if(data){setCategories(data)}
        }
        fetchCategories();
    },[])

    async function filterPosts(){
        // let filter_query = filterBy;
        // if (!filter_query) filter_query='*'
        // console.log('filter_query', filter_query)

        let query = supabase
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
            ),
            ratings(
                value,
                author
            )
            `
          )
        
        let search_query = searchBy;
        if (!search_query) search_query='*'
        // console.log('search_query', search_query)
        query = query.ilike('name', `%${search_query}%`)

        if (checkedCats.length) {query = query.in('category.name', checkedCats)}

        const {data, error} = await query
        // .ilike('name', `%${search_query}%`)
        // .ilike('category.name', `%${filter_query}%`)
        // .or(`name.ilike.%`)

        if(error) { console.log(error); }
        if(data) {
            console.log(data);
            setPosts(data);
        }
    }

    // useEffect(()=>{
    //     filterPosts();
    // }, [searchBy])

    const changeCats = (event)=>{
        let new_cats = checkedCats.slice()
        if (event.target.checked) {
            new_cats.push(event.target.value)
        }
        else{
            new_cats = new_cats.filter(cat => {
                return cat != event.target.value
            })
        }
        console.log(`new cats: ${new_cats}`);
        setCheckedCats(new_cats);
    }

    return (
        <Side>
            <InputLabel>
                <label htmlFor="search">Filter posts</label>
                <Search type="search" name="search"
                onChange={(e)=>{setSearchBy(e.target.value)}}></Search>
            </InputLabel>
            <InputLabel>
                <label>Filter by categories</label>
                <Checkboxes>
                    {categories ?
                        categories.map(cat=>{
                            return(
                                <CheckboxFlex key={cat.id}>
                                <input type="checkbox" name={cat.name}
                                value={cat.name}
                                onChange={changeCats}></input>
                                <label htmlFor={cat.name}>{cat.name}</label>
                                </CheckboxFlex>
                            )
                        })

                    : <p>No categories yet</p>
                    }
                    
                </Checkboxes>   
            </InputLabel>
            <button onClick={filterPosts}>Filter</button>
        </Side>
    )
}