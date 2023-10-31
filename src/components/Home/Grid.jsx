import styled from "styled-components"
import GridCard from "./GridCard"
import SideFilters from "./SideFilters"
import TopSorting from "./TopSorting"
import Pagination from "./Pagination"

const CardGrid = styled.div`
display: flex;
gap: 20px;
padding: 20px;
border: 2px solid gray;
flex-wrap: wrap;
width: 100%;
`

const Main = styled.main`
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
`

const MainSplit = styled.main`
display: flex;
width: 100%;
gap: 20px;
`

const GridSortPagin = styled.section`
display: flex;
flex-direction: column;
gap: 5px;
width: 100%;
`

export default function Grid({posts, setPosts}) {
    const cards = posts.map(post=>{
        return (
            <GridCard post={post} key={post.id}></GridCard>
        )
    }) 
    return (
        <Main>
        <MainSplit>
            <GridSortPagin>
                <TopSorting setPosts={setPosts}></TopSorting>
                {
                posts ?
                <CardGrid>
                    {cards}
                </CardGrid> : ""
                }
                <Pagination></Pagination>           
            </GridSortPagin>

            <SideFilters setPosts={setPosts}></SideFilters>
        </MainSplit>
        
        </Main>
    )
}