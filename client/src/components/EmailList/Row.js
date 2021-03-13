import styled from "styled-components"
import { ReactComponent as icon_mail_sp } from "../../assets/icon_mail_sp.svg"
import { ReactComponent as icon_clip } from "../../assets/icon_clip.svg"
import { ReactComponent as icon_arrow02 } from "../../assets/icon_arrow02.svg"
import { device } from "../mediaQueries"

const ClipSvg = styled(icon_clip)`
  width: 1rem;
`
const MailSvg = styled(icon_mail_sp)`
  width: 14px;
  height: 30px;
  padding-top: 17px;
  display:block;
  
`
const ArrowDownSvg = styled(icon_arrow02)`
  width: 4px;
  margin-left: 6px;
`

const RowWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;

  &:hover {
    background: #eee;
    color: blue;
    cursor: pointer;
    svg .a {
    fill: blue;
  }
  }

  @media ${device.mobile} {
    margin: 0px 12px;
  }
`

const RowDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  align-items: center;
  position: relative;
  min-height: 40px;
  width: 100%;
  border-bottom: 1px solid #dedede;
  padding: 0px 12px;
  overflow: hidden;
  
  & > .shrink {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media ${device.mobile} {
    padding: 12px 12px;
    flex-flow: column nowrap;
    align-items: flex-start;
    row-gap: 6px;
    width: 100%;
  }
`

const InlineBlock = styled.div`
  @media ${device.mobile} {
    width: 100%;
    margin: 0;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
`

const SenderBlock = styled(InlineBlock)`
  margin: auto 24px auto 0;
  flex: 0 0 15%;

  @media ${device.mobile} {
    font-weight: 700;
    margin: 0;
  }
  & .mobileMeta {
    display: flex;
    justify-content: flex-end;
    flex-wrap: nowrap;
  }
`

const InnerWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const RecipientBlock = styled.div`
  flex: 0 0 20%;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const AdditionalRecipient = styled(InlineBlock)`
  flex: 0 0 5%;
  margin: auto 24px;
  @media ${device.mobile} {
    margin: 0px 0px 0px 18px;
  }
`
const AdditionalRecipientCount = styled.div`
  background: #888;
  color: #fff;
  font-weight: 700;
  font-size: 0.66rem;
  letter-spacing: 0.1rem;
  width: max-content;
  margin: auto;
  padding: 4px 5px;
  border-radius: 5px;
`

const SubjectBlock = styled(InlineBlock)`
  flex: 0 1 62%;
  min-width: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Attachment = styled.div`
  flex: 0 0 2%;
  margin: auto 12px;
`

const DateBlock = styled.div`
  flex: 1 0 8%;
  white-space: nowrap;
  @media ${device.mobile} {
    flex: 0 1 auto;
  }
`

function Row({ mailmeta, isMobileView, showContents }) {

  function formatDate() {
    let fullCurrentDate = new window.Date()
    let fullEmailDate = new window.Date(mailmeta.date)
    let output = ""

    if (
      fullEmailDate.toLocaleDateString("ja-JP") ===
      fullCurrentDate.toLocaleDateString("ja-JP")
    ) {
      // mail from today?
      output = fullEmailDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    } else if (
      fullEmailDate.toLocaleDateString("ja-JP").substr(0, 7) ===
      fullCurrentDate.toLocaleDateString("ja-JP").substr(0, 7)
    ) {
      // mail from this month?
      output = fullEmailDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      })
    } else {
      // full date format for anything older
      output = fullEmailDate.toLocaleDateString("ja-JP")
    }
    return output
  }

  function showRecipients() {
    let output = mailmeta.recipient.join(", ")
    return output
  }

  return (
    <RowWrapper onClick={() => showContents(mailmeta)}>
    { isMobileView && <MailSvg /> }
    <RowDiv>
      <SenderBlock className="shrink">
        <InnerWrapper>{mailmeta.sender}</InnerWrapper>
        {!isMobileView ? "" 
        : <div className="mobileMeta"><Attachment>{mailmeta.attachment.length !== 0 ? <ClipSvg /> : ""}</Attachment>
        <DateBlock>{formatDate()}<ArrowDownSvg/></DateBlock></div>
        } 
      </SenderBlock>
      <RecipientBlock className="shrink" >
        <InnerWrapper>{showRecipients()}</InnerWrapper>
        <AdditionalRecipient>
          {mailmeta.recipient.length > 1 ? (
            <AdditionalRecipientCount>
              +{mailmeta.recipient.length - 1}
            </AdditionalRecipientCount>
          ) : (
            ""
          )}
        </AdditionalRecipient>
      </RecipientBlock>

      <SubjectBlock className="shrink">
        <InnerWrapper>{mailmeta.subject}</InnerWrapper>
        {isMobileView ? "" 
        : <Attachment>{mailmeta.attachment.length !== 0 ? <ClipSvg /> : ""}</Attachment>
        }
      </SubjectBlock>
      {isMobileView ? "" : <DateBlock>{formatDate()}</DateBlock>}
    </RowDiv>
    </RowWrapper>
  )
}

export default Row
