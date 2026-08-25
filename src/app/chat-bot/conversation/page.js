"use client";
import { Icon } from "@iconify/react";
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@/Context/UserContext";
import { useSession } from "@/Context/SessionContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ChatBotProduct from "@/Components/ChatBot/ChatBotProduct";
import LoadingChatBot from "@/Components/ChatBot/LoadingChatBot";
import ChatBotOptionsList from "@/Components/ChatBot/ChatBotOptionsList";
import Navbar from "@/Components/Navbar/Navbar";
import Menu from "@/Components/menu/Menu";
import Image from "next/image";
import axios from "axios";
import useAlert from "@/Hooks/useAlert";
import Footer from "@/Components/Footer/Footer";

const normalizeQuestion = (questionData) => {
  const extractText = (textObj) => {
    if (typeof textObj === "string") return textObj;
    if (textObj && typeof textObj === "object") return textObj.fa || Object.values(textObj)[0] || "متن نامشخص";
    return "متن نامشخص";
  };

  const normalizeOptions = (options) => {
    if (!Array.isArray(options)) return [];
    return options.map((option) => ({
      ...option,
      name: extractText(option.name),
    }));
  };

  if (questionData?.current_question) {
    return {
      id: questionData.current_question.id,
      text: questionData.current_question.text,
      options_text: questionData.current_question.options_text,
      categories: questionData.current_question.categories,
      tags: normalizeOptions(questionData.current_question.tags),
      last: questionData.current_question.last,
    };
  }

  const question = Array.isArray(questionData) ? questionData[0] : questionData;
  return {
    id: question.id,
    text: extractText(question.text),
    options_text: extractText(question.options_text),
    categories: question.categories || [],
    tags: normalizeOptions(question.tags),
    last: question.last || 0,
  };
};

function ChatBot() {
  // State Management
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [noQuestions, setNoQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  // Context Variables
  const { token } = useUser();
  const { session, sessionInfo } = useSession();
  const { showAlert } = useAlert();
  const router = useRouter();

  // Setting first question
  useEffect(() => {
    if (sessionInfo?.current_question) {
      const normalized = normalizeQuestion(sessionInfo);
      setQuestions([normalized]);
    }
  }, [sessionInfo]);

  // Reference to scroll to bottom
  const chatEndRef = useRef(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  
  useEffect(() => {
    if (!showProducts) {
      scrollToBottom();
    }
  }, [isLoading, currentQuestionIndex, showProducts]);

  useEffect(() => {
    if (!token) {
      router.push("/sign-up?redirect=/chat-bot/conversation");
    }
  });

  // Getting current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Sending response
  const handleAnswer = async (option) => {
    const question = currentQuestion;
    const type = question?.categories?.length > 0 ? "category" : "tag";

    setSelectedOptions((prev) => [...prev, { ...option, type }]);

    const body = {
      session_id: session,
      question_id: question.id,
      answerable_type: type,
      answerable_id: option.id,
    };

    setIsLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/answers`, body, {
        headers: { Authorization: token },
      });

      if (question.last === 1) {
        await fetchRecommendedProducts(session);
      } else {
        getQuestions(option, type);
      }
    } catch (err) {
      showAlert("خطا در ارسال پاسخ", "warning", 2500);
      console.error("handleAnswer error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

    // Fetching questions
  const getQuestions = async (option, type) => {
    const filterKey = type === "category" ? "category" : "tag";

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/questions?filter[${filterKey}]=${option.id}`, 
        {
          headers: { Authorization: token }
        }
      );

      console.log("API Response for questions:", res.data);
      const newQuestions = res.data.data?.question || [];

      if (newQuestions.length === 0) {
        // سوالی از بک اند نیومده
        setNoQuestions(true);
        return;
      }

      const normalizedQuestion = normalizeQuestion(newQuestions);
      console.log("normalized questions:", normalizedQuestion);

      setQuestions((prev) => {
        const updated = [...prev, normalizedQuestion];
        console.log("Updated questions:", updated);
        return updated;
      });
      setCurrentQuestionIndex((prev) => {
        const newIndex = prev + 1;
        console.log("New question index:", newIndex);
        return newIndex;
      });
    } catch (err) {
      console.error("getQuestions error:", err.message);
    }
  };

  // Fetching recommend products
  const fetchRecommendedProducts = async () => {
    setShowProducts(true);

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/sessions/${session}`,
        {
          headers: { Authorization: token },
        }
      );
      setRecommendedProducts(res.data?.data);
      console.log("recommended products:", res.data.data);
    } catch (err) {
      showAlert("خطا در دریافت محصولات پیشنهادی", "warning", 2500);
      console.error("fetch recommended products error", err.message);
    }
  };

  const handleEndConversation = () => {
    setIsEnd(true);
  };

  return (
    <>
    <div className="body mb-16">
      <Navbar />
      <div className="main-style lg:px-64 xl:px-96 px-1 lg:mt-16">
        {!isEnd && (
          <>
          {!noQuestions ? (
            questions.map((question, index) => (
              <div key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: -1 }}
                  transition={{ duration: 0.4 }}
                  className="relative mt-12 mb-10"
                >
                  {/* محتوای هر سوال */}
                  <div className="lg:flex lg:justify-end">
                    <div className="relative bg-light_brown_200 text-[14px] lg:text-[16px] p-3 rounded-xl lg:w-[400px] lg:pl-5 xl:w-[450px] xl:pl-12 xl:py-4">
                      <div className="absolute -left-6 -top-6 p-1">
                        <Image width={300} height={300} alt="chatbot" src="/images/chatBot/mehryar.webp" className="w-20" />
                      </div>
                      {index === 0 && (
                        <span className="flex items-center">
                          <Icon icon="fxemoji:hand" width="24" height="24" className="ml-2" />
                          سلام رفیق
                        </span>
                      )}
                      <p>{question?.text}</p>
                    </div>
                  </div>

                  {/* گزینه‌ها و پاسخ‌ها */}
                  <div className="text-center mt-5 border-2 p-3 border-light_brown_600 rounded-xl">
                    <span className="text-[14px] lg:text-[16px]">
                      {question.options_text}
                    </span>
                    {selectedOptions[index] ? (
                      <div className="mt-3 items-center justify-center text-black_12 p-3 rounded-xl bg-[#FFD2D2]">
                        <span>{selectedOptions[index].name}</span>
                      </div>
                    ) : (
                      <ChatBotOptionsList
                        options={question.categories?.length > 0 ? question.categories : question.tags || []}
                        index={index}
                        disabled={!!selectedOptions[index]}
                        onSelect={(option) => handleAnswer(option)}
                      />
                    )}
                  </div>

                  {/* لودینگ یا پاسخ */}
                  {isLoading ? (
                    <div className="flex items-center my-4">
                      <div className="ml-2 mt-3">
                        <Image width={100} height={100} alt="answering chatbot" src="/images/chatBot/user.webp" className="w-14 roundede-full mb-2" />
                      </div>
                      <LoadingChatBot />
                    </div>
                  ) : (
                    selectedOptions[index] && (
                      <div className="flex items-center my-4">
                        <div className="ml-2 mt-3">
                          <Image width={100} height={100} alt="answered chatbot" src="/images/chatBot/user.webp" className="w-14 roundede-full mb-2" />
                        </div>
                        <span className="bg-[#FFD2D2] p-4 rounded-xl">{selectedOptions[index].name}</span>
                      </div>
                    )
                  )}
                </motion.div>

                {question.last === 1 && selectedOptions[index] && showProducts && (
                  <div className="relative mt-12 mb-10">
                    <div className="mt-8">
                      <ChatBotProduct products={recommendedProducts} />
                    </div>
                  </div>
                )}

                <div ref={chatEndRef}></div>
              </div>
            ))
          ) : (
            <div className="lg:flex lg:justify-end">
              <div className="relative bg-[#f3f3f3] text-[14px] lg:text-[16px] p-3 rounded-xl lg:w-[400px] lg:pl-5 xl:w-[450px] xl:pl-12 xl:py-4 ">
                <div className="absolute -left-6 -top-6 p-1">
                  <Image width={300} height={300} alt="chatbot" src="/images/chatBot/mehryar.webp" className="w-20" />
                </div>
                <span className="text-[16px] lg:text-[18px] text-justify">
                  هی رفیق، چطوری؟ فعلاً نمی‌تونم تو این دسته محصول راهنماییت کنم، ولی اصلاً نگران نباش. می‌تونی با شماره زیر تماس بگیری تا همکارای باحال ما تو فروشگاه مهران کامل جوابتو بدن و هواتو داشته باشن.
                </span>
                <a
                  href="tel:05191012233"
                  className="text-center block w-full mt-5 p-3 rounded-xl cursor-pointer bg-[#ffffff] hover:shadow-lg transition-all ease-in"
                >
                  تماس: 05191012233
                </a>
              </div>
            </div>
          )}
          </>
        )}
        <button 
          className={`w-full sticky xl:bottom-4 bottom-14 bg-main_color text-white border border-light_brown_600 p-2.5 rounded-xl mt-5 flex items-center justify-center mb-16 ${
            isEnd ? "hidden" : ""
          }`}
          onClick={handleEndConversation}
        >
          <Icon icon="ic:round-close" width="24" height="24" className="ml-1" />
          پایان گفتگو
        </button>
        {isEnd && (
          <motion.div
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: -1 }}
            transition={{ duration: 0.4 }}
            className="relative mt-12 mb-10"
          >
            <div className="lg:flex lg:justify-end">
              <div className="relative bg-light_brown_200 text-[14px] lg:text-[16px] p-3 rounded-xl lg:w-[400px] lg:pl-5">
                <div className="absolute -left-6 -top-6 p-1 bg-[#F2F2F2] rounded-full">
                  <Image width={58} height={58} alt="ending chatbot" src="/images/chatBot/mehryar.webp" />
                </div>
                <span className="flex items-center">
                  «امیدوارم تونسته باشم کمکت کنم کالای مورد نظرت رو پیدا کنی؛ اگه دوباره کمک خواستی یا سوالی داشتی، من همینجام رفیق.»
                </span>
              </div>
            </div>
            <div className="text-center mt-5 border-2 p-3 border-light_brown_600 rounded-xl">
              <div className="text-black_12">
                <button
                  className="text-center block w-full mt-5 p-3 rounded-xl cursor-pointer bg-light_brown_200"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  لینک صفحه اصلی
                </button>
                <button
                  className="text-center block w-full mt-5 p-3 rounded-xl cursor-pointer bg-light_brown_200"
                  onClick={() => {
                    router.push("/products");
                  }}
                >
                  لینک صفحه فروشگاه
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <Menu />
    </div>
    <Footer />
    </>
  );
}

export default ChatBot;


