import { useState } from 'react'
import { supabase } from '../client'
import styled from 'styled-components'

const PageMain = styled.main`
display: flex;
flex-direction: column;
gap: 10px;
padding: 20px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5x;
`

const LabelDiv = styled.div`
    display: flex;
    gap: 10px;
    // justify-content: space-between;
`

export default function RegisterPage({session}){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });

    const changeForm = (e) => {
        setFormData((prevFormData)=>{
            return{
                ...prevFormData,
                [e.target.name]:e.target.value
            }
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try{
            const { data, error } = await supabase.auth.signUp(
                {
                  email: formData.email,
                  password: formData.password,
                  options: {
                    data: {
                      username: formData.username,
                    }
                  }
                }
              )
              console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PageMain>
            <h1>Register here</h1>
            <Form onSubmit={submitForm}>
                <LabelDiv>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="admin"
                    onChange={changeForm}></input>
                </LabelDiv>
                <LabelDiv>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="admin@example.com"
                    onChange={changeForm}></input>
                </LabelDiv>
                <LabelDiv>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="******"
                    onChange={changeForm}></input>
                </LabelDiv>
                <button type="submit">Register</button>
            </Form>
        </PageMain>

    )
}