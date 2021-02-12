import React from "react";
import c from './Massage.module.css'

type MassageType = {
    massage: string
}

const Massage: React.FC<MassageType> = (props) => {

    return (
        <div className={c.diolog}>
            {props.massage}
        </div>
    )
}

export default Massage