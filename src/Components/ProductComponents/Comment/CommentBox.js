"use client";
import { useUser } from "@/Context/UserContext";
import useAlert from "@/Hooks/useAlert";
import useDatePersian from "@/Hooks/useDatePersian";
import { Icon } from "@iconify/react";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

function CommentBox({ commentInfo }) {
  const { newDateFunc } = useDatePersian();
  const { token } = useUser();
  const { showAlert } = useAlert();
  const [likeCount, setLikeCount] = useState(commentInfo?.likes_count);
  const [dislikeCount, setDislikeCount] = useState(commentInfo?.dislikes_count);

  const likeComment = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/like/${commentInfo?.id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        showAlert(" ", "success", 1100);
        setLikeCount(likeCount + 1);
      })
      .catch((err) => {
        showAlert(err.response.data.message, "error", 2300);
      });
  };

  const dislikeComment = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/dislike/${commentInfo?.id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        showAlert(" ", "success", 1100);
        setDislikeCount(dislikeCount + 1);
      })
      .catch((err) => {
        showAlert(err.response.data.message, "error", 2300);
      });
  };

  return (
    <div className="bg-light_brown_200 p-3.5 rounded-xl">
      <div className="flex items-center justify-between">
        <span className="text-[14px]">
          {commentInfo.user.name} {commentInfo.user.family}
        </span>
        <div className="flex items-center">
          <span>
            <Image
              height={18}
              width={18}
              src="/images/icon/star.png"
              alt="img"
            />
          </span>
          {Array.from({ length: commentInfo.score }).map((_, index) => (
            <span key={index}>
              <Image
                height={18}
                width={18}
                src="/images/icon/star.png"
                alt="img"
              />
            </span>
          ))}
        </div>
      </div>
      <p className="mt-2.5 text-[14px] font-yekan text-Gray59 border-b-2 border-b-light_brown_600 pb-2">
        {commentInfo.comment}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[12px] text-Gray59 font-yekan">
          {newDateFunc(commentInfo.created_at)}
          {/* {newDateFunc(commentInfo.created_at,"dddd D MMMM YYYY")} */}
        </span>
        <div className="flex items-center text-Gray59">
          <div className="flex items-center">
            <span className="mt-1 mx-2 font-yekan">{dislikeCount}</span>
            <span
              className="cursor-pointer"
              onClick={() => {
                dislikeComment();
              }}
            >
              <Icon icon="mdi:dislike" width="24" height="24" />
            </span>
          </div>
          <div className="flex items-center">
            <span className="mt-1 mx-2 font-yekan">{likeCount}</span>
            <span
              className="cursor-pointer"
              onClick={() => {
                likeComment();
              }}
            >
              <Icon icon="mdi:like" width="24" height="24" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
