import { Container } from "@mui/material";
import { Outlet } from "react-router";
import { Header } from "../components/Header/Header";
export const MainLayout = () => {
  return (
    <>
      <Header/>
      <Container
        maxWidth="xl"
        sx={{
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Container>
      {/* <Footer/> */}
    </>
  );
};
