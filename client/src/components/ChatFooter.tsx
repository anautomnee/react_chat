import {useForm, SubmitHandler} from "react-hook-form";
import {SocketProps} from "../routes/MainRouter.tsx";
import {useEffect} from "react";

type Inputs = {
    message: string
}

export const ChatFooter = ({ socket }:SocketProps) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        const username = localStorage.getItem("username");
        if(data.message && username) {
            socket.emit("message", {
                socketId: socket.id,
                username: username,
                id: `${socket.id}${Math.random()}`,
                text: data.message,
            });
        }
        reset();
    };

    const handleTyping = () => {
        socket.emit('typing', `${localStorage.getItem('username')} is typing`);
    };

    const handleStopTyping = () => {
        socket.emit('typing', "");
    };

    useEffect(() => {
        const handleClick = () => {
            handleStopTyping();
        };

        // Add event listener for clicks
        document.addEventListener("click", handleClick);

        // Cleanup the event listener
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [socket]); // Depend on socket to ensure proper cleanup

    return (
        <form
            className="flex justify-between mt-2"
            onSubmit={handleSubmit(onSubmit)}>
            <input
                placeholder="Message..."
                className="border-2 rounded-lg h-9 py-1 px-3 w-60"
                onKeyDown={handleTyping}
                {...register("message", { required: true, minLength: 1 })} />
            <button type="submit" className="bg-slate-500 rounded w-fit py-1 px-3 mb-3 text-white">Send</button>
        </form>
    );
};