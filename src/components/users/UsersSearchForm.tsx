import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {Button, TextField} from "@material-ui/core";
import styles from './usersSearchForm.module.css'

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
                <Form className={styles.form}>
                    <Field type="text" name="term" as={TextField} label="Enter name"/>
                    <ErrorMessage name="email" component={TextField} />
                    <Button type="submit" disabled={isSubmitting}>
                        Search
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UsersSearchForm