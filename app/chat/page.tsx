'use client';
import React, { useState } from "react";

// Next.Js
import Image from "next/image";

// Icon
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

type Product = {
    name: string;
    price: string;
    image: string;
};

type Message = {
    id: number;
    sender: "customer" | "store";
    text?: string;
    time: string;
    image?: string;
    product?: Product;
};

type Conversation = {
    id: number;
    name: string;
    avatar: string;
    lastMsg: string;
    date: string;
    unread: number;
    messages: Message[];
};

const conversations: Conversation[] = [
    {
        id: 1,
        name: "Humaira Khanom",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        lastMsg: "কি কি কালারের ফুল পাবেন?",
        date: "05/05",
        unread: 2,
        messages: [
            {
                id: 1,
                sender: "customer",
                text: "apnader kache ki erokom artificial flowers ache?",
                time: "00:00",
                image: "https://images.unsplash.com/photo-1507606875689-59dffa2c2aab",
            },
            {id: 2, sender: "store", text: "সরি এটা নেই", time: "00:01"},
            {
                id: 3,
                sender: "customer",
                product: {
                    name: "Artificial Baby's Breath",
                    price: "৳120",
                    image: "https://images.unsplash.com/photo-1508172466753-aa5687ae25b5",
                },
                time: "00:02",
            },
        ],
    },
    {
        id: 2,
        name: "Safi",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        lastMsg: "স্টক নাই ভাই",
        date: "03/05",
        unread: 0,
        messages: [
            {
                id: 1,
                sender: "customer",
                text: "Brother, do you have large size t-shirts?",
                time: "10:15",
            },
            {id: 2, sender: "store", text: "স্টক নাই ভাই", time: "10:17"},
        ],
    },
    {
        id: 3,
        name: "Md Rafikul",
        avatar: "https://images.unsplash.com/photo-1663893364107-a6ecd06cf615",
        lastMsg: "কোথায় করব বলবেন?",
        date: "03/05",
        unread: 1,
        messages: [
            {
                id: 1,
                sender: "customer",
                text: "Vaiya, payment kibhabe korbo?",
                time: "14:40",
            },
            {
                id: 2,
                sender: "store",
                text: "আপনি আমাদের বিকাশ/নগদে পেমেন্ট করতে পারেন",
                time: "14:45",
            },
            {
                id: 3,
                sender: "customer",
                text: "Okay interested in buying a new phone",
                time: "14:50",
            },
            {
                id: 4,
                sender: "store",
                text: "Okay interested in buying a new phone",
                time: "14:50",
            },
            {
                id: 5,
                sender: "customer",
                text: "Okay interested in buying a new phone",
                time: "14:50",
            },
            {
                id: 6,
                sender: "customer",
                text: "Okay interested in buying a new phone",
                time: "14:50",
            },
            {
                id: 7,
                sender: "store",
                text: "Okay interested in buying a new phone",
                time: "14:50",
            },
            {
                id: 8,
                sender: "customer",
                text: "Okay interested in buying a new phone",
                time: "14:50",
            },
            {
                id: 9,
                sender: "store",
                text: "Okay interested in buying a new phone",
                time: "14:50",
            },
        ],
    },
];

export default function ChatApp() {
    const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
    const [search, setSearch] = useState("");

    return (
        <div className="flex h-dvh bg-gray-100">
            {/* Chat List */}
            <div className={`border-r border-gray-300 bg-white w-80 flex-shrink-0
        ${selectedChat ? "hidden md:flex" : "float-start md:flex"} flex-col`}
            >
                {/* Search Bar */}
                <div className="p-3 m-3 rounded-2xl flex items-center bg-gray-50">
                    <FiSearch className="text-gray-400 mr-2"/>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search customer name..."
                        className="flex-1 bg-transparent outline-none text-sm"
                    />
                    {search && (
                        <button onClick={() => setSearch("")}>
                            <RxCross2 color="red" className="cursor-pointer hover:rotate-90 duration-75"/>
                        </button>
                    )}
                </div>

                {/* Chat List Items */}
                <div className="flex-1 overflow-y-auto">
                    {conversations
                        .filter(c =>
                            c.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map(chat => (
                            <div
                                key={chat.id + chat.name}
                                onClick={() => setSelectedChat(chat)}
                                className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                            >
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={chat.avatar}
                                        alt={chat.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                        loading={"lazy"}
                                        width={40}
                                        height={40}
                                    />
                                    <div>
                                        <div className="font-semibold">{chat.name}</div>
                                        <div className="text-sm text-gray-600 truncate">
                                            {chat.lastMsg}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-400">{chat.date}</div>
                                    {chat.unread > 0 && (
                                        <span className="bg-red-500 text-white text-xs rounded-full px-2">
                                            {chat.unread}
                                    </span>)}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex flex-col flex-1">
                {selectedChat ? (
                    <>
                        {/* Header */}
                        <div className="flex items-center p-4 border-b bg-white">
                            <button className="md:hidden mr-3 animate-bounce"
                                    onClick={() => setSelectedChat(null)}
                            >
                                <FiArrowLeft size={20}/>
                            </button>
                            <Image
                                src={selectedChat.avatar}
                                alt={selectedChat.name}
                                className="w-8 h-8 rounded-full object-cover mr-3"
                                loading={"lazy"}
                                width={32}
                                height={32}
                            />
                            <div>
                                <div className="font-semibold">{selectedChat.name}</div>
                                <div className="text-xs text-gray-500">Active now</div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                            {selectedChat.messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`mb-4 flex ${
                                        msg.sender === "store" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div>
                                        <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                                        {msg.image && (
                                            <Image
                                                src={msg.image}
                                                alt=""
                                                className="mb-2 max-w-xs rounded border"
                                                width={300}
                                                height={200}
                                                loading={"lazy"}
                                            />
                                        )}
                                        {msg.product && (
                                            <div className="bg-white rounded shadow p-3 max-w-xs mb-2">
                                                <Image
                                                    src={msg.product.image}
                                                    alt=""
                                                    className="rounded mb-2"
                                                    width={100}
                                                    height={100}
                                                    loading={"lazy"}
                                                />
                                                <div className="font-semibold">{msg.product.name}</div>
                                                <div className="text-blue-500 font-bold">
                                                    {msg.product.price}
                                                </div>
                                            </div>
                                        )}
                                        {msg.text && (
                                            <div
                                                className={`p-2 max-w-xs rounded-t-lg ${
                                                    msg.sender === "store"
                                                        ? "bg-teal-100 rounded-bl-lg"
                                                        : "bg-slate-100 rounded-br-lg"
                                                }`}
                                            >
                                                {msg.text}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-2 flex gap-2 bg-white">
                            <input
                                type="text"
                                placeholder="Type message here..."
                                className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        // Handle send message logic here
                                        console.log(e.currentTarget.value.trim());
                                        e.currentTarget.value = ""; // Clear input after sending
                                    }
                                }}
                                onChange={(e) => {
                                    let userInput = e.target.value;
                                    if (userInput.length > 0) {
                                        userInput = userInput.charAt(0).toUpperCase() + userInput.slice(1);
                                    }
                                    e.currentTarget.value = userInput;
                                }}
                            />
                            <button className="cursor-pointer">
                                <IoIosSend size={24} color="blue"/>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="items-center justify-center flex-1 text-gray-500 hidden md:flex">
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </div>
    );
}
