import styled from "styled-components"

const Card = styled.div`
border: 1px solid black;
border-radius: 9px;
width: 200px;
height: 300px;
background-color: lightgray;
`

export default function GridCard({post}){
    return (
        <>
        {
            post ? 
            <Card>
            <p>{post.name}</p>
            </Card>
            : ""
        }
        </>
    )
}