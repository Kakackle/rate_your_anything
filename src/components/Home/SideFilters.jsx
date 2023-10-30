import styled from "styled-components"

const Side = styled.aside`
max-width: 200px;
border: 1px solid var(--almost-black);
display: flex;
flex-direction: column;
gap: 10px;
padding: 5px;
height: 100%;
margin-top: 30px;
`

const InputLabel = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 2px;
`

const Search = styled.input`
width: 150px;
`

const Checkboxes = styled.div`
display: flex;
flex-direction: column;
padding: 5px;
border: 1px solid var(--color-1);
width: 100%;
`

const CheckboxFlex = styled.div`
display: flex;
gap: 5px;`

export default function SideFilters(){
    return (
        <Side>
            <InputLabel>
                <label htmlFor="search">Filter posts</label>
                <Search type="search" name="search"></Search>
            </InputLabel>
            <InputLabel>
                <label>Filter by ... </label>
                <Checkboxes>
                    <CheckboxFlex>
                        <input type="checkbox" name="ch1"></input>
                        <label htmlFor="ch1">Thing 1</label>
                    </CheckboxFlex>
                    <CheckboxFlex>
                        <input type="checkbox" name="ch2"></input>
                        <label htmlFor="ch1">Thing 2</label>
                    </CheckboxFlex>
                    <CheckboxFlex>
                        <input type="checkbox" name="ch3"></input>
                        <label htmlFor="ch1">Thing 3</label>
                    </CheckboxFlex>
                </Checkboxes>   
            </InputLabel>
        </Side>
    )
}