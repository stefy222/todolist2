import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./db/connection.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import tagRoutes from "./routes/tag.routes.js"
import taskRoutes from "./routes/task.routes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "API inicializada correctamente" });
});

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/tags",tagRoutes)
app.use("/tasks",taskRoutes)

app.use((req, res) => {
  res.status(404).json({
    error: "NOT FOUND",
    message: "La ruta solicitada no existe",
  });
});

const startServer = async () => {
  await dbConnection();

  app.listen(PORT, () => {
    console.log('Servidor iniciado en http://localhost:${PORT}');
  });
};

startServer();