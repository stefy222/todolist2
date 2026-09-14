import { randomUUID } from "crypto";
import { pool } from "../db/connection.js";
import { categoryDecorator } from "../decorators/category.decorator.js";

export const index = async (req, res) => {
  try {
    const userId = req.user.user ? req.user.user.id : req.user.id;
      const [rows] = await pool.query(
      'SELECT * FROM categorias WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    return res.status(200).json({
      categories: categoriesListDecorator(rows)
    });
  } catch (error) {
    console.error('Error al listar categorías:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const store = async (req, res) => {
  try {
    const { name} = req.body;
    const userId = req.user.user ? req.user.user.id : req.user.id;

    if (!name) {
      return res.status(400).json({
        message: "El nombre es obligatorio"
      });
    }

    const id = randomUUID();

    await pool.query(
      'INSERT INTO categories (id, name, user_id) VALUES (?, ?, ?)',
      [id, name, userId]
    );

    const [rows] = await pool.query(
      'SELECT id, name, user_id FROM categories WHERE id = ?',
      [id]
    );

    return res.status(201).json({
      data: categoryDecorator(rows[0])
    });

  } catch (error) {
    console.error("Error al crear categoría:", error);

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};


export const show = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user ? req.user.user.id : req.user.id;

    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Identificador de categoría no válido' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM categorias WHERE id = ? and user_id = ? ORDER BY name ASC',
      [id, userId]
    );

    return res.status(200).json({
      data: rows.map(categoryDecorator)
    });

  } catch (error) {
    console.error("Error al listar categorías:", error);

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};


export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Identificador de categoría no válido' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Nombre obligatorio' });
    }

    const [result] = await pool.query(
      'UPDATE categories SET name = ? WHERE id = ? AND user_id = ?', [name, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }

    const [rows] = await pool.query(
      'SELECT * FROM categories WHERE id = ? AND user_id = ?', [id, userId]
    );

    return res.status(200).json({
      message: "Categoría actualizada correctamente",
      data: categoryDecorator(rows[0])
    });

  } catch (error) {
    console.error("Error al actualizar categoría:", error);

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};


export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.user ? req.user.user.id : req.user.id;

    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Identificador de categoría no válido' });
    }

    const [result] = await pool.query(
      'DELETE FROM categories WHERE id = ? and user_id = ?', [id, userId]
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