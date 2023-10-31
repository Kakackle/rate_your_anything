import { useEffect, useState } from "react";
import { supabase } from "../../features/supabaseClient";
import styled from "styled-components";
import Rating from "./Rating";
import RatingForm from "./RatingForm";
import { useOutletContext } from "react-router-dom";
export default function Ratings({post_id}){
    const [ratings, setRatings] = useState(null);
    const [newRatingAdded, setNewRatingAdded] = useState(false);
    const [userInRatings, setUserInRatings] = useState(false);
    const session = useOutletContext();

    useEffect(()=>{
        const fetchRatings = async () => {
            const {data: ratingsData, error} = await supabase
            .from('ratings')
            // .select()
            .select(`id, created_at, value, author(*), message, post(id)`)
            .eq('post.id', post_id)

            if (error){
                console.log(error);
            }
    
            if(ratingsData){
                setRatings(ratingsData);
                if (session){
                ratingsData.forEach(rating => {
                    if (session.user.id === rating.author.id){
                        setUserInRatings(true)
                    }
                })
                }
                // setUserInRatings(session.user)
                // console.log(ratingsData);
            }
        }
        fetchRatings();
    }, [post_id, newRatingAdded])

    return (
        <RatingsDiv>
            <Title>User ratings:</Title>
            {
                ratings ?
                <RatingsList>
                {
                    ratings.map(rating => {
                        return <Rating rating={rating} key={rating.id}></Rating>
                    })
                }
                </RatingsList>
                : ""
            }
            {
                userInRatings ?
                <RatingForm post_id={post_id} setNewRatingAdded={setNewRatingAdded}></RatingForm>
                : <p>You have already rated this thing</p>
            }
            
        </RatingsDiv>
    )
}

const Title = styled.p`
font-size: 24px;`

const RatingsDiv = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
margin-top: 20px;
// border-left: 1px solid var(--color-4);
// padding-left: 20px;
flex-grow: 1;
`

const RatingsList = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
`