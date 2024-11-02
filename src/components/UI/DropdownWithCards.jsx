/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Popover, Box } from "@mui/material";
import CollectionCard from "./CollectionCard";
const PUBLIC_URL = window.location.origin;

const cardData = [
  {
    id: 1,
    title: "Classic Watch",
    URl: `${PUBLIC_URL}/images/general/smartwatch-1.png`,
    path: "classic",
  },
  {
    id: 2,
    title: "Custom Watch",
    URl: `${PUBLIC_URL}/images/general/smartwatch-2.png`,
    path: "custom",
  },
  {
    id: 3,
    title: "Sports Watch",
    URl: `${PUBLIC_URL}/images/general/smartwatch-3.png`,
    path: "sports",
  },
  {
    id: 4,
    title: "Modern Watch",
    URl: `${PUBLIC_URL}/images/general/smartwatch-4.png`,
    path: "modern",
  },
  {
    id: 5,
    title: "Bestsellers",
    URl: `${PUBLIC_URL}/images/general/smartwatch-5.png`,
    path: "bestsellers",
  },
];

const DropdownWithCards = ({ anchorEl, open, onClose, onNav }) => (
  <Popover
    sx={{
      top: "7.5%",
    }}
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
  >
    <Box
      sx={{
        display: "flex",
        height: "50%",
        width: "100vw",
        overflow: "hidden",
        bgcolor: "black",
        gap: 4,
        py: 4,
        pl: 2,
        pr: 6,
      }}
    >
      {cardData.map((card) => (
        <CollectionCard
          onNav={onNav}
          path={card.path}
          key={card.id}
          title={card.title}
          icon={card.URl}
        />
      ))}
    </Box>
  </Popover>
);

export default DropdownWithCards;
