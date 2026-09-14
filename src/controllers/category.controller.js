import { randomUUID } from "crypto";
import { pool } from "../db/connection.js";
import { categoryResource } from "../decorators/category.decorator.js";

export const createCategory = async (req, res) => {
  try {
    const { name, user_id } = req.body;

    if (!name || !user_id) {
      return res.status(400).json({
        message: "El nombre y el user_id son obligatorios"
      });
    }

    const id = randomUUID();

    const [result] = await pool.query(
      `INSERT INTO categories (id, name, user_id)
       VALUES (?, ?, ?)`,
      [id, name, user_id]
    );

    const [rows] = await pool.query(
      `SELECT id, name, user_id
       FROM categories
       WHERE id = ?`,
      [id]
    );

    return res.status(201).json({
      message: "Categoría creada correctamente",
      data: categoryResource(rows[0])
    });

  } catch (error) {
    console.error("Error al crear categoría:", error);

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};


export const getCategories = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        message: "El user_id es obligatorio"
      });
    }

    const [rows] = await pool.query(
      `SELECT id, name, user_id
       FROM categories
       WHERE user_id = ?
       ORDER BY name ASC`,
      [user_id]
    );

    return res.status(200).json({
      data: rows.map(categoryResource)
    });

  } catch (error) {
    console.error("Error al listar categorías:", error);

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};


export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, user_id } = req.body;

    if (!name || !user_id) {
      return res.status(400).json({
        message: "El nombre y el user_id son obligatorios"
      });
    }

    const [result] = await pool.query(
      `UPDATE categories
       SET name = ?
       WHERE id = ? AND user_id = ?`,
      [name, id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }

    const [rows] = await pool.query(
      `SELECT id, name, user_id
       FROM categories
       WHERE id = ? AND user_id = ?`,
      [id, user_id]
    );

    return res.status(200).json({
      message: "Categoría actualizada correctamente",
      data: categoryResource(rows[0])
    });

  } catch (error) {
    console.error("Error al actualizar categoría:", error);

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "El user_id es obligatorio"
      });
    }

    const [result] = await pool.query(
      `DELETE FROM categories
       WHERE id = ? AND user_id = ?`,
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }

    return res.status(200).json({
      message: "Categoría eliminada correctamente"
    });

  } catch (error) {
    console.error("Error al eliminar categoría:", error);

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};