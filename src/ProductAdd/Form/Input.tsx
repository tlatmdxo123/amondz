import styled from "styled-components";

type Props = {
  placeholder: string;
  type: string;
  label: string;
  setValue: (value: any) => void;
  check?: (input: any) => boolean;
  error?: boolean;
  errorMsg?: string;
  setError?: (error: boolean) => void;
  value: any;
};

export const Input = ({
  placeholder,
  type,
  label,
  setValue,
  check = () => true,
  error,
  setError = () => {},
  errorMsg,
  value,
}: Props) => {
  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setValue(value);
    check(value) ? setError(false) : setError(true);
  }

  return (
    <Container>
      <LabelText>{label}</LabelText>
      <InputContainer
        placeholder={placeholder}
        type={type}
        onChange={onChangeHandler}
        value={value}
      />
      {error && <ErrorText>{errorMsg}</ErrorText>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 5px;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[100]};
`;

const LabelText = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-right: 10px;
`;

const InputContainer = styled.input`
  flex-grow: 1;
`;

const ErrorText = styled.div`
  position: absolute;
  left: 30%;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.red};
`;
