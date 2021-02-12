import React from "react";
import c from './../Diologs.module.css';
import {NavLink} from "react-router-dom";


type DiologItemType = {
    id: number;
    name: string;
}

const DiologItem: React.FC<DiologItemType> = (props) => {

    return (
        <div className={c.diolog + ' ' + c.active}>
            <NavLink to={"/diologs/" + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DiologItem;