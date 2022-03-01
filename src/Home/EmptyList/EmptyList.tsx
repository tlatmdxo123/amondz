import styled from "styled-components";

export const EmptyList = () => {
  return <Container>상품이 존재하지 않습니다</Container>;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => `calc(100vh - ${theme.size.header}px)`};
`;
