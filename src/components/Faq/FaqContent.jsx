import { Avatar, Box, Stack, Typography } from "@mui/material";
import QuestionAccordion from "../UI/QuestionAccordion";
import ContactForm from "./ContactForm";
import HelpIcon from "@mui/icons-material/Help";
import ErrorIcon from "@mui/icons-material/Error";

const QA = [
  {
    Question: "How long does the battery last on a smartwatch?",
    Answer:
      "The battery life varies depending on the brand and usage. Some smartwatches offer up to 18-24 hours of battery life with regular use, while others can last several days in power-saving modes.",
  },
  {
    Question: "Are smartwatches waterproof?",
    Answer:
      "Most modern smartwatches are water-resistant and can handle splashes, rain, and even swimming. However, always check the water resistance rating (like IP68) to know the specific limitations.",
  },
  {
    Question: "Do all smartwatches have fitness tracking features?",
    Answer:
      "Most smartwatches come with built-in fitness tracking, but the level of detail varies. Basic models may track steps and heart rate, while more advanced models can monitor sleep, blood oxygen, ECG, and even stress levels.",
  },
  {
    Question: "How often do I need to update the smartwatch software?",
    Answer:
      "Updates are released periodically to improve performance, security, and features. You should update your smartwatch software whenever prompted to ensure it's running smoothly and securely.",
  },
  {
    Question: "Can I use a smartwatch without a phone?",
    Answer:
      "Yes, but it depends on the model. Some smartwatches have cellular capabilities, allowing you to make calls and send texts without a phone. However, many require a phone connection for full functionality.",
  },
  {
    Question:
      "What is the difference between a fitness tracker and a smartwatch?",
    Answer:
      "Fitness trackers are generally focused on health and exercise metrics like heart rate, steps, and sleep. Smartwatches offer fitness tracking as well as additional features like notifications, apps, music controls, and even phone calls.",
  },
  {
    Question: "What materials are smartwatches made from?",
    Answer:
      "Fitness trackers are generally focused on health and exercise metrics like heart rate, steps, and sleep. Smartwatches offer fitness tracking as well as additional features like notifications, apps, music controls, and even phone calls.",
  },
];

const sxStyles = {
  mainBox: {
    mt: 15,
    mb: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
};
export default function FaqContent() {
  return (
    <Box sx={{ mb: 10 }}>
      <Box sx={sxStyles.mainBox}>
        <Typography
          sx={{
            textShadow: "0 10px 5px rgba(0, 0, 0, 0.1)",
            fontSize: { lg: "44px", sm: "36px", xs: "32px" },
          }}
          variant="h3"
          fontWeight={"bold"}
        >
          Do you have any questions?
          <span style={{ color: "#0088ff" }}>Ask us</span>
        </Typography>
        <Typography
          pt={4}
          textAlign={"center"}
          fontSize={{ xs: "14px", sm: "16px", md: "16px", lg: "16px" }}
          color="#666666"
        >
          Please read questions bellow and if you can not find your answer,
          <br />
          please send us your question, we will answer you as soon as possible.
        </Typography>
      </Box>
      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        justifyContent="center"
        alignItems="flex-start"
        spacing={6}
      >
        <Box sx={{ flex: 1, width: "100%" }}>
          <ContactForm />
        </Box>
        <Box sx={{ flex: 2 }}>
          <Box display="flex" alignItems="center" mb={4}>
            <Avatar
              sx={{
                bgcolor: "#000",
                mr: 2,
                width: 64,
                height: 64,
              }}
            >
              <HelpIcon fontSize="large" />
            </Avatar>
            <Stack direction="column">
              <Typography variant="h6" fontWeight="bold">
                F.A.Qs
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Frequently asked questions
              </Typography>
            </Stack>
          </Box>
          {QA.slice(0, 5).map((Obj, index) => (
            <QuestionAccordion
              key={index}
              Question={Obj.Question}
              Answer={Obj.Answer}
            />
          ))}
          <Box display="flex" alignItems="center" mt={4}>
            <Avatar sx={{ bgcolor: "#000", mr: 2, width: 64, height: 64 }}>
              <ErrorIcon fontSize="large" />
            </Avatar>
            <Stack direction="column">
              <Typography variant="h6" fontWeight="bold">
                Other Questions
              </Typography>
              <Typography variant="body2" color="textSecondary">
                General questions
              </Typography>
            </Stack>
          </Box>
          {QA.slice(5, 7).map((Obj, index) => (
            <QuestionAccordion
              key={index}
              Question={Obj.Question}
              Answer={Obj.Answer}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
