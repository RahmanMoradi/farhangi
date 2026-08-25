import React from 'react'
import Styles from "@/Components/ChatBot/ChatBat.module.css"
import Image from 'next/image'

function LoadingChatBot() {
    return (
        <div className="flex items-center justify-end">
            <div className="lg:flex lg:justify-end">
                <div className="relative bg-light_brown_200 text-[14px] lg:!text-[16px] p-3 rounded-xl lg:pl-16">
                    <div className="flex justify-between w-24 h-8 items-end">
                        <div className={`${Styles.ball} ${Styles.ballFix}`}></div>
                        <div className={`${Styles.ball} ${Styles.ball2}`}></div>
                        <div className={`${Styles.ball} ${Styles.ballFix}`}></div>
                        <div className={`${Styles.ball} ${Styles.ball4}`}></div>
                        <div className={`${Styles.ball} ${Styles.ballFix}`}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingChatBot