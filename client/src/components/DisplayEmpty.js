import styled from "styled-components"

const Container = styled.div`
    margin: auto;
    position: relative;
    
`
const Title = styled.h1`
    color: #888;
`

function DisplayEmpty() {

    return (
        <Container>
            <Title>Mail Archiver</Title>
        </Container>
    )

}

export default DisplayEmpty