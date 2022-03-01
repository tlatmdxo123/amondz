import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectProduct, removeProduct } from "../store/Products";
import { MdFavoriteBorder } from "react-icons/md";
import styled, { ThemeContext } from "styled-components";
import { PreviewContainer } from "../shared/Preview";

function ProductDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const product = useAppSelector(selectProduct(id));
  const [currentImage, setCurrentImage] = useState<string>(
    product ? product.images[0] : ""
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  if (!product) return <div>404 Page</div>;
  const { name, price, likes, images } = product;

  function onClickDelete() {
    dispatch(removeProduct(id));
    navigate("/");
  }

  return (
    <Container>
      <Buttons>
        <Button color={theme.color.purple}>
          <Link to={`/product-add/${id}`} style={{ color: "inherit" }}>
            수정
          </Link>
        </Button>
        <Button type="button" onClick={onClickDelete} color={theme.color.red}>
          삭제
        </Button>
      </Buttons>
      <ContentsContainer>
        <ImageContent>
          <ImageContainer url={SERVER_URL + currentImage} />
          <PreviewList>
            {images.map((image) => (
              <PreviewContainer>
                <img
                  src={SERVER_URL + image}
                  alt={name}
                  onClick={() => setCurrentImage(image)}
                />
              </PreviewContainer>
            ))}
          </PreviewList>
        </ImageContent>
        <InfoContainer>
          <Name>{name}</Name>
          <Price>{price.toLocaleString("ko-KR")}원</Price>
          <Likes>
            <MdFavoriteBorder />
            {likes.toLocaleString("ko-KR")}
          </Likes>
        </InfoContainer>
      </ContentsContainer>
    </Container>
  );
}

const Container = styled.main`
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;
`;
const ContentsContainer = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.viewPort.tabletSmall + "px"}) {
    flex-direction: column;
  }
`;
const ImageContent = styled.div`
  width: 40%;
  margin-right: 20px;
  @media (max-width: ${({ theme }) => theme.viewPort.tabletSmall + "px"}) {
    margin-right: 0;
    margin-bottom: 20px;
    width: 100%;
  }
`;
const ImageContainer = styled.div<{ url: string }>`
  width: 100%;
  background-image: ${({ url }) => `url('${url}')`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 10px;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
`;
const Button = styled.button<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 1rem;
`;
const PreviewList = styled.ul`
  display: flex;
  justify-content: center;
`;
const InfoContainer = styled.div`
  flex-grow: 1;
  border-top: 1px solid ${({ theme }) => theme.color.gray[100]};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[100]};
  padding: 10px 0;
`;
const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: normal;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;
export default ProductDetail;
