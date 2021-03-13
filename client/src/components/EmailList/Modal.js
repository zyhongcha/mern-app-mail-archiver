import MailContent from "./MailContent";

function Modal() {

    let isModal = true
    let mail = {
                subject: sessionStorage.mailSubject,
                sender: sessionStorage.mailSender,
                recipient: sessionStorage.mailRecipient.split(','),
                date: sessionStorage.mailDate,
                attachment: sessionStorage.mailAttachment.split(','),
                body: sessionStorage.mailBody
    }
    console.log(mail)
    
    return(
        <>
        <MailContent mail={mail} isModal={isModal}/>
        </>
    )
}

export default Modal