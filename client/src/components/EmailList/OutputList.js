import { useState, useEffect } from 'react'
import styled, {css} from 'styled-components'
import Header from './Header'
import Row from './Row'
import {device} from '../mediaQueries'
import MailContent from './MailContent'


const Wrapper = styled.div`
  ${props => props.singleMailToShow !== false && css`
  overflow-y:auto;
  `};
  position:relative;
  @media ${device.mobile} {
    max-height: unset;
  }
`


const Mail = styled.div`
  overflow-y:auto;
  display:flex;
  flex-direction: column;
  min-height: 33ch;
    @media ${device.mobile} {
      position:fixed;
      top:0;
      left:0;
      z-index:10;
      max-height: unset;
  width: 100vw;
  height: 100vh;
    transition: transform 200ms ease-in-out;
    }
  &.hidden {
    transform: translateX(100%);  
  }

`

function OutputList({values, isLoading, sortOptions}) {
    const [ isMobileView, setMobileView ] = useState(false) 
    const [singleMailToShow, setSingleMailToShow] = useState(false)
    const [hidden, setHidden] = useState('hidden')

    useEffect(() => {
        const breakpoint = window.matchMedia( device.mobile )
        function watchMedia() {
          if (breakpoint.matches === true) {
            setMobileView(true)
          } else {
              setMobileView(false)
              setHidden('') //reset hidden state when resizing viewport to non-mobile
          }
        }
        breakpoint.addEventListener('change', watchMedia)
        watchMedia()

      },)

      function handleSortOptions(obj) {
        sortOptions(obj)
      }
      
      function showContents(mailmeta){
        setHidden("")

        setSingleMailToShow(mailmeta)
      }

      function handleMailBodyVisible() {
          setHidden("hidden")
      }

    return (
        <>
        <Wrapper singleMailToShow={singleMailToShow}>
        <Header  sorting={handleSortOptions}/>
      {  
      isLoading  ? <p>Loading</p> : 
      values.map(result => {
          return (<Row key={result.id} mailmeta={result} isMobileView={isMobileView} showContents={showContents}/>)
      })
      }
        </Wrapper>
      <Mail className={hidden}>
      {
        singleMailToShow &&  
      <MailContent mail={singleMailToShow} isMobileView={isMobileView} clickedClose={handleMailBodyVisible}/>  
    }
      </Mail>
      </>
    )
}
export default OutputList