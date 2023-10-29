import styled from "styled-components"
import GridCard from "./GridCard"
const CardGrid = styled.div`
display: flex;
gap: 20px;
padding: 20px;
border: 2px solid gray;
flex-wrap: wrap;
`

export default function Grid({posts}) {
    const cards = posts.map(post=>{
        return (
            <GridCard post={post} key={post.id}></GridCard>
        )
    }) 
    return (
        <>
        <h3>Grid</h3>
        {
            posts ?
            <CardGrid>
            <GridCard></GridCard>
            {cards}
            {/* <GridCard></GridCard> */}
        </CardGrid> : ""
        }
        </>
    )
}