/* eslint-disable react/prop-types */
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export default function QuestionAccordion({ Question, Answer }) {
  const [accordionClicked, setAccordionClicked] = useState(false);

  const handleAccordionClick = () => {
    setAccordionClicked(!accordionClicked);
  };

  return (
    <Accordion
      sx={{
        width: "100%",
        bgcolor: accordionClicked ? "black" : "rgba(0, 0, 0, .01)",
        transition: "all 0.3s ease-in-out",
        boxShadow: 0.5,
        border: "none",
        mt: 2,
        mb: 1,
        p: 1,
        borderRadius: 4,
        color: accordionClicked ? "white" : "black",
      }}
      expanded={accordionClicked}
    >
      <AccordionSummary
        onClick={handleAccordionClick}
        expandIcon={
          <ExpandMoreIcon
            sx={{ color: accordionClicked ? "white" : "black" }}
          />
        }
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <b>{Question}</b>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          bgcolor: accordionClicked ? "black" : "rgba(0, 0, 0, .01)",
          color: accordionClicked ? "white" : "black",
        }}
      >
        {Answer}
      </AccordionDetails>
    </Accordion>
  );
}
