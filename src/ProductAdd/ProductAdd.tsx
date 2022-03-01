import { useParams } from "react-router-dom";
import { Form } from "./Form";

export const ProductAdd = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <Form id={id} />
    </div>
  );
};
