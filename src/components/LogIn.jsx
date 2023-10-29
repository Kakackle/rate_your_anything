import { useState } from 'react'
import { supabase } from '../client'
import styled from 'styled-components'

const FlexForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const StyledInputDiv = styled.div`
  display: flex;
  gap: 5px;
`

const LoginDiv = styled.div`
    // background-color: pink;
`

const StyledInput = styled.input`
border: 2px solid var(--almost-black);
padding: 2px;
width: 120px;
`

const LoginButton = styled.button`
border: none;
background-color: transparent;
color: var(--almost-white);
font-size: 16px;
font-weight: 500;
&:hover{
  cursor: pointer;
  transform: scale(1.05);
}
`

export default function LogIn({session}){
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
    
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
             email, password
             })
    
        if (error) {
          alert(error.error_description || error.message)
        } else {
        //   alert('Check your email for the login link!')
          alert('logged in')
        }
        setLoading(false)
      }

      return (
        <LoginDiv>
        {/* <p>LOG IN</p> */}
        <FlexForm className="form-widget" onSubmit={handleLogin}>
          <StyledInputDiv>
            <StyledInput
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledInput
              className="inputField"
              type="password"
              placeholder="*******"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </StyledInputDiv>
            <LoginButton className={'button block'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Login</span>}
            </LoginButton>
        </FlexForm>
        </LoginDiv>
      )
}