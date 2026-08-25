"use client";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";

export default function AccordionProduct({ title, className, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={className}>
      <Accordion
        style={{
          boxShadow: "none",
          color: "#000",
          backgroundColor: "transparent",
          borderRadius: 1,
        }}
        onChange={() => {
          setIsOpen(!isOpen);
        }}
      >
        <AccordionSummary
          expandIcon={
            <Icon icon="iconamoon:arrow-down-2-bold" width="24" height="24" />
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" className="!text-black_12 !font-yekan !text-[14px]">
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="text-sm !px-3.5">{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}
