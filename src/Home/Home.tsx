import { Header } from "./Header";
import { ProductList } from "./ProductList";
import styled from "styled-components";

export const Home = () => {
  return (
    <Container>
      <Header />
      <ProductList />
    </Container>
  );
};

const Container = styled.main`
  padding-top: 60px;
`;
