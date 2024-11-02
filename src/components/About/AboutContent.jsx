/* eslint-disable no-unused-vars */
import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ProgressBarsSection from "../UI/ProgressBar";

const ADVANTAGES = [
  "Best Watch Quality",
  "Modern Accessories",
  "Watches Services",
  "Watches in Colors",
  "Free Internet Service",
  "Free app installation",
];

export default function AboutContent() {
  const theme = useTheme();
  const isMid = useMediaQuery("(max-width:1105px)");

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
        mb={15}
        mt={{ xs: 5, sm: 0 }}
      >
        <Box flex={1}>
          <Typography variant="h3" mt={5} fontWeight="bold" mb={4}>
            Get to know us <span style={{ color: "#0088ff" }}>better</span>
          </Typography>
          <Typography fontSize={"18px"} color="#888888" mb={4}>
            With over 27 years of experience, we have been providing exceptional
            watches services for commercial and residential properties
            throughout Bellingham. If you&apos;re looking for any type of
            plumbing repairs, installations or replacements, About watches is
            the company to call. We provide FREE estimates if you live in the
            local area. Call us today to learn more about our senior citizen and
            military personnel discounts.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} flexWrap={"wrap"}>
            {ADVANTAGES.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: "100%", sm: "50%" },
                  my: 0.5,
                  "&:hover": {
                    ".hover-icon": { color: "#0088ff" },
                    ".hover-text": { color: "#0088ff" },
                  },
                }}
                display="flex"
                alignItems="center"
              >
                <CheckCircleIcon
                  fontSize="large"
                  className="hover-icon"
                  sx={{
                    color: "black",
                    mr: 1,
                    fontSize: 40,
                    transition: "all 0.3s ease-in-out",
                  }}
                />
                <Typography
                  className="hover-text"
                  fontWeight={"bold"}
                  fontSize={18}
                  variant="body1"
                  sx={{ transition: "all 0.3s ease-in-out" }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box
          flex={1}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src="/images/general/watch-about.jpg"
            alt="Smart Watch"
            sx={{
              width: { xs: "90%", sm: "90%", md: "100%", lg: "100%" },
              height: "auto",
              borderRadius: 4,
              marginBottom: { xs: 1, sm: 0 },
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          />
          <Box
            sx={{
              position: { xs: "static", sm: "absolute" },
              bottom: { sm: "-10%" },
              right: { sm: "-10%" },
              backgroundColor: "#0088ff",
              color: "white",
              py: 4,
              px: 6,
              borderRadius: 8,
              textAlign: "center",
              width: { xs: "90%", sm: "70%" },
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
              [theme.breakpoints.down("lg")]: {
                right: { sm: "-4%" },
              },
              [theme.breakpoints.down("md")]: {
                right: { sm: "-2%" },
                width: { sm: "50%" },
              },
            }}
          >
            <Typography variant="h3" fontSize={24} fontWeight="bold" mb={2}>
              See all the
            </Typography>
            <Typography variant="h3" fontSize={24} fontWeight="bold" mb={2}>
              New Watches
            </Typography>
            <Typography variant="body2" mb={1}>
              Professional, affordable and we always
            </Typography>
            <Typography variant="body2">leave the seat down</Typography>
          </Box>
        </Box>
      </Stack>
      <Divider
        orientation="horizontal"
        sx={{
          width: "100%",
          my: "10%",
        }}
      />
      <Stack
        direction={isMid ? "column" : "row"}
        spacing={4}
        alignItems="center"
        mb={20}
        mt={{ xs: 5, sm: 5 }}
      >
        <Box flex={1} width={isMid ? "90%" : null}>
          <Box
            component="img"
            src="/images/general/about-watch-3.jpg"
            alt="Smart Watch"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 4,
              marginBottom: { xs: 1, sm: 0 },
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          />
        </Box>
        <Box
          flex={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: isMid ? "center" : "left",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "28px", sm: "36px", md: "44px", lg: "44px" },
            }}
            fontWeight="bold"
            mb={4}
          >
            We are expert in <span style={{ color: "#0088ff" }}>Watches</span>
          </Typography>
          <Typography fontSize={"18px"} color="#888888" mb={4}>
            With over 27 years of experience, we have been providing exceptional
            watches services for commercial and residential properties
            throughout Bellingham. If you&apos;re looking for any type of
            plumbing repairs, installations or replacements, About watches is
            the company to call. We provide FREE estimates if you live in the
            local area. Call us today to learn more about our senior citizen and
            military personnel discounts.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} sx={{ width: "100%" }}>
            <ProgressBarsSection />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

const sxStyles = {};
