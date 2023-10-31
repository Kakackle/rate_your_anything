import styled from "styled-components"
export default function Rating({rating}){
    return (
    rating &&
    <RatingDiv>
        <Left>
            <LeftTop>
                <p>{rating.author.username}</p>
                <p>{rating.created_at}</p>
            </LeftTop>
            <p>{rating.message}</p>
        </Left>
        <Score>{rating.value}/5</Score>
    </RatingDiv>
    )
}

const RatingDiv = styled.div`
    display: flex;
    justify-content: space-between;
    border: 2px solid var(--color-1);
    padding: 2px;
    min-width: 300px;
    // max-width: 600px;
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const LeftTop = styled.div`
    display: flex;
    gap: 10px;
    border-bottom: 1px solid var(--color-4);
    font-size: 14px;
    color: var(--gray-mid);
    font-weight: 500;
`

const Score = styled.p`
    font-size: 24px;
    display: flex;
    padding: 10px;
    padding-left: 20px;
    justify-content: center;
    align-items: center;
`
