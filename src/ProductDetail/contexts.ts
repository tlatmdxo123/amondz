import { useAppDispatch, useAppSelector } from "../hooks";
import { selectProduct, removeProduct } from "../store/Products";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "styled-components";

export function useDetailContexts() {
  const { id = "" } = useParams<{ id: string }>();
  const product = useAppSelector(selectProduct(id));
  const [currentImage, setCurrentImage] = useState<string>(
    product ? product.images[0] : ""
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  function onClickDelete() {
    dispatch(removeProduct(id));
    navigate("/");
  }

  return {
    id,
    product,
    currentImage,
    setCurrentImage,
    theme,
    onClickDelete,
  };
}
