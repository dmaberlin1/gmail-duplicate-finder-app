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
import {log} from "util";
import {array} from "yup";


const Mailer = () => {
    const [mailInfoComponentsSubject, setMailInfoComponentsSubject] = useState([]);
    const [mailInfoComponentsSender, setMailInfoComponentsSender] = useState([]);
    const [isLoadingSubject, setIsLoadingSubject] = useState(false);
    const [isLoadingSender, setIsLoadingSender] = useState(false);

    const idEmails = allMails?.map(mail => mail.id)
    const arrayWithId = []
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
                console.log(results)
                const groupedByValue = results.reduce((groups, mail) => {
                   if(mail.payload.headers[19] !==undefined){
                    const value = mail.payload.headers[19].value;
                    if (!groups[value]) {
                        groups[value] = [];
                    }
                    groups[value].push(mail);
                    return groups;
                   }
                }, {});
                // console.log(groupedByValue)
                const filteredGroups = Object.values(groupedByValue)
                    .filter(group => group.length >= 1) //fix from = to >=
                const newMailInfoComponents:[] = [];

                filteredGroups.forEach(group => {
                    let resultOutput = false;
                    for (let i = 0; i < group.length && !resultOutput; i++) {
                        const baseText = decodingBody(group[i].payload.parts[0].body.data);
                        for (let j = i + 1; j < group.length && !resultOutput; j++) {

                            const textToCompare = decodingBody(group[j].payload.parts[0].body.data);
                            const similarityPercentage = calculateSimilarityPercentage(baseText, textToCompare);
                            const subject = group[j].payload.headers[19].value
                            const from = group[j].payload.headers[16].value
                            const key = group[j].id

                            console.log(`text is similar: ${similarityPercentage}%
                             in Subject : ${group[j].payload.headers[19].value}
                             From : ${group[j].payload.headers[16].value}
                             groupLength:${group.length}   
                             `);

                            const mailInfoComponent = <MailInfo key={key} similar={similarityPercentage}
                                                                subject={group[j].payload.headers[19].value}
                                                                from={group[j].payload.headers[16].value}
                                                                count={group.length}

                            />

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

    //console to out emails
    // console.log(filteredGroups[0][0].payload.headers[19].value); //Subject
//             // console.log(filteredGroups[0][0].payload.headers[16].value); //From


    const handleLoadDataBySender = () => {

        setIsLoadingSender(true);
        getAllMail(idEmails)
            .then(results => {
                const groupedByValue = results.reduce((groups, mail) => {
                    if(mail.payload.headers[19] !==undefined) {

                        const value = mail.payload.headers[16].value;
                        if (!groups[value]) {
                            groups[value] = [];
                        }
                        groups[value].push(mail);
                        return groups;
                    }
                }, {});

                const filteredGroups = Object.values(groupedByValue)
                    .filter(group => group.length >= 1) //fix  from 1 to 0

                const newMailInfoComponents = [];
                console.log(filteredGroups[0])

                const SubjectsUniqueValues = [...new Set(filteredGroups[0].map(item => item.payload.headers[19].value))];
                const SubjectsUniqueValuesAsString=SubjectsUniqueValues.join(', ')
                console.log(SubjectsUniqueValues);
                console.log(SubjectsUniqueValuesAsString)


                filteredGroups.forEach(group => {
                    let resultOutput = false;
                    for (let i = 0; i < group.length && !resultOutput; i++) {
                        const baseText = decodingBody(group[i].payload.parts[0].body.data);
                        console.log(group[i].payload.headers[19].value +'<<<< from I loop')



                        for (let j = i + 1; j < group.length && !resultOutput; j++) {
                            const textToCompare = decodingBody(group[j].payload.parts[0].body.data);
                            const similarityPercentage = calculateSimilarityPercentage(baseText, textToCompare);
                            const subject = group[j].payload.headers[19].value
                            const from = group[j].payload.headers[16].value
                            const key = group[j].id

                            console.log(`text is similar: ${similarityPercentage}%
                             in Subject : ${group[j].payload.headers[19].value}
                             From : ${group[j].payload.headers[16].value}
                             `);


                            const mailInfoComponent = <MailInfo key={key} similar={similarityPercentage}
                                                                // subject={group[j].payload.headers[19].value}
                                                                subject={SubjectsUniqueValuesAsString}
                                                                from={group[j].payload.headers[16].value}
                                                                count={group.length}
                            />

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
