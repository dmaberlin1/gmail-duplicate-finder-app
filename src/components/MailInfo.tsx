import React, {FC, FunctionComponent} from 'react';

interface IMailInfo{
    similar:string
    subject:string
    from:string
    count:count
}
const MailInfo:FunctionComponent<IMailInfo> = ({similar, subject, from,count}) => {
    return (
        <div className={'bg-cyan-50 flex gap-6 py-1 space-y-1 rounded'}>
            <p>text is similar : <span className={'rounded px-3 bg-cyan-100 text-cyan-800 text-xl'}>{similar}%</span></p>
            <div>
            <p> Subjects <span className={'rounded px-3 bg-cyan-100 text-cyan-800 text-xl'}>{subject}</span></p>
            <p>Count:<span className={'rounded px-3 bg-cyan-100 text-cyan-800 text-xl'}>{count}</span></p>
            </div>
            <p className={'flex flex-col'}>From <span className={'rounded bg-cyan-100 text-cyan-800 text-lg'}>{from}</span></p>

        </div>
    );
};

export default MailInfo;
