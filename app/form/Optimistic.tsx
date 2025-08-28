import { useOptimistic, useState, useRef, startTransition } from "react";

type Message = {
    text: string;
    sending?: boolean;
    key?: number;
};

export async function deliverMessage(message: string): Promise<string> {
    await new Promise((res) => setTimeout(res, 1000));
    return message;
}

type ThreadProps = {
    messages: Message[];
    sendMessageAction: (formData: FormData) => Promise<void>;
};

function Thread({ messages, sendMessageAction }: ThreadProps) {
    const formRef = useRef<HTMLFormElement | null>(null);

    async function formAction(formData: FormData) {
        const value = formData.get("message");
        const str = typeof value === "string" ? value : value != null ? String(value) : "";
        addOptimisticMessage(str);
        await new Promise((res) => setTimeout(res, 1000));
        formRef.current?.reset();
        startTransition(async () => {
            await sendMessageAction(formData);
        });
    }

    const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], string>(
        messages,
        (state, newMessage) => [
            {
                text: newMessage,
                sending: true
            },
            ...state,
        ]
    );

    return (
        <div className="p-4 m-4 border rounded-lg max-w-md w-full">
            <form action={formAction} ref={formRef}>
                <input type="text" name="message" placeholder="Hello!" />
                <button type="submit">Send</button>
            </form>
            {optimisticMessages.map((message, index) => (
                <div key={index}>
                    {message.text}
                    {!!message.sending && <small> (Sending...)</small>}
                </div>
            ))}

        </div>
    );
}

export default function App() {
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hello there!", sending: false }
    ]);

    async function sendMessageAction(formData: FormData): Promise<void> {
        const value = formData.get("message");
        const sentMessage = await deliverMessage(
            typeof value === "string" ? value : value != null ? String(value) : ""
        );
        startTransition(() => {
            setMessages((messages) => [{ text: sentMessage }, ...messages]);
        });
    }

    return <Thread messages={messages} sendMessageAction={sendMessageAction} />;
}
