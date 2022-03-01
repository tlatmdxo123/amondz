import { IMAGE_MAX, SERVER_URL } from "../constants";
import { Preview } from "../shared/Preview";
import { MdAddPhotoAlternate } from "react-icons/md";
import styled from "styled-components";

type Props = {
  uploads: File[];
  setUploads: React.Dispatch<React.SetStateAction<File[]>>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ImageInput = ({
  uploads,
  setUploads,
  images,
  setImages,
}: Props) => {
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
  return (
    <Container>
      <PreviewList>
        {images.map((image) => {
          return (
            <Preview
              image={SERVER_URL + image}
              onRemove={() => onRemoveImages(image)}
            />
          );
        })}
        {uploads.map((upload) => (
          <Preview upload={upload} onRemove={() => onRemoveUploads(upload)} />
        ))}
      </PreviewList>
      {uploadsNum < 5 && (
        <AddImage htmlFor="product-images">
          <MdAddPhotoAlternate />
        </AddImage>
      )}
      <Input
        type="file"
        id="product-images"
        name="product-images"
        accept="image/png, image/jpeg"
        onChange={(e) => onAddImages(e)}
        multiple
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 10px 0;
`;
const PreviewList = styled.ul`
  display: flex;
  margin-right: 10px;
`;
const AddImage = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.color.gray[400]};
  width: 70px;
  height: 70px;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.color.gray[200]};
  cursor: pointer;
`;
const Input = styled.input`
  display: none;
`;
