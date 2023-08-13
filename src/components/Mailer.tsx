import React from 'react';
import MailerForm from "@/UI/MailerForm.tsx";
import {decodingBody, fullMail, getMails} from "@/utils/utils.tsx";
import {mailValue} from "@/constants/mailValue.tsx";


const Mailer =  () => {

const testMail=fullMail
    const testMailBody=testMail.payload.parts[0].body.data
    const testMailBodyFormatted=decodingBody(testMailBody)
    // console.log(testMail)
    console.log(testMail.snippet)
    console.log(testMailBodyFormatted)
    // console.log(testMail.payload.parts[0].body.data)
    // console.log(testMail.payload.parts[0].body.data)

    return (
        <div className={'flex container flex-col'}>
            <h1>Contact Form</h1>
            {/*<MailerForm></MailerForm>*/}
            <div className={'flex p-4 w-3/4 h-screen'}>
                {/*<p className={''}>{decodingBody(mailValue)}</p>*/}
                {/*<p>{allMails.map((mail) =>*/}
                {/*    <li key={mail.id}>{mail.id}</li>)*/}
                {/*}</p>*/}
            </div>
        </div>
    );
};

export default Mailer;
