import {Message} from "./ChatPage.tsx";
import {Ref} from "react";

type ChatBodyProps = {
    messages: Message[],
    typingStatus: string,
    lastMessageRef: Ref<HTMLDivElement>,
}

export const ChatBody = ({messages, typingStatus, lastMessageRef}: ChatBodyProps) => {
    return (
        <div className="bg-white rounded-lg h-52 overflow-y-auto scrollbar-hide px-4 py-6">
            {messages.map((message) =>
                message.username === localStorage.getItem('username') ? (
                    <div className="flex gap-2 text-lg" key={message.id}>
                        <p className="font-bold">You: </p>
                        <div className="message__sender">
                            <p>{message.text}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-2 text-lg" key={message.id}>
                        <p className="font-bold">{message.username}: </p>
                        <div className="message__recipient">
                            <p>{message.text}</p>
                        </div>
                    </div>
                )
            )}
            <div ref={lastMessageRef}/>
            <div className="text-slate-500">
                <p>{typingStatus.length > 0 ? typingStatus + "..." : ""}</p>
            </div>
        </div>
    )
};