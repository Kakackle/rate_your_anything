import styled from "styled-components"

const Pages = styled.div`
display: flex;
align-self: center;
gap: 10px;
`

export default function Pagination(){
    return (
        <Pages>
            <p>1</p>
            <p>2</p>
            <p>...</p>
            <p>N</p>
        </Pages>
    )
}