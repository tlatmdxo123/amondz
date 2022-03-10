import { isNumber } from "../../utils/typeCheck";
import { ImageInput } from "./ImageInput";
import { Input } from "./Input";
import styled from "styled-components";
import { NormalButton, OutlineButton } from "../../shared/Buttons";
import { useFormContexts } from "./contexts";

export const Form = () => {
  const {
    id,
    name,
    price,
    uploads,
    images,
    priceError,
    setName,
    setPrice,
    setPriceError,
    theme,
    onSubmitPostProduct,
    isButtonActive,
    onClickCancel,
    onAddImages,
    onRemoveImages,
    onRemoveUploads,
    uploadsNum,
  } = useFormContexts();
  return (
    <Container onSubmit={onSubmitPostProduct}>
      <Input
        type="text"
        value={name}
        setValue={setName}
        placeholder="상품명을 입력하세요"
        label="상품명"
      />
      <Input
        type="text"
        value={price}
        setValue={setPrice}
        check={isNumber}
        placeholder="가격을 입력하세요"
        label="가격"
        error={priceError}
        setError={setPriceError}
        errorMsg="숫자만 입력 가능합니다"
      />
      <ImageInput
        uploads={uploads}
        images={images}
        uploadsNum={uploadsNum}
        onAddImages={onAddImages}
        onRemoveImages={onRemoveImages}
        onRemoveUploads={onRemoveUploads}
      />

      <Buttons>
        <OutlineButton
          type="button"
          onClick={onClickCancel}
          color={theme.color.red}
          style={{ marginRight: "10px" }}
        >
          취소하기
        </OutlineButton>
        <NormalButton
          type="submit"
          disabled={!isButtonActive()}
          color="#000000"
        >
          {id ? "수정하기" : "추가하기"}
        </NormalButton>
      </Buttons>
    </Container>
  );
};

const Container = styled.form`
  width: 90%;
  margin: 0 auto;
  padding-top: 30px;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
`;

const Buttons = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
`;
