import { randomUUID } from "crypto";
import { pool } from "../db/connection.js";
import { categoryDecorator } from "../decorators/category.decorator.js";

export const index = async (req, res) => {
  try {
<<<<<<< HEAD
    const userId = req.user.user ? req.user.user.id : req.user.id;
      const [rows] = await pool.query(
      'SELECT * FROM categorias WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

=======
    const [rows] = await pool.query
    ('SELECT * FROM categories ORDER BY created_at DESC');
>>>>>>> origin/main
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
<<<<<<< HEAD
    const { name} = req.body;
    const userId = req.user.user ? req.user.user.id : req.user.id;

    if (!name) {
      return res.status(400).json({
        message: "El nombre es obligatorio"
=======
    const { name, user_id } = req.body;

    if (!name || !user_id) {
      return res.status(400).json({
        message: "El nombre y el user_id son obligatorios"
>>>>>>> origin/main
      });
    }

    const id = randomUUID();

<<<<<<< HEAD
    await pool.query(
      'INSERT INTO categories (id, name, user_id) VALUES (?, ?, ?)',
      [id, name, userId]
=======
    const [result] = await pool.query(
      'INSERT INTO categories (id, name, user_id) VALUES (?, ?, ?)',
      [id, name, user_id]
>>>>>>> origin/main
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
<<<<<<< HEAD
    const { id } = req.params;
    const userId = req.user.user ? req.user.user.id : req.user.id;

    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Identificador de categoría no válido' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM categorias WHERE id = ? and user_id = ? ORDER BY name ASC',
      [id, userId]
=======
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        message: "El user_id es obligatorio"
      });
    }

    const [rows] = await pool.query(
      'SELECT id, name, user_id FROM categories WHERE user_id = ? ORDER BY name ASC',
      [user_id]
>>>>>>> origin/main
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
<<<<<<< HEAD
      'UPDATE categories SET name = ? WHERE id = ? AND user_id = ?', [name, id, userId]
=======
      'UPDATE categories SET name = ? WHERE id = ?', [name, id]
>>>>>>> origin/main
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }

    const [rows] = await pool.query(
<<<<<<< HEAD
      'SELECT * FROM categories WHERE id = ? AND user_id = ?', [id, userId]
=======
      'SELECT * FROM categories WHERE id = ?', [id]
>>>>>>> origin/main
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
<<<<<<< HEAD
    const userId = req.user.user ? req.user.user.id : req.user.id;
=======
>>>>>>> origin/main

    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Identificador de categoría no válido' });
    }

    const [result] = await pool.query(
<<<<<<< HEAD
      'DELETE FROM categories WHERE id = ? and user_id = ?', [id, userId]
=======
      'DELETE FROM categories WHERE id = ?',
      [id]
>>>>>>> origin/main
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