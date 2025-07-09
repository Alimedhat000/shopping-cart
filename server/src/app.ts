import express from "express";
import "./utils/bigIntToString";
import baseRouter from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", baseRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
