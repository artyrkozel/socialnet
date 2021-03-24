import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {Avatar} from "@material-ui/core";






type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

export const ChatPage = () => {
    return(
        <div>
            <Chat />
        </div>
    )
}

const Chat = () => {
    const [wsChanel, setWsChanel] = useState<WebSocket | null>(null)
    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            setTimeout(createChanel, 3000)

        }
        function createChanel() {
                ws?.removeEventListener('close', closeHandler)
                ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChanel(ws)
        }
        createChanel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return(
        <>
           <Messages wsChanel={wsChanel}/>
           <AddMessageForm wsChanel={wsChanel}/>
        </>
    )
}


const Messages:React.FC<{wsChanel:WebSocket | null}> = ({wsChanel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        wsChanel?.addEventListener('message', messageHandler)
        return () => {
            wsChanel?.removeEventListener('message', messageHandler)
        }
    }, [wsChanel])

    return (
        <div style={{height: '620px', overflowY: 'auto'}}>
            {messages.map((m) => <Message message={m}/>)}
        </div>
    )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return (
        <div style={{display: "flex", alignItems: 'center', marginBottom: '15px', padding: '15px', backgroundColor: 'rgba(192, 192, 192, .7)' , borderRadius: '15px'}}>
            <div style={{paddingRight: '20px'}}>
                <Avatar src={message.photo}/>
            </div>
            <div>
                <b>{message.userName}</b>
                <div>
                    {message.message}
                </div>
            </div>

        </div>
    )
}

const AddMessageForm:React.FC<{wsChanel:WebSocket | null}> = ({wsChanel})=> {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>("pending")
    useEffect(() => {
        let openHandler = () => {
            setReadyStatus("ready")
        }
        wsChanel?.addEventListener('open', openHandler)
        return () => {
            wsChanel?.removeEventListener('open', openHandler)
        }
    }, [wsChanel])

    const sendMessage = () => {
        if (!message){
            return
        }
        wsChanel?.send(message)
        setMessage('')
    }

    return (
        <div>
            <div style={{marginTop: '20px'}}>
                <TextField id="outlined-basic" label="Enter message" variant="filled" fullWidth
                           onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <div style={{marginTop: '10px'}}>
                <Button disabled={wsChanel === null || readyStatus !== "ready"} onClick={sendMessage} variant="contained" color="primary">
                    Send
                </Button>
            </div>

        </div>
    )
}