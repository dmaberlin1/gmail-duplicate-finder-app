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
    const [mailInfoComponents, setMailInfoComponents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const idEmails = allMails?.map(mail => mail.id)
    const arrayWithId = []

    // useEffect(() => {
    //
    //     setMailInfoComponents(mailInfoComponents);
    // }, [mailInfoComponents]);
     const getAllMail=async(idArray:string[])=>{
        const results=[];
        for(const id of idArray){
            const result=await getMailById(id);
            results.push(result)
        }
        return results
    }

    const handleLoadData = () => {
        setIsLoading(true);
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

                setMailInfoComponents(newMailInfoComponents);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    };



    // getAllMail(idEmails)
    //     .then(results => {
    //         const groupedByValue = results.reduce((groups, mail) => {
    //             const value = mail.payload.headers[3].value;
    //
    //             if (!groups[value]) {
    //                 groups[value] = [];
    //             }
    //             groups[value].push(mail);
    //
    //             return groups;
    //         }, {});
    //
    //         const filteredGroups = Object.values(groupedByValue)
    //             .filter(group => group.length > 1)
    //
    //         filteredGroups.forEach(group => {
    //             let resultOutput = false; // Флаг для проверки вывода результата
    //             for (let i = 0; i < group.length && !resultOutput; i++) {
    //                 const baseText = decodingBody(group[i].payload.parts[0].body.data);
    //
    //                 for (let j = i + 1; j < group.length && !resultOutput; j++) {
    //                     const textToCompare = decodingBody(group[j].payload.parts[0].body.data);
    //                     const similarityPercentage = calculateSimilarityPercentage(baseText, textToCompare);
    //                     const subject = group[j].payload.headers[3].value
    //                     const from = group[j].payload.headers[4].value
    //                     const key = group[j].id
    //                     console.log(`text is similar: ${similarityPercentage}%
    //                      in Subject : ${group[j].payload.headers[3].value}
    //                      From : ${group[j].payload.headers[4].value}
    //                      `);
    //
    //                     const mailInfoComponent = <MailInfo key={key} similar={similarityPercentage}
    //                                                         subject={group[j].payload.headers[3].value}
    //                                                         from={group[j].payload.headers[4].value}/>
    //
    //                     mailInfoComponents.push(mailInfoComponent)
    //                     resultOutput = true; // Устанавливаем флаг, чтобы не выводить результат еще раз
    //                 }
    //             }
    //         });
    //         return mailInfoComponents
    //
    //         // console.log('1 elem');
    //         // console.log(filteredGroups[0][0].payload.headers[3].value); //Subject
    //         // console.log(filteredGroups[0][0].payload.headers[4].value); //From
    //         // console.log(decodingBody(filteredGroups[0][0].payload.parts[0].body.data)); //body decoding
    //         // console.log('2 elem');
    //         // console.log(filteredGroups[1][0].payload.headers[3].value); //Subject
    //         // console.log(filteredGroups[1][0].payload.headers[4].value); //From
    //         // console.log(decodingBody(filteredGroups[1][0].payload.parts[0].body.data)); //body decoding
    //
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });


    /* filter for Subject with components and some left copy of components */
    // getAllMail(idEmails)
    //     .then(results => {
    //         const groupedByValue = results.reduce((groups, mail) => {
    //             const value = mail.payload.headers[3].value;
    //
    //             if (!groups[value]) {
    //                 groups[value] = [];
    //             }
    //             groups[value].push(mail);
    //
    //             return groups;
    //         }, {});
    //
    //         const filteredGroups = Object.values(groupedByValue)
    //             .filter(group => group.length > 1)
    //
    //         filteredGroups.forEach(group => {
    //             let resultOutput = false; // Флаг для проверки вывода результата
    //              for (let i = 0; i < group.length && !resultOutput; i++) {
    //                 const baseText = decodingBody(group[i].payload.parts[0].body.data);
    //
    //                 for (let j = i + 1; j < group.length && !resultOutput; j++) {
    //                     const textToCompare = decodingBody(group[j].payload.parts[0].body.data);
    //                     const similarityPercentage = calculateSimilarityPercentage(baseText, textToCompare);
    //                     const subject=group[j].payload.headers[3].value
    //                     const from=group[j].payload.headers[4].value
    //                     console.log(`text is similar: ${similarityPercentage}%
    //                      in Subject : ${group[j].payload.headers[3].value}
    //                      From : ${group[j].payload.headers[4].value}
    //                      `);
    //
    //                     const  mailInfoComponent=<MailInfo similar={similarityPercentage} subject={group[j].payload.headers[3].value} from={group[j].payload.headers[4].value}/>
    //                     mailInfoComponents.push(mailInfoComponent)
    //                     resultOutput = true; // Устанавливаем флаг, чтобы не выводить результат еще раз
    //                 }
    //             }
    //         });
    //         return mailInfoComponents
    //
    //         // console.log('1 elem');
    //         // console.log(filteredGroups[0][0].payload.headers[3].value); //Subject
    //         // console.log(filteredGroups[0][0].payload.headers[4].value); //From
    //         // console.log(decodingBody(filteredGroups[0][0].payload.parts[0].body.data)); //body decoding
    //         // console.log('2 elem');
    //         // console.log(filteredGroups[1][0].payload.headers[3].value); //Subject
    //         // console.log(filteredGroups[1][0].payload.headers[4].value); //From
    //         // console.log(decodingBody(filteredGroups[1][0].payload.parts[0].body.data)); //body decoding
    //
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });


    // /* working func with reduce*/
    // getAllMail(idEmails)
    //     .then(results => {
    //         const groupedByValue = results.reduce((groups, mail) => {
    //             const value = mail.payload.headers[3].value;
    //
    //             if (!groups[value]) {
    //                 groups[value] = [];
    //             }
    //             groups[value].push(mail);
    //
    //             return groups;
    //         }, {});
    //
    //         const filteredGroups = Object.keys(groupedByValue)
    //             .filter(value => groupedByValue[value].length > 1)
    //             .reduce((filtered, value) => {
    //                 filtered[value] = groupedByValue[value];
    //                 return filtered
    //             }, {});
    //
    //         console.log(filteredGroups);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    //


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
        <div className={'flex container flex-col p-4'}>
            <h1>Contact Form</h1>
            <Button onClick={handleLoadData} disabled={isLoading}>{isLoading ? 'Loading...':'Load Data'}</Button>

            {  mailInfoComponents}
            {/*<div>*/}
            {/*    {isLoading ? (*/}
            {/*        <p>Loading...</p>*/}
            {/*    ) : (*/}
            {/*         mailInfoComponents*/}
            {/*    )}*/}
            {/*</div>*/}


        </div>
    );
};

export default Mailer;
