import { useAppSelector } from "../../hooks";
import { selectProducts } from "../../store/Products";
import { EmptyList } from "../EmptyList";
import { ProductItem } from "../ProductItem";
import styled from "styled-components";

export const ProductList = () => {
  const productList = useAppSelector(selectProducts);

  if (productList.length === 0) return <EmptyList />;
  return (
    <Container>
      {productList.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  width: 90%;
  margin: 0 auto;
  @media (max-width: ${({ theme }) => theme.viewPort.tablet + "px"}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.viewPort.tabletSmall + "px"}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.viewPort.mobile + "px"}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
