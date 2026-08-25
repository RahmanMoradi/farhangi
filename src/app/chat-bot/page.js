"use client";
import { useRouter } from "next/navigation";
import { useSession } from "@/Context/SessionContext";
import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Menu from "@/Components/menu/Menu";
import Image from "next/image";
import Footer from "@/Components/Footer/Footer";

function StartChatBot () {
    const { fetchSessionInfo } = useSession();
    const router = useRouter();

    const handleEnterChat = async () => {
        await fetchSessionInfo(); 
        router.push('/chat-bot/conversation'); 
    };

    return (
        <>
        <div className="body">
            <Navbar />
            <div className="w-full h-[30rem] xl:h-[42rem]" onClick={handleEnterChat}>
                <div className="w-full h-full items-center justify-center flex flex-col">
                    <Image
                        src="/images/chatBot/chat-bot.webp"
                        width={500}
                        height={500}
                        alt="chat-bot"
                        className="w-52 cursor-pointer"
                    />
                    <h2 className="mt-4 text-[20px] font-yekan xl:text-[22px] font-bold w-60 text-center cursor-pointer" style={{ color: 'rgba(198, 40, 40, 1)' }}>
                       سلام لطفا برای شروع چت کلیک کنید
                    </h2>
                </div>
            </div>
            <Menu />
        </div>
        <Footer />
        </>
    )
}

export default StartChatBot;