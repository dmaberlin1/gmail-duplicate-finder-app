import React, {FC, FunctionComponent} from 'react';

interface IMailInfo{
    similar:string
    subject:string
    from:string
}
const MailInfo:FunctionComponent<IMailInfo> = ({similar, subject, from}) => {
    return (
        <div className={'container bg-gray-100 flex gap-10 py-2'}>
            <p>text is similar : <span className={'bg-emerald-100 text-teal-800 text-xl'}>{similar}%</span></p>
            <p> in Subjects <span className={'bg-emerald-100 text-teal-800 text-xl'}>{subject}</span></p>
            <p>From <span className={'bg-emerald-100 text-teal-800 text-xl'}>{from}</span></p>

        </div>
    );
};

export default MailInfo;
