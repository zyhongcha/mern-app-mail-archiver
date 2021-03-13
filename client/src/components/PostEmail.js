import styled from "styled-components"
import { useState, useReducer } from "react"



const OpenModal = styled.button``

const ModalContainer = styled.div`
  position: relative;
  display: block;
  padding: 12px;
  background: #f5f5f5;
`

const DataEntryDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const InnerEntryDiv = styled.div`
    & label {
        display: block;
    }
    &.subject-div input {
      min-width: 48ch;
    }

    & textarea {
        display: block;
        width: 100%;
        min-height: 16ch;
    }
`

const formReducer = (state, event) => {
    if (event.reset) {
        
        return {
            recipient: '',
            sender: '',
            date: new Date().toISOString().split('T')[0],
            subject: '',
            body: '' 
          }
      }
      return {
          ...state,
          [event.name]: event.value
      }
}

function PostEmail() {
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useReducer(formReducer, {})


  const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitting(true)
      postData()
      // setFormData({ reset: true})
      setSubmitting(false)
      console.log(formData.date)
      console.log(formData)
  }  


  const postData = async () => {
    try { 

      const req = await fetch('http://localhost:5000/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const res = await req.json()
      console.log(res)
      setSuccess(true)
      return res
    }  catch (e) {
      throw e
    }
    
  }

  const handleInputChange = (event) => {
    setFormData({
        name: event.target.name,
        value: event.target.value
    })
  }

  return (
    <>
      <OpenModal
        onClick={() => {
          setModalOpen((prevState) => !prevState)
        }}
      >
        Add your mail here 
      </OpenModal>
      {modalOpen ? (
        <ModalContainer>
          <form onSubmit={handleSubmit}>
            <DataEntryDiv>
              <InnerEntryDiv>
                <label htmlFor="recipient">Recipient</label>
                <input
                  type="text"
                  name="recipient"
                  placeholder="mail1@example.com"
                  onChange={handleInputChange}
                  required
                />
              </InnerEntryDiv>
              <InnerEntryDiv>
              <label htmlFor="sender">Sender</label>
              <input
                type="text"
                name="sender"
                placeholder="mail2@example.com"
                onChange={handleInputChange}
                required
              />
              </InnerEntryDiv>
              <InnerEntryDiv>
              <label htmlFor="date">Date</label>
              <input type="date" name="date" onChange={handleInputChange} value={formData.date || new Date().toISOString()} required/>
              </InnerEntryDiv>
            <InnerEntryDiv className="subject-div">
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" onChange={handleInputChange}/>
            </InnerEntryDiv>
            </DataEntryDiv>
            <InnerEntryDiv>
            <label htmlFor="body">Your message</label>
              <textarea name="body" onChange={handleInputChange}/>
              </InnerEntryDiv>
              <input type="submit"/>
              {submitting && "Submitting..."}
              {success && "Success!"}
          </form>
        </ModalContainer>
      ) : null}
    </>
  )
}
export default PostEmail
