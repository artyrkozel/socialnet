import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {TextField} from "@material-ui/core";



const usersFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type usersFormType = {
    onFilterChanged: (filter: FilterType) => void
}
const UsersSearchForm = React.memo((props: usersFormType) => {

    const submit = (values: FilterType, { setSubmitting } : {setSubmitting : (isSubmitting: boolean) => void}) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }


    return <div>
        <Formik
            initialValues={{ term: ''}}
            validate={usersFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form style={{textAlign:'left'}}>
                    {/*<TextField type="text" label="Filled" variant="filled" name='term' onChange={formik.handleChange}/>*/}
                    <Field type="text" name="term"/>
                    <ErrorMessage name="email" component="div" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UsersSearchForm