import React, {FC, FunctionComponent} from 'react';

interface IMailInfo{
    similar:string
    subject:string
    from:string
}
const MailInfo:FunctionComponent<IMailInfo> = ({similar, subject, from}) => {
    return (
        <div className={'bg-cyan-50 flex gap-6 py-1 space-y-1 rounded'}>
            <p>text is similar : <span className={'px-3 bg-cyan-100 text-cyan-800 text-xl'}>{similar}%</span></p>
            <p> Subjects <span className={'px-3 bg-cyan-100 text-cyan-800 text-xl'}>{subject}</span></p>
            <p>From <span className={'bg-cyan-100 text-cyan-800 text-xl'}>{from}</span></p>

        </div>
    );
};

export default MailInfo;
