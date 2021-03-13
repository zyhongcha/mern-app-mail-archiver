import styled from 'styled-components'
import {device} from './mediaQueries'

const Wrapper = styled.div`
    color: #666666;
    font-weight: 700;
    margin: 24px 0px 12px 0px;
    @media ${device.mobile} {
        margin:0px;
    }
    .large {
    font-size: 1.2rem;
    }
`


function ResultsCount(props) {
    return(
        <Wrapper>
        Results: <span className="large">{props.values.length}</span> mail(s)
        </Wrapper>
    )
}

export default ResultsCount