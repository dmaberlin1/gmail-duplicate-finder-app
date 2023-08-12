import React from 'react';
import {Formik, Form, Field,useFormik} from 'formik'
import {cn} from "@/utils/utils.tsx";
import {validateEmail, validatePassword, validationSchema} from "@/constants/constants.tsx";
import Button from "@/UI/Button.tsx";

const MailerForm = () => {

    const onHandleSubmit = (values: any) => {
        console.log('submit', values);
    }


const formik
    = useFormik({
        initialValues:{
            nickname: '',
            email: '',
            message: 'input your message here',
        },
        onSubmit:onHandleSubmit,
            validationSchema:validationSchema,
        })
    return (
        // {({errors, touched}) =>(
            <form className={'flex flex-col'} onSubmit={formik.handleSubmit}>
                {/*login*/}
                <label className={cn('bg-emerald-200', {'bg-red-300': formik.errors.nickname && formik.touched.nickname})}>nickname</label>
                <input className={cn('bg-emerald-200', {'bg-red-300': formik.errors.nickname && formik.touched.nickname})}
                       name={'login'}/>
                  {/*email  */}
                <label className={cn('bg-emerald-200', {'bg-red-300': formik.errors.email && formik.touched.email})}>Mail</label>
                <input className={cn('bg-emerald-200', {'bg-red-300': formik.errors.email && formik.touched.email})}
                       name={'email'}
                    // validate={validateEmail}
                />
                {formik.errors.email && formik.touched.email && (
                    <div className={'bg-red-300'}>{formik.errors.email}</div>
                )}
                {/*message*/}
                <label className={cn('bg-emerald-200', {'bg-red-300': formik.errors.message && formik.touched.message})}>Message</label>
                <textarea className={cn('bg-emerald-200', {'bg-red-300': formik.errors.message && formik.touched.message})}
                       name={'message'} cols={5} rows={8}/>


                <Button type={"submit"}>send</Button>
            </form>

    )
}
;

export default MailerForm;
