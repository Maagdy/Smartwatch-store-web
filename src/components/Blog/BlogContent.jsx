/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import {
  Box,
  Chip,
  Typography,
  Paper,
  Card,
  CardMedia,
  Divider,
  Pagination,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import { Tag as TagIcon } from "lucide-react";
import BlogCard from "../UI/BlogCard";
import { content } from "../../data/posts";
import PostDetails from "../UI/PostDetails";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CommentsSection from "./CommentsSection";

const tags = [
  "article",
  "computer",
  "developer",
  "famous",
  "interview",
  "IT",
  "learn",
  "money",
  "photography",
  "post",
  "seo",
  "technology",
  "tutorial",
  "tuts",
  "website",
  "wordpress",
];

const BlogContent = () => {
  const theme = useTheme();

  const [selectedTag, setSelectedTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const itemsPerPage = 2;
  const allPosts = Object.entries(content);

  // Filter posts based on selected tag
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return allPosts;
    return allPosts.filter(([_, post]) => post.tags.includes(selectedTag));
  }, [selectedTag, allPosts]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, filteredPosts]);

  const handleShowMore = (postId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedPostId(postId);
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    setSelectedPostId(null);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    setCurrentPage(1);
    setSelectedPostId(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row", md: "row" },
        justifyContent: "space-between",
        maxWidth: "100%",
        my: 5,
        gap: { xs: 2, md: 4, lg: 8 },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "45%", sm: "50%" },
          [theme.breakpoints.down("xs")]: {
            display: "flex",
            flexDirection: "row",
          },
        }}
      >
        <Paper
          elevation={2}
          sx={{
            [theme.breakpoints.down("xs")]: {
              width: "50%",
            },
            p: 4,
            bgcolor: "rgba(0, 0, 0, 0.01)",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{ position: "relative", mb: 2 }}
            fontWeight="bold"
          >
            Tags Cloud
            <Divider
              sx={{
                width: "50px",
                borderBottomWidth: 2,
                mt: 1,
                mb: 2,
                bgcolor: "black",
              }}
            />
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {tags.map((tag) => (
              <Chip
                sx={{
                  border: "none",
                  bgcolor: selectedTag === tag ? "#0088ff" : "",
                  color: selectedTag === tag ? "white" : "text.primary",
                  fontSize: "13px",
                }}
                key={tag}
                label={tag}
                icon={
                  <TagIcon
                    color={selectedTag === tag ? "white" : "black"}
                    size={14}
                  />
                }
                onClick={() => handleTagClick(tag)}
                variant={selectedTag === tag ? "filled" : "outlined"}
              />
            ))}
          </Box>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            mt: "20%",
            p: 2,
            bgcolor: "rgba(0, 0, 0, 0.01)",
            borderRadius: 4,
          }}
        >
          <Box sx={{ py: 2, px: 1 }}>
            <Typography
              variant="h6"
              sx={{ position: "relative", mb: 3 }}
              fontWeight="bold"
            >
              Ads
              <Divider
                sx={{
                  width: "40px",
                  borderBottomWidth: 2,
                  mt: 1,
                  mb: 2,
                  bgcolor: "black",
                }}
              />
            </Typography>
            <Card sx={{ cursor: "pointer" }}>
              <CardMedia
                component="img"
                height="100%"
                image="images/general/ads.jpg"
                alt="Advertisement"
                sx={{ borderRadius: 1 }}
              />
            </Card>
          </Box>
        </Paper>
        {selectedPostId && (
          <Box
            sx={{
              width: "100%",
            }}
          >
            <CommentsSection />
          </Box>
        )}
      </Box>

      <Box sx={{ flexGrow: 1, width: "100%" }}>
        {currentPosts.length === 0 && (
          <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
            No posts found for the selected tag.
          </Typography>
        )}
        {currentPosts.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
        {selectedPostId ? (
          <>
            <Button
              startIcon={<KeyboardArrowLeftIcon />}
              onClick={handleBackToList}
              sx={{ mb: 2, color: "#0088ff" }}
            >
              Back
            </Button>
            <PostDetails id={selectedPostId} />
          </>
        ) : (
          <>
            {selectedTag && (
              <Typography variant="h6" sx={{ mb: 2 }}>
                Showing posts tagged with: <b>{selectedTag}</b>
              </Typography>
            )}
            <Box
              sx={{
                pt: 5,
                height: "auto",
                overflowY: "auto",
              }}
            >
              <Stack direction="column" mb={1} spacing={12}>
                {currentPosts.map(([tag, post]) => (
                  <BlogCard
                    key={tag}
                    id={post.id}
                    image={post.image}
                    imageAlt={post.title}
                    title={post.title}
                    topic={post.topic}
                    onShowMore={handleShowMore}
                  />
                ))}
              </Stack>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BlogContent;
