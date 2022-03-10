import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addProduct, editProduct, selectProduct } from "../../store/Products";
import { ThemeContext } from "styled-components";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { IMAGE_MAX } from "../../constants";

export function useFormContexts() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct(id || ""));

  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price.toString() : "");
  const [uploads, setUploads] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>(product ? product.images : []);
  const [priceError, setPriceError] = useState(false);

  const theme = useContext(ThemeContext);

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

  function onAddImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const empty = IMAGE_MAX - images.length - uploads.length;
    const length = files.length < empty ? files.length : empty;

    for (let i = 0; i < length; i++) {
      !uploads.includes(files[i]) &&
        setUploads((uploads) => uploads.concat(files[i]));
    }
  }

  function onRemoveImages(url: string) {
    const filtered = images.filter((image) => image !== url);
    setImages(filtered);
  }

  function onRemoveUploads(file: File) {
    setUploads((uploads) =>
      uploads.filter((upload) => upload.name !== file.name)
    );
  }

  const uploadsNum = images.length + uploads.length;

  return {
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
  };
}
