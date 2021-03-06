import React, {ChangeEvent, useEffect, useState} from "react";


type profileStatusType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatusWithHooks = React.memo((props: profileStatusType) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return <div>
        {!editMode &&
        <div>
            <span onDoubleClick={activateEditMode}>{props.status}</span>
        </div>}
        {editMode &&
        <div>
            <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
        </div>}
    </div>
})

export default ProfileStatusWithHooks