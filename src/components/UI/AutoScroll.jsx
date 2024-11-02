import { Fab, useScrollTrigger, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function AutoScroll() {
  return (
    <Zoom in={useScrollTrigger({ threshold: 100 })}>
      <Fab
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        variant="extended"
        size="small"
        sx={{
          transition: "all 0.3s ease-in-out",
          position: "fixed",
          bottom: { xs: "12%", sm: "5%" },
          right: { xs: "5%", sm: "4%" },
          bgcolor: "primary.main",
          overflow: "hidden",
          "&:hover": {
            bgcolor: "black",
            "& .arrow-icon": {
              transform: "translateY(-100%)",
            },
          },
        }}
        color="primary"
        aria-label="scroll to top"
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease-in-out",
          }}
          className="arrow-icon"
        >
          <KeyboardArrowUpIcon
            fontSize="medium"
            sx={{
              flex: "0 0 100%",
            }}
          />
          <KeyboardArrowUpIcon
            fontSize="medium"
            sx={{
              flex: "0 0 100%",
            }}
          />
        </div>
      </Fab>
    </Zoom>
  );
}
