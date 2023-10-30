import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LogIn from "./LogIn";
import Register from "../Register";
import LogOut from "./LogOut";
import AccountNav from "./AccountNav";

const Nav = styled.nav`
display: flex;
// gap: 10px;
justify-content: space-between;
background-color: var(--color-1);
height: 60px;
align-items: center;
padding: 0 20px;
color: var(--almost-white);
`

const Links = styled.div`
display: flex;
align-items: center;
gap: 20px;
`

const StyledLink = styled(NavLink)`
color: var(--almost-white);
text-decoration: none;
font-weight: 500;
font-size: 20px;
text-transform: uppercase;

&:hover{
    text-decoration: underline;
    cursor: pointer;
}

&.active{
    color: var(--color-4);
}
`

const NavMenu = styled.div`
display: flex;
gap: 10px;
align-items: center;
`

const Logo = styled.p`
font-size: 24px;
font-weight: 700;
color: var(--almost-white);
`

export default function NavBar({session}){
    return(
        <Nav>
            <Links>
                <Logo>RYS</Logo>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/authtest">Auth test</StyledLink>
                <StyledLink to="/about">About</StyledLink>
                <StyledLink to="/create">Create</StyledLink>
            </Links>
            {!session ?
                <NavMenu>
                    <LogIn/>
                    <span>or</span>
                    <StyledLink to="/register" style={{fontSize: 16}}>Sign up</StyledLink>
                </NavMenu> :
            <NavMenu>
                <AccountNav key={session.user.id} session={session}/>
                <LogOut></LogOut>  
            </NavMenu>
            }
        </Nav>
    )
}