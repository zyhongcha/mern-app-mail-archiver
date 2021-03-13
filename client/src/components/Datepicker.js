import styled from "styled-components"
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import DateSelector from "react-datepicker"
import { ReactComponent as IconCalender } from "../assets/icon_calender.svg"
import { ReactComponent as IconSearch } from "../assets/icon_search.svg"

const CalenderIcon = styled(IconCalender)`
  width: 1rem;
  position: absolute;
  padding: 8px 8px 8px 12px;
  z-index: 1;
`
const SearchIcon = styled(IconSearch)`
  width: 1rem;
`
const DateForm = styled.form`
  position: relative;
`

const DateFieldContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0px 0px 24px;
`
const DateInputWrapper = styled.div`
  height: 34px;
`

const DateRangeField = styled.input.attrs(({isActive, startDate, endDate}) => ({
  type: "text",
  readOnly: true,
  opened: isActive || "",
  value: endDate
    ? `${startDate.toLocaleDateString(
        "ja-JP"
      )} - ${endDate.toLocaleDateString("ja-JP")}`
    : `${startDate.toLocaleDateString("ja-JP")}`,
}))`
  padding: 8px 12px 8px 34px;
  position: relative;
  font-size: 16px;
  height: 1rem;
  border: ${(props) =>
    props.opened ? "1px solid DodgerBlue" : "1px solid #cecece"};
  border-radius: 8px 0px 0px 8px;
  box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.055);
  &:focus {
    outline: none;
  }
`
const DateSelectorWrapper = styled.div`
position: absolute;
top:42px;
left:0;
z-index: 9;
`

const SubmitButton = styled.button`
  padding: 8px 12px;
  z-index: 1;
  background-color: #f5f5f5;
  border-style: solid;
  border-color: #cecece;
  border-width: 1px;
  border-radius: 0px 8px 8px 0px;
  height: 34px;
`


const Datepicker = (props) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [isActive, setActive] = useState(false)

  function toggleShowElement() {
    setActive((currentState) => !currentState)
  }

  function hideElement(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) { 
      setActive(false)
  }}

  function handleDateChange(dates) {
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)
    if (end) setActive(false) //Close calender when endDate is chosen

  }

  function handleFormSubmit(e) {
    e.preventDefault()

    props.action(startDate, endDate)
    setActive(false)
  }

  return (
    <DateForm onBlur={hideElement} onSubmit={handleFormSubmit} name="dateform">
      <DateFieldContainer >
        <DateInputWrapper onClick={toggleShowElement} >
          <CalenderIcon />
          <DateRangeField
            startDate={startDate}
            endDate={endDate}
            isActive={isActive}

          />
        </DateInputWrapper>
        <SubmitButton type="submit">
          <SearchIcon />
        </SubmitButton>
        <DateSelectorWrapper >
      {isActive && (
        <DateSelector
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/mm/dd"
          selectsRange
          inline
        />
      )}
      </DateSelectorWrapper>
      </DateFieldContainer>
     
    </DateForm>
  )
}

export default Datepicker
