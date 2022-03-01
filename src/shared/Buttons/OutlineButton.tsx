import { NormalButton } from ".";
import styled from "styled-components";

export const OutlineButton = styled(NormalButton)`
  background: none;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
`;
