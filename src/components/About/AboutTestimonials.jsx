import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Box, Typography, Avatar } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    title: "This Watch is amazing!<br /> affordable price.",
    content:
      "I don't always clap, but when I do, it's because of pear watch. Pear watch has really helped me. I STRONGLY recommend pear watch to EVERYONE interested in fashion & tech! This is simply unbelievable!",
    name: "John Carter",
    job: "UX Designer",
    avatar: "images/general/testimonial-3.jpg",
  },
  {
    title: "Best tech purchase<br /> this year!",
    content:
      "The pear watch exceeded all my expectations. Its sleek design and advanced features make it a standout in the smartwatch market. The battery life is impressive, and the user interface is intuitive. Highly recommended for tech enthusiasts!",
    name: "Emma Thompson",
    job: "Software Engineer",
    avatar: "images/general/testimonial-4.jpg",
  },
];

export default function AboutTestimonials() {
  return (
    <Box sx={sxStyles.mainBox}>
      <Box sx={sxStyles.headerBox}>
        <Typography
          sx={{
            textShadow: "0 10px 5px rgba(0, 0, 0, 0.1)",
          }}
          variant="h3"
          fontWeight={"bold"}
        >
          Join our
          <span style={{ color: "#0088ff" }}> happy customers</span>
        </Typography>
        <Typography
          pt={4}
          textAlign={"center"}
          fontSize={{ xs: "14px", sm: "18px", md: "18px", lg: "21px" }}
          color="#888"
        >
          You can trust our watches and the quality and professionalism of our
          products.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          padding: 6,
        }}
      >
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          pagination={{ clickable: true }}
          loop={true}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  mb: 4,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", mb: 5 }}
                  dangerouslySetInnerHTML={{ __html: testimonial.title }}
                />

                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 3 }}
                >
                  &quot;{testimonial.content}&quot;
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 80, height: 80, mr: 2 }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.job}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

const sxStyles = {
  mainBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mb: 5,
  },
  headerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    mb: 4,
    mt: 2,
  },
};
