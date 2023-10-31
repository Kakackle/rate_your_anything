import styled from "styled-components"
import { useEffect, useState } from "react"
import { supabase } from "../../features/supabaseClient";
import { useOutletContext } from "react-router-dom";
export default function RatingForm({post_id, setNewRatingAdded}){
    const [formMessage, setFormMessage] = useState('');
    const [formRating, setFormRating] = useState(5);

    const rating_options = [1,2,3,4,5];
    const session = useOutletContext();

    async function createRating(e){
        e.preventDefault();
        const {data, error} = await supabase
        .from('ratings')
        .insert([{
            value: formRating,
            author: session.user.id,
            message: formMessage,
            post: post_id
        },])

        if (error){
            console.log(error)
        }

        if (data){
            console.log(data);
        }
        setFormMessage('');
        setNewRatingAdded(prevAdded => !prevAdded);
    }
    return (
        <Rate>
            <p>Rate this thing:</p>
            {
            session ?
                <Form>
                    <LabelDiv>
                        <label htmlFor="message">Message:</label>
                        <textarea name="message" value={formMessage}
                    onChange={e => setFormMessage(e.target.value)}></textarea>
                    </LabelDiv>
                    <LabelDiv>
                        <label htmlFor="rating">Rating:</label>
                        <select name="rating" value={formRating}
                        onChange={e => setFormRating(e.target.value)}>
                            {
                                rating_options.map(rating => {
                                    return (
                                    <option key={parseInt(rating)}
                                    value={parseInt(rating)}>{rating}</option>
                                    )
                                })
                            }
                        </select>
                    </LabelDiv>
                    <button onClick={createRating}>ADD</button>
                </Form>
            : <p>Log in first to be able to rate things</p>
            }
            
        </Rate>
    )
}

const Rate = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%:
    align-items: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 5px;
`

const LabelDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`