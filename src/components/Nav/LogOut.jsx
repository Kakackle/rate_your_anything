import { supabase } from "../../features/supabaseClient";
import styled from "styled-components";

const Button = styled.button`
border: none;
color: var(--almost-white);
background-color: transparent;
&:hover{
    cursor: pointer;
    text-decoration: underline;
}
`

export default function LogOut(){
    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        console.log(error);
    }
    return(
        <>
        {/* <h3>Sign out?</h3> */}
        <Button onClick={signOut}>Sign out</Button>
        </>
    )
}