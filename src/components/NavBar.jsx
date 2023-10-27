import { Link } from "react-router-dom";
import styled from "styled-components";
import LogIn from "./LogIn";
import Register from "./Register";
import AccountNav from "./AccountNav";

const Nav = styled.nav`
display: flex;
gap: 10px;
`

export default function NavBar({session}){
    return(
        <Nav>
            <Link to="/">Home</Link>
            <Link to="/authtest">Auth test</Link>
            {!session ? <><LogIn/> <Register/></> :
            <AccountNav key={session.user.id} session={session}/>}
        </Nav>
    )
}