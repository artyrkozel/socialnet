import React from "react";
import c from "../ProfileInfo.module.css";
type ContactType = {
    contactTitle: string
    contactValue: string
}

const Contact = (props: ContactType) => {
    return (
        <div className={c.Field}><b>{props.contactTitle}</b> : {props.contactValue}</div>
    )
}
export default Contact