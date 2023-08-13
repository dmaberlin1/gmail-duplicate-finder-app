import React from 'react';
import MailerForm from "@/UI/MailerForm.tsx";
import {allMails, calculateSimilarityPercentage, decodingBody, getMailById, getMails} from "@/utils/utils.tsx";
import {mailValue} from "@/constants/mailValue.tsx";
import {log} from "util";


const Mailer =  () => {

    // console.log(allMails)
    const idEmails=allMails?.map(mail=>mail.id)
    // console.log(idEmails)

    const arrayWithId=[]

    const getAllMail=async(idArray:string[])=>{
        const results=[];
        for(const id of idArray){
            const result=await getMailById(id);
            results.push(result)
        }
        return results
    }

  /* filter for Subject */
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

            filteredGroups.forEach(group => {
                for (let i = 0; i < group.length; i++) {
                    const baseText = decodingBody(group[i].payload.parts[0].body.data);

                    for (let j = i + 1; j < group.length; j++) {
                        const textToCompare = decodingBody(group[j].payload.parts[0].body.data);
                        const similarityPercentage = calculateSimilarityPercentage(baseText, textToCompare);
                        console.log(`Похожесть текстов: ${similarityPercentage}%`);
                    }
                }
            });

            // console.log('1 elem');
            // console.log(filteredGroups[0][0].payload.headers[3].value); //Subject
            // console.log(filteredGroups[0][0].payload.headers[4].value); //From
            // console.log(decodingBody(filteredGroups[0][0].payload.parts[0].body.data)); //body decoding
            // console.log('2 elem');
            // console.log(filteredGroups[1][0].payload.headers[3].value); //Subject
            // console.log(filteredGroups[1][0].payload.headers[4].value); //From
            // console.log(decodingBody(filteredGroups[1][0].payload.parts[0].body.data)); //body decoding

        })
        .catch(error => {
            console.error(error);
        });








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


  /**********************Worked filter********** without reducer*/
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
    //         console.log(groupedByValue);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });



    //
    // getAllMail(idEmails)
    //     .then(results => {
    //         arrayWithId.push(...results);
    //         const filteredArray = arrayWithId.filter(
    //             (mail, index, arr) => arr.findIndex(mail => mail.payload.headers[3].value === mail.payload.headers[3].value) === index
    //         );
    //         console.log(filteredArray);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });


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
