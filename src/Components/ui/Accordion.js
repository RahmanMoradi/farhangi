"use client";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";

export default function AccordionBox({ title, details, className }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={className}>
      <Accordion
        style={{
          boxShadow: "0 4px 5px 2px #90909030",
          color: isOpen ? "#fff" : "#000",
          backgroundColor: isOpen ? "#7E1011" : "#fff",
        }}
        onChange={() => {
          setIsOpen(!isOpen);
        }}
      >
        <AccordionSummary
          expandIcon={
            isOpen ? (
              <Icon icon="ic:round-minus" width="25" height="25" className="text-white" />
            ) : (
              <Icon icon="ic:twotone-plus" width="25" height="25" />
            )
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className="text-sm">{details}</AccordionDetails>
      </Accordion>
    </div>
  );
}
