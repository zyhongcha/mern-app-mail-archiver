import styled, { css } from "styled-components"
import { device } from "../mediaQueries"
import { ReactComponent as icon_arrow02 } from "../../assets/icon_arrow02.svg"

const CloseArrow = styled(icon_arrow02)`
  width: 8px;
  transform: rotate(180deg);
  float: left;
  margin-right: 8px;
`

const MailContentWrapper = styled.div`
  border-top: 1px solid #666;
  @media ${device.mobile} {
    position: fixed;
    border: none;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`

const MailBody = styled.div`
  padding: 30px;
  background: #f5f5f5;
  p {
    line-height: 1.5;
  }

  @media ${device.mobile} {
    overflow-y: auto;
    position: relative;
    padding: 16px 30px;
    background: #fff;
    flex: 1;
  }
`

const MailMeta = styled.div`
  padding: 16px 30px;
  background: #ccc;

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
  }
`
const MailMetaHeading = styled.div`
  @media ${device.mobile} {
    ${(props) =>
      props.isModal === true &&
      css`
        margin-left: 0 !important;
      `}
    margin-bottom: 16px;
    margin-left: -16px;
    display: flex;
    justify-content: space-between;
  }
`

const RecipientBlock = styled.div`
  .meta-title {
    font-weight: initial;
    color: #666;
    padding-bottom: 12px;
  }
`

const CloseButton = styled.div`
  color: #666;
  cursor: pointer;
`

const SenderBlock = styled(RecipientBlock)``

const SubjectBlock = styled(RecipientBlock)`
  font-weight: 700;
`
const AttachmentBlock = styled(RecipientBlock)`
  .link {
    color: blue;
    cursor: pointer;
  }
`

const Date = styled.div`
  float: right;
  @media ${device.mobile} {
    float: none;
    text-align: right;
  }
`
const OpenWindow = styled.div`
  float: right;
  span {
    cursor: pointer;
    color: #666;
    text-decoration: underline;
  }
  @media ${device.mobile} {
    float: none;
    order: 1;
    text-align: right;
  }
`

function MailContent({ mail, clickedClose, isMobileView, isModal }) {
  function formatDate(date) {
    return new window.Date(date).toLocaleString("ja-JP", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  }

  function handleClick() {
    sessionStorage.setItem("mailSender", mail.sender)
    sessionStorage.setItem("mailSubject", mail.subject)
    sessionStorage.setItem("mailRecipient", mail.recipient)
    sessionStorage.setItem("mailAttachment", mail.attachment)
    sessionStorage.setItem("mailDate", mail.date)
    sessionStorage.setItem("mailBody", mail.body)
    window.open(
      "/mail",
      "_blank",
      "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=768,left=200,top=200"
    )
  }

  return (
    <MailContentWrapper>
      <MailMeta>
        <MailMetaHeading isModal={isModal}>
          {isMobileView && (
            <CloseButton onClick={clickedClose}>
              <CloseArrow />
              Back to Results
            </CloseButton>
          )}
          <Date>{formatDate(mail.date)}</Date>
        </MailMetaHeading>
        <SenderBlock>
          <span className="meta-title">From: </span>
          {mail.sender}
        </SenderBlock>
        {!isModal && (
          <OpenWindow>
            <span onClick={() => handleClick()}>Open in new window</span>
          </OpenWindow>
        )}
        <SubjectBlock>
          <span className="meta-title">Subject: </span>
          {mail.subject}
        </SubjectBlock>
        <RecipientBlock>
          <span className="meta-title">To: </span>
          {mail.recipient.join(", ")}
        </RecipientBlock>
        {mail.attachment.length > 0 && mail.attachment[0] !== "" && (
          <AttachmentBlock>
            <span className="meta-title">Attachments: </span>
            <span className="link">{mail.attachment.join(", ")}</span>
          </AttachmentBlock>
        )}
      </MailMeta>
      <MailBody>
        <p>{mail.body}</p>
      </MailBody>
    </MailContentWrapper>
  )
}

export default MailContent
