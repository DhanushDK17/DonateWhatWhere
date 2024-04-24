import { Container } from "@mui/material";
import { Outlet } from "react-router";
import { Header } from "../components/Header/Header";
export const MainLayout = () => {
  return (
    <>
      <Container
        sx={{
          overflowY: "auto",
          height: "calc(100% - 71px)",
        }}
        maxWidth="xl"
      >
        <Outlet />
      </Container>
      {/* <Footer/> */}
    </>
  );
};
