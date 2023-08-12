import React from 'react';
import MailerForm from "@/UI/MailerForm.tsx";
import {decodingBody, getMails} from "@/utils/utils.tsx";
import {mailValue} from "@/constants/mailValue.tsx";


const Mailer =  async () => {

    const allMails: string[] | Promise<any> = await getMails()
    console.log(allMails)

    return (
        <div className={'flex container flex-col'}>
            <h1>Contact Form</h1>
            <MailerForm></MailerForm>
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
