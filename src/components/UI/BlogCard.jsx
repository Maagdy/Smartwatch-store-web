/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const BlogCard = ({ image, imageAlt, title, topic, id, onShowMore }) => {
  return (
    <Card
      sx={{
        borderRadius: 8,
        bgcolor: "rgba(0, 0, 0, 0.02)",
        position: "relative",
        overflow: "visible",
        border: "1px solid lightgrey",
      }}
      elevation={2}
    >
      <Box px={6}>
        <CardMedia
          sx={{
            borderRadius: 8,
            position: "relative",
            left: 0,
            top: -28,
            right: 0,
            width: "100%",
            height: "auto",
            zIndex: 1,
          }}
          component="img"
          image={image}
          alt={imageAlt}
        />
        <Box
          sx={{
            overflow: "hidden",
            position: "relative",
            top: -28,
            borderRadius: "0 0 24px 24px",
            display: "flex",
            justifyContent: "center",
            maxWidth: "80%",
            mx: "auto",
            bgcolor: "black",
            px: 2,
          }}
        >
          <Typography
            variant="h6"
            color="white"
            fontSize={{
              xs: "0.9rem",
              sm: "1.25rem",
              md: "1.25rem",
              lg: "1.25rem",
            }}
            py={{
              xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
            }}
            align="center"
            fontWeight="bold"
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 1,
        }}
      >
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {topic}
          </Typography>
        </CardContent>
        <Button
          sx={{
            textTransform: "none",
            borderRadius: 10,
            bgcolor: "#0088ff",
            px: { xs: 2, sm: 3, md: 2 },
            mb: 2,
            py: { xs: 1, sm: 0.75, md: 1 },
            mr: { xs: 2, sm: 1.75, md: 2 },
            fontWeight: "bold",
            fontSize: { xs: "12px", sm: "13px", md: "12px" },
            "&:hover": {
              bgcolor: "black",
              color: "white",
            },
          }}
          endIcon={<KeyboardArrowDownIcon />}
          variant="contained"
          onClick={() => onShowMore(id)}
        >
          Show More
        </Button>
      </Box>
    </Card>
  );
};

export default BlogCard;
