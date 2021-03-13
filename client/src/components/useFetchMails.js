import { useState, useEffect } from 'react'


const useFetchMails = (query) => {
  const [values, setValues] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const { startDate, endDate, term, dir } = query


    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(
          `http://localhost:5000/?startdate=${startDate}&enddate=${endDate}&sortby=${term}&sortorder=${dir}`)
        const json = await response.json()
        setValues(json)
      } catch (err) {
        console.log(`Error fetching mails: ${err}`)
      } finally {
        setLoading(false)
      }
    }
    if (query !== "") {
      fetchData()
    }
  }, [query])
  return [values, loading]
}

export default useFetchMails