import { Link } from "react-router-dom";
import { Product } from "../../../types/product";
import { SERVER_URL } from "../../constants";
import styled from "styled-components";

type Props = {
  product: Product;
};

export const ProductItem = ({ product }: Props) => {
  return (
    <Link to={`/product-detail/${product.id}`}>
      <Container>
        <figure>
          <ImageContainer>
            <img src={SERVER_URL + product.images[0]} alt={product.name} />
          </ImageContainer>
          <InfoContainer>
            <Name>{product.name}</Name>
            <Price>{product.price.toLocaleString("ko-KR")}원</Price>
          </InfoContainer>
        </figure>
      </Container>
    </Link>
  );
};

const Container = styled.li`
  width: 100%;
`;
const ImageContainer = styled.div`
  margin-bottom: 10px;
  img {
    width: 100%;
  }
`;
const InfoContainer = styled.div``;
const Name = styled.figcaption`
  font-size: 0.8rem;
  margin-bottom: 15px;
`;

const Price = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;
