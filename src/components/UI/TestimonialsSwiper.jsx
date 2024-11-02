/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Box, Typography, Avatar } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsSwiper({ testimonials }) {
  return (
    <Box
      sx={{
        maxWidth: { lg: 800 },
        width: { xs: 340, sm: 580, md: 875, lg: "auto" },
        margin: "auto",
        padding: 3,
        textAlign: { xs: "center", lg: "initial" },
      }}
    >
      <Typography mb={5} color="#0088ff" variant="subtitle1" gutterBottom>
        Testimonials
      </Typography>
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        pagination={{ clickable: true }}
        loop={true}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 5,
                  fontSize: { xs: 26, sm: 30, md: 34 },
                }}
              >
                {testimonial.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 3 }}
              >
                "{testimonial.content}"
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "initial" },
                }}
              >
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
  );
}
