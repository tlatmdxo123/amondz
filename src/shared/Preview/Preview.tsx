import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import styled from "styled-components";

type Props = {
  upload?: File;
  image?: string;
  onRemove?: (value: any) => void;
};

export const Preview = ({ upload, onRemove, image }: Props) => {
  const [url, setUrl] = useState<string | null>();
  useEffect(() => {
    if (!url && upload) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUrl(e.target!.result as string);
      };
      reader.readAsDataURL(upload);
    }
  });
  return (
    <PreviewContainer>
      {onRemove && (
        <CancelButton type="button" onClick={onRemove}>
          <MdCancel />
        </CancelButton>
      )}
      <img src={url ? url : image} alt="upload-preview" />
    </PreviewContainer>
  );
};

export const PreviewContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 3px;
  position: relative;
  margin-right: 10px;
  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
const CancelButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;
