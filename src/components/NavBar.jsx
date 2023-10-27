import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
display: flex;
gap: 10px;
`

export default function NavBar(){
    return(
        <Nav>
            <Link to="/">Home</Link>
            <Link to="/authtest">Auth test</Link>
        </Nav>
    )
}