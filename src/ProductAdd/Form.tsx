import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addProduct, editProduct, selectProduct } from "../store/Products";
import { isNumber } from "../utils/typeCheck";
import { ImageInput } from "./ImageInput";
import { Input } from "./Input";
import styled, { ThemeContext } from "styled-components";
import { NormalButton, OutlineButton } from "../shared/Buttons";
import { useContext } from "react";

type Props = {
  id?: string;
};

export const Form = ({ id }: Props) => {
  const product = useAppSelector(selectProduct(id || ""));
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price.toString() : "");
  const [uploads, setUploads] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>(product ? product.images : []);
  const [priceError, setPriceError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function onSubmitPostProduct(e: React.FormEvent) {
    e.preventDefault();
    const formData = getFormData();
    id
      ? dispatch(editProduct({ id, data: formData }))
      : dispatch(addProduct(formData));
    navigate("/");
  }

  function getFormData() {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("likes", "0");
    images.forEach((image) => formData.append("prev", image));
    uploads.forEach((upload) => formData.append("files", upload));

    return formData;
  }

  function isButtonActive() {
    return (
      name.length > 0 &&
      price.length > 0 &&
      (uploads.length > 0 || images.length > 0) &&
      !priceError
    );
  }

  function onClickCancel() {
    id ? navigate(`/product-detail/${id}`) : navigate("/");
  }

  const theme = useContext(ThemeContext);
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
        setUploads={setUploads}
        setImages={setImages}
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
