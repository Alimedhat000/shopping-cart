import express from "express";
import cors from "cors";
import "./utils/bigIntToString";
import baseRouter from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); //allow all for now
app.use(express.json());

app.use("/api", baseRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
