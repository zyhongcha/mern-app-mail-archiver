import { useState, useEffect, useRef } from "react"
import Datepicker from "./components/Datepicker"
import ResultsCount from "./components/ResultsCount"
import PostEmail from './components/PostEmail'
import DisplayEmpty from "./components/DisplayEmpty"
import GithubRefer from "./components/GithubRefer"

import styled from "styled-components"

import OutputList from "./components/EmailList/OutputList"

import { device } from "./components/mediaQueries"
import useFetchMails from "./components/useFetchMails"

const AppContainer = styled.div`
  font-size: clamp(14px, 1.5vw, 1rem);
  font-family: sans-serif;
  max-width: 1200px;
  height: 100vh;
  padding: 30px 60px;
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-rows: 1fr 10fr 1fr;
  grid-template-columns: 100%;
  @media ${device.mobile} {
    padding: 18px 0px;
    margin: 0px;
    display: block;
  }
`

const OutputDateMeta = styled.div`
  border-bottom: 1px solid #ccc;
  @media ${device.mobile} {
    padding: 18px 12px;
    position: fixed;
    background: #fff;
    width: 100%;
    height: 75px;
    top: 0;
    left: 0;
    z-index: 9;
  }
`

const OutputMailsContainer = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  @media ${device.mobile} {
    margin-top: 94px;
  }
`
const OutputMailsWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
`

function App() {
  const [data, setData] = useState("")
  const [values, loading] = useFetchMails(data)
  const [sortOptions, setSortOptions] = useState({
    term: "date",
    dir: -1, //mongodb desc sort
  })
  const updateData = useRef(() => {})

  updateData.current = () => {
    if (data !== "") {
      setData({ ...data, ...sortOptions })
    }
  }

  useEffect(() => {
    updateData.current()
    
  // const updateData = () => {
  //   if (data !== "") {
  //     setData({ ...data, ...sortOptions })
  //   }
  // }
  // updateData()
  }, [sortOptions])

  function getSortOptions(sortOptionsP) {
    setSortOptions(sortOptionsP)
  }

  function fetchMails(startDate, endDate) {
    let dates = { startDate: startDate, endDate: endDate }
    let dataSet = { ...dates, ...sortOptions }
    setData(dataSet)
  }

  return (
    <AppContainer>
      <OutputDateMeta>
        <Datepicker action={fetchMails} />
        <ResultsCount values={values} />
      </OutputDateMeta>
      <OutputMailsContainer>
        {values.length === 0 ? (
          <DisplayEmpty />
          ) : (
            <OutputMailsWrapper>
            <OutputList
              values={values}
              sortOptions={getSortOptions}
              isLoading={loading}
              />
          </OutputMailsWrapper>
        )}
      </OutputMailsContainer>
      <PostEmail/>
      <GithubRefer/>
    </AppContainer>
  )
}

export default App
