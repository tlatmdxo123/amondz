import styled from "styled-components";

export const NormalButton = styled.button<{ color: string }>`
  padding: 10px 50px;
  border-radius: 5px;
  background: ${({ color }) => color};
  cursor: pointer;
  color: #ffffff;

  &:disabled {
    background: ${({ theme }) => theme.color.gray[200]};
  }
`;
