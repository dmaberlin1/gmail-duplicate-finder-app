import React, {Suspense, useEffect, useState} from 'react';
import {
    allMails,
    calculateSimilarityPercentage,
    decodingBody,
    getMailById,
    getMails
} from "@/utils/utils.tsx";
import MailInfo from "@/components/MailInfo.tsx";
import Button from "@/UI/Button.tsx";


const Mailer = () => {
    const [mailInfoComponentsSubject, setMailInfoComponentsSubject] = useState([]);
    const [mailInfoComponentsSender, setMailInfoComponentsSender] = useState([]);
    const [isLoadingSubject, setIsLoadingSubject] = useState(false);
    const [isLoadingSender, setIsLoadingSender] = useState(false);

    const idEmails = allMails?.map(mail => mail.id)
    const arrayWithId = []

    // useEffect(() => {
    //
    //     setMailInfoComponents(mailInfoComponentsSubject);
    // }, [mailInfoComponentsSubject]);
     const getAllMail=async(idArray:string[])=>{
        const results=[];
        for(const id of idArray){
            const result=await getMailById(id);
            results.push(result)
        }
        return results
    }

    const handleLoadDataBySubject = () => {
        setIsLoadingSubject(true);
        getAllMail(idEmails)
            .then(results => {
                const groupedByValue = results.reduce((groups, mail) => {
                    const value = mail.payload.headers[3].value;
                    if (!groups[value]) {
                        groups[value] = [];
                    }
                    groups[value].push(mail);
                    return groups;
                }, {});

                const filteredGroups = Object.values(groupedByValue)
                    .filter(group => group.length > 1)

                const newMailInfoComponents = [];

                filteredGroups.forEach(group => {
                    let resultOutput = false;
                    for (let i = 0; i < group.length && !resultOutput; i++) {
                        const baseText = decodingBody(group[i].payload.parts[0].body.data);

                        for (let j = i + 1; j < group.length && !resultOutput; j++) {
                            const textToCompare = decodingBody(group[j].payload.parts[0].body.data);
                            const similarityPercentage = calculateSimilarityPercentage(baseText, textToCompare);
                            const subject = group[j].payload.headers[3].value
                            const from = group[j].payload.headers[4].value
                            const key = group[j].id

                            console.log(`text is similar: ${similarityPercentage}%
                             in Subject : ${group[j].payload.headers[3].value}
                             From : ${group[j].payload.headers[4].value}
                             `);

                            const mailInfoComponent = <MailInfo key={key} similar={similarityPercentage}
                                                                subject={group[j].payload.headers[3].value}
                                                                from={group[j].payload.headers[4].value}/>

                            newMailInfoComponents.push(mailInfoComponent)
                            resultOutput = true;
                        }
                    }
                });

                setMailInfoComponentsSubject(newMailInfoComponents);
                setIsLoadingSubject(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoadingSubject(false);
            });
    };

    const handleLoadDataBySender = () => {
        setIsLoadingSender(true);
        getAllMail(idEmails)
            .then(results => {
                const groupedByValue = results.reduce((groups, mail) => {
                    const value = mail.payload.headers[4].value;
                    if (!groups[value]) {
                        groups[value] = [];
                    }
                    groups[value].push(mail);
                    return groups;
                }, {});

                const filteredGroups = Object.values(groupedByValue)
                    .filter(group => group.length >= 0) //fix  from 1 to 0

                const newMailInfoComponents = [];

                filteredGroups.forEach(group => {
                    let resultOutput = false;
                    for (let i = 0; i < group.length && !resultOutput; i++) {
                        const baseText = decodingBody(group[i].payload.parts[0].body.data);

                        for (let j = i + 1; j < group.length && !resultOutput; j++) {
                            const textToCompare = decodingBody(group[j].payload.parts[0].body.data);
                            const similarityPercentage = calculateSimilarityPercentage(baseText, textToCompare);
                            const subject = group[j].payload.headers[3].value
                            const from = group[j].payload.headers[4].value
                            const key = group[j].id

                            console.log(`text is similar: ${similarityPercentage}%
                             in Subject : ${group[j].payload.headers[3].value}
                             From : ${group[j].payload.headers[4].value}
                             `);
                            console.log(group)
                            console.log(group[j].payload.headers[4].value)

                            const mailInfoComponent = <MailInfo key={key} similar={similarityPercentage}
                                                                subject={group[j].payload.headers[3].value}
                                                                from={group[j].payload.headers[4].value}/>

                            newMailInfoComponents.push(mailInfoComponent)
                            resultOutput = true;
                        }
                    }
                });

                setMailInfoComponentsSender(newMailInfoComponents);
                setIsLoadingSender(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoadingSender(false);
            });
    };









// const testMail=fullMail
//     const testMailBody=testMail.payload.parts[0].body.data
//     const testMailSubject=testMail.payload.headers[3].value
//     const testMailFrom=testMail.payload.headers[4].value
//     const testMailBodyFormatted=decodingBody(testMailBody)
    // console.log(testMail)
    // console.log(testMail.snippet)
    // console.log(testMailBodyFormatted)
    // console.log(testMailSubject)
    // console.log(testMailFrom);


    return (
        <div className={'flex flex-col py-4'}>
            <h1 className={'text-4xl text-cyan-950 pl-52'}>Find duplicate</h1>

            <div className={'flex container mx-auto flex-row p-4 gap-5 py-5'}>
            <div className={'w-1/2 space-y-1'}>
                <p>find duplicate by <span className={'font-bold'}>Subject</span></p>
             <Button onClick={handleLoadDataBySubject}
                    disabled={isLoadingSubject}>{isLoadingSubject ? 'Loading...':'Load Data'}
            </Button>
                {mailInfoComponentsSubject.length > 0 && mailInfoComponentsSubject}

            </div>
            <div className={'w-1/2 space-y-1'}>
                <p>find duplicate by <span className={'font-bold'}>Sender</span></p>
                <Button onClick={handleLoadDataBySender}
                        disabled={isLoadingSender}>{isLoadingSender ? 'Loading...':'Load Data'}</Button>
                {mailInfoComponentsSender.length > 0 && mailInfoComponentsSender}

            </div>
        </div>
            <div>
            </div>
        </div>
    );
};

export default Mailer;
