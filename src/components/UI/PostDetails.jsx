/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, CardMedia, Typography, IconButton, Tooltip } from "@mui/material";

import { content } from "../../data/posts";
import { styled } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CommentsSection from "../Blog/CommentsSection";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.2)",
  },
}));

const shareOptions = [
  { name: "Facebook", icon: FacebookIcon, color: "#1877F2" },
  { name: "Twitter", icon: TwitterIcon, color: "#1DA1F2" },
  { name: "Pinterest", icon: PinterestIcon, color: "#BD081C" },
  { name: "WhatsApp", icon: WhatsAppIcon, color: "#25D366" },
  { name: "Telegram", icon: TelegramIcon, color: "#0088cc" },
  { name: "Email", icon: EmailIcon, color: "#D44638" },
  { name: "Copy Link", icon: ContentCopyIcon, color: "#333333" },
];
const PostDetails = ({ id }) => {
  const post = Object.values(content).find((post) => post.id === parseInt(id));

  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
      <Typography variant="h5" fontWeight={"bold"} gutterBottom>
        {post.title}
      </Typography>
      <CardMedia
        component="img"
        height="400"
        image={post.image}
        alt={post.title}
        sx={{ borderRadius: 2, marginBottom: 2 }}
      />
      <Typography variant="h6" gutterBottom>
        {post.topic}
      </Typography>
      <Typography variant="body1">{post.fullContent.subtitle}</Typography>
      <Box
        sx={{
          my: 5,
          mx: "auto",
          width: "70%",
          py: "5%",
          px: "5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          bgcolor: "#f0f0f0",
        }}
      >
        {post.fullContent.spantitle}
      </Box>
      <Typography variant="body1">{post.fullContent.spancontent}</Typography>
      <Box
        sx={{
          my: 5,
          width: "70%",
          py: "5%",
          px: "5%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          fontWeight: "bold",
          bgcolor: "#f0f0f0",
        }}
      >
        {post.fullContent.spantitle2}
      </Box>
      <Typography variant="body1">{post.fullContent.spancontent2}</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
          borderRadius: 28,
          px: 3,
          py: 1,
          my: 2,
          boxShadow: 2,
        }}
      >
        <Typography
          variant="body1"
          color="#0088ff"
          sx={{
            mr: 4,
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)",
            },
          }}
        >
          Share this post
        </Typography>
        {shareOptions.map((option) => (
          <Tooltip key={option.name} title={option.name}>
            <StyledIconButton
              sx={{
                "&:hover": {
                  color: option.color,
                },
              }}
            >
              <option.icon />
            </StyledIconButton>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default PostDetails;
