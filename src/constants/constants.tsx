import * as yup from 'yup'

export const  API_KEY='AIzaSyCodgTgvKJFTVin5wBrEGsSoDoTtixH9r4';
export const CLIENT_ID='954300090086-33qh6sg6tg1728lou4pn2vr0ppb815j5.apps.googleusercontent.com';
export const CLIENT_SECRET='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'
export const AUTH_URL='https://accounts.google.com/o/oauth2/auth'
export const ACCESS_TOKEN_URL='https://accounts.google.com/o/oauth2/token'
export const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';


export const BASED_URL='https://gmail.googleapis.com'

export const ACCESS_TOKEN='ya29.a0AfB_byAPo4zse9KHnv-jG-KXf30osbd9iZAiK6J9P6P5UE3bUQ-ZL4Meejtz3LRHmP0QmMSO0IG9fi5OnkjrQrqQCTcIar_2UUZbm9RczAVSTB7AA8_XAiaOj2_z7kVmFuPDynzj3lxgjI6thdSuilB-aT6zJgaCgYKAZUSARMSFQHsvYlsMO9BFK0iCina49l6t88xVA0165'


export const validateEmail=(value:string)=>{
    if(!value) return 'Required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)){
        return 'Invalid email address';
}
}

export const validatePassword=(value:string)=>{
if(!value) return 'Required';
else if(/(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{8,}$/i.test(value)) return 'Password must include nums '
}

export const validateAge=(age:any)=>{
    const ageDif=Date.now()-age;
    const ageDate=new Date(ageDif) // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear()-1970);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore


export const validationSchema=yup.object().shape({
    nickname:yup.string().min(2,'nickname is too short').max(30,'nickname must be shorter')
        .required(),
    email:yup.string().email('Invalid email address').required(),
    message:yup.string().min(5,'message is too short').required(),
})

// export const validationSchema=yup.object().shape({
//     login:yup.string()
//         .min(4,'Login is too short').max(16,'Login must be shorter')
//         .matches(/^[aA-zZ_/-/.]+$/,'incorrect symbols').required('Required'),
//     // age:yup.date().test('age','Please choose a valid date of birth',(value)=>{
//     //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     //     // @ts-ignore
//     //
//     //     return validateAge(new Date(value));
//     // }).required('Please enter your birthday'),
//     email:yup.string().required('Required').email('Invalid email address'),
//     password:yup.string().min(8).matches(/^(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]+$/).required('Required')
// })

// Discovery doc URL for APIs used by the quickstart
export const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
