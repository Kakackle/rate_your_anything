import { useState, useEffect } from "react";
import {supabase} from "../client";
import styled from "styled-components";

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;    
    max-width: 250px;
`

const LabelDiv = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
`

export default function HomePage(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [session, setSession] = useState();
    const [user, setUser] = useState();

    const changeForm = (e) => {
        setFormData((prevFormData)=>{
            return{
                ...prevFormData,
                [e.target.name]:e.target.value
            }
        })
    }

    useEffect(()=>{
        getUser();
    }, [])

    // useEffect(()=>{
    //     getUser();
    // }, session)

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

    const changeLoginForm = (e) => {
        setLoginData((prevLoginData)=>{
            return{
                ...prevLoginData,
                [e.target.name]:e.target.value
            }
        })
    }

    const logIn = async (e) => {
        e.preventDefault();
        try{
            const { data, error } = await supabase.auth.signInWithPassword(
                {
                  email: loginData.email,
                  password: loginData.password,
                }
              )
              console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        console.log(error);
    }

    const getSession = async () => {
        try {
            const { data, error } = await supabase.auth.getSession();
            setSession(session);
            console.log(data);
        } catch (error){
            console.log(error);
        }

    }

    const refreshSection = async () => {
        const { data, error } = await supabase.auth.refreshSession();
        const { new_session, user } = data;
        setSession(new_session);
    };

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        // console.log(user);
        setUser(user);
    }

    // const listAllUsers = async () => {
    //     const { data: { users }, error } = await supabase.auth.admin.listUsers();
    //     // const users_items = users.map(user => {
    //     //     return (
    //     //         <li>user</li>
    //     //     )
    //     // })
    //     console.log(users);
    // }

    return (
        <Main>
            <h2>Home page</h2>
            <h3>Sign up</h3>
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
            <h3>Log in</h3>
            <Form onSubmit={logIn}>
                <LabelDiv>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="admin@example.com"
                    onChange={changeLoginForm}></input>
                </LabelDiv>
                <LabelDiv>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="******"
                    onChange={changeLoginForm}></input>
                </LabelDiv>
                <button type="submit">Log in</button>
            </Form>
            <h3>Sign out</h3>
            <button onClick={signOut}>Sign out</button>
            <h3>Check session</h3>
            <button onClick={getSession}>get session</button>
            <h3>Get current user</h3>
            <button onClick={getUser}>get user</button>
            {user? <p>Current user: {user.user_metadata.username}</p>
            : <p>Not logged in</p>}
            {/* <p>Session: {session}</p> */}
            {/* <h3>List all users</h3>
            <button onClick={listAllUsers}>get list</button> */}
        </Main>
    )
}