import { Box, Typography, Avatar, Divider } from "@mui/material";
import { styled } from "@mui/system";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import React from "react";

const CommentHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
});

const CommentCount = styled(Typography)({
  fontWeight: "bold",
  marginLeft: "8px",
});

const CommentBox = styled(Box)({
  display: "flex",
  marginBottom: "16px",
});

const CommentContent = styled(Box)({
  marginLeft: "16px",
  flex: 1,
});

const CommentAuthor = styled(Typography)({
  //   fontWeight: "bold",
  marginBottom: "4px",
});

const CommentDate = styled(Typography)({
  color: "#666",
  fontSize: "0.8rem",
  marginBottom: "8px",
});

const CommentText = styled(Typography)({
  marginBottom: "8px",
});

const ReplyButton = styled(Typography)({
  color: "#0088ff",
  fontSize: "0.9rem",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
    color: "#666",
  },
});

const comments = [
  {
    id: 1,
    author: "Sarah",
    date: "June 1, 2024 at 7:59 am",
    img: "\\images\\general\\comment1.png",
    text: "I would love a theme for businesses that make things by hand. I make wired jewelry with gemstones and also knit.",
  },
  {
    id: 2,
    author: "John",
    date: "June 1, 2024 at 8:15 am",
    img: "\\images\\general\\comment2.png",
    text: "Great suggestions! Handmade themes are definitely in demand.",
  },
];

const CommentsSection = () => {
  return (
    <Box
      sx={{
        maxWidth: 800,
        maxHeight: "",
        margin: "auto",
        padding: 2,
        mt: 4,
        bgcolor: "#fff",
      }}
    >
      <CommentHeader>
        <ChatBubbleOutlineIcon />
        <CommentCount variant="h6">{comments.length} Comments</CommentCount>
      </CommentHeader>
      <Divider sx={{ marginBottom: 2 }} />
      {comments.map((comment) => (
        <React.Fragment key={comment.id}>
          <CommentBox>
            <Avatar src={comment.img} alt={comment.author} />
            <CommentContent>
              <CommentAuthor variant="subtitle1">
                <b>{comment.author} </b>
                says:
              </CommentAuthor>
              <CommentDate>{comment.date}</CommentDate>
              <CommentText>{comment.text}</CommentText>
              <ReplyButton>Reply</ReplyButton>
            </CommentContent>
          </CommentBox>
          <Divider sx={{ marginBottom: 2 }} />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default CommentsSection;
