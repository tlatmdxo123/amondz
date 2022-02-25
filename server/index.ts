import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Product } from "../types/product";
import express, { Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import { nanoid } from "nanoid";

const adapter = new FileSync<{ products: Product[] }>("db.json");
const db = low(adapter);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

db.defaults({
  products: [
    {
      name: "Ball ear-cuff 볼 이어커프",
      price: 59000,
      likes: 2420,
      images: [
        "/images/PSI_186162.jpeg",
        "/images/PSI_186162(1).jpeg",
        "/images/PSI_186162(2).jpeg",
        "/images/PSI_186162(3).jpeg",
        "/images/PSI_186162(4).jpeg",
      ],
    },
  ],
}).write();

const app = express();
const port = 4321;

app.use(cors());
app.use(bodyParser.json());

app.get("/products", (req, res) => {
  const products = db.get("products").value();

  res.json(products);
});

app.get("/images/:name", (req, res) => {
  const { name } = req.params;
  res.sendFile(`images/${name}`, { root: __dirname });
});

app.post("/products/new", upload.array("files", 5), (req, res) => {
  const newProduct = getProductFromReq(req);
  db.get("products").push(newProduct).write();
  res.json(newProduct);
});

app.post("/products/:id", upload.array("files", 5), (req, res) => {
  const { id } = req.params;
  const newProduct = getProductFromReq(req, id);
  db.get("products").find({ id }).assign(newProduct).write();
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.get("products").remove({ id }).write();
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

function getProductFromReq(req: Request, id = nanoid()) {
  const { price, name, likes } = req.body;
  const newProduct: Product = {
    id,
    name,
    likes: +likes,
    price: +price,
    images: (req.files as Express.Multer.File[]).map((file) =>
      file.path.replace("server", "")
    ),
  };
  return newProduct;
}
