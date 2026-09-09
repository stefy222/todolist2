import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { pool } from "../db/connection.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "El correo electrónico ya está registrado"
      });
    }

    const id = randomUUID();

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (id, name, email, password)
       VALUES (?, ?, ?, ?)`,
      [id, name, email, hashedPassword]
    );

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: {
        id,
        name,
        email
      }
    });

  } catch (error) {
    console.error("Error al crear usuario:", error);

    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};