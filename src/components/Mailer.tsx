import React from 'react';
import MailerForm from "@/UI/MailerForm.tsx";
import {decodingBody} from "@/utils/utils.tsx";
import {mailValue} from "@/constants/mailValue.tsx";

const Mailer = () => {
    return (
        <div className={'flex container flex-col'}>
        <h1>Contact Form</h1>
            <MailerForm></MailerForm>
            <div className={'flex p-4 w-3/4 h-screen'}>
              <p className={''}>{decodingBody(mailValue)}</p>
            </div>
        </div>
    );
};

export default Mailer;
