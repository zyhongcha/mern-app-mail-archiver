import { useState } from "react"
import styled from "styled-components"
import { device } from "../mediaQueries"
import { ReactComponent as icon_arrow01 } from "../../assets/icon_arrow01.svg"

const ArrowUpSvg = styled(icon_arrow01)`
  width: 12px;
  margin-left: 4px;
  transform: ${(props) => props.down  ? "rotate(180deg)" : ''};
`


const HeaderDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  align-items: center;
  background: #f5f5f5;
  position: relative;
  min-height: 40px;
  padding: 0px 12px;
  color: #666;
  font-weight: 700;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  @media ${device.mobile} {
    column-gap: 8px;

    & div + div {
      border-left: 1px solid #666;
    }
  }
`
const InlineBlock = styled.div`
  cursor: pointer;
  ${({ header }) => handleHeaderStyles(header)};
  @media ${device.mobile} {
    margin: 0 !important;
    flex: 0 1 auto !important;
    justify-content: flex-start;
    & + & {
      padding-left: 8px;
    }
  }
`

const handleHeaderStyles = (header) => {
  switch (header) {
    case "sender":
      return "flex:0 0 15%; margin: auto 24px auto 0;"
    case "recipient":
      return "flex:0 0 20%;"
    case "subject":
      return "flex:0 1 62%; min-width: 0"
    case "date":
      return "flex:1 0 8%;"
    default:
      return "flex: 0 1 auto;"
  }
}

function Header({ sorting }) {

  const [headers, setHeaders] = useState([
    { dbprop: "sender", outputText: "From", isSorted: false, asc: true },
    { dbprop: "recipient", outputText: "To", isSorted: false, asc: true },
    { dbprop: "subject", outputText: "Subject", isSorted: false, asc: true },
    { dbprop: "date", outputText: "Date", isSorted: true, asc: false },
  ])

  


  function handleSortOptions(object) {
    let dir = -1
    if (object.asc === true) {
      dir = 1
    }
    let newDir = { term: object.dbprop, dir: dir }
    sorting(newDir)
  }


  function handleClick(object) {

    setHeaders((prevState) => {
      const array = [...prevState]
      array.forEach((item) => {
        item.isSorted = false
      })
      object.isSorted = true
      object.asc = !object.asc
      return array

    })
    handleSortOptions(object)

  }

  function renderArrow(object) {
    if (object.isSorted === false) return
    if (object.asc === true) {
      return <ArrowUpSvg down="true"/>
    } else {
      return <ArrowUpSvg />
    }
  }

  return (
    <HeaderDiv>
      {headers.map((object, index) => {
        return (
          <InlineBlock
            header={object.dbprop}
            key={index}
            onClick={() => handleClick(object, index)}
          >
            {object.outputText}
            {renderArrow(object)}
          </InlineBlock>
        )
      })}
    </HeaderDiv>
  )
}

export default Header
