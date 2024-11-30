import {useForm, SubmitHandler} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {SocketProps} from "../routes/MainRouter.tsx";

type Inputs = {
    username: string;
}

export const HomePage = ({ socket }:SocketProps) => {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        localStorage.setItem("username", data.username);
        socket.emit("newUser", {
            username: data.username,
            socketId: socket.id,
        })
        navigate("/chat");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col bg-slate-200 py-8 px-6 items-center rounded-xl">
                <h3 className="text-xl font-bold mb-3">Sign in to open chat</h3>
                <form
                    className="flex flex-col gap-3 items-center"
                    onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className="border-2 rounded h-9 py-1 px-3"
                        {...register("username", {required: true})}
                    />
                    <button className="bg-slate-600 rounded w-fit py-1 px-3 text-white" type="submit">Open chat</button>
                </form>
            </div>
        </div>
    )
};