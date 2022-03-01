import { Link } from "react-router-dom";
import styled from "styled-components";
import { NormalButton } from "../../shared/Buttons";

export const Header = () => {
  return (
    <Container>
      <NormalButton color="#000000">
        <Link to="/product-add" style={{ color: "#ffffff" }}>
          상품 추가하기
        </Link>
      </NormalButton>
    </Container>
  );
};

const Container = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
  width: 90%;
  margin: 0 auto;
  padding: 10px 0;
`;
