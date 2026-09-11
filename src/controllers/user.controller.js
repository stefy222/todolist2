import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { pool } from "../db/connection.js";
import { userDecorator } from "../decorators/user.decorator.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 8 caracteres"
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
      user: userDecorator({
        id,
        name,
        email
      })
    });

  } catch (error) {
    console.error("Error al crear usuario:", error);

    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "El correo y la contraseña son obligatorios"
      });
    }

    const [users] = await pool.query(
      `SELECT id, name, email, password
       FROM users
       WHERE email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Correo o contraseña incorrectos"
      });
    }

    const user = users[0];

    const passwordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordValid) {
      return res.status(401).json({
        message: "Correo o contraseña incorrectos"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1 hora"
      }
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: userDecorator(user)
    });

  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};