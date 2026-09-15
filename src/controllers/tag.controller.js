import { randomUUID } from "crypto";
import { pool } from "../db/connection.js";
import { tagDecorator,tagsListDecorator } from "../decorators/tag.decorator.js";
import {isValidId} from "../utils/validators.js"

export const index = async (req, res) => {
  try {
<<<<<<< HEAD
    const userId = req.user.user ? req.user.user.id : req.user.id;  
    const [rows] = await pool.query
    ('SELECT * FROM tags WHERE user_id = ? ORDER BY created_at DESC', [userId]);
=======
    const [rows] = await pool.query
    ('SELECT * FROM tags ORDER BY created_at DESC');
>>>>>>> origin/main
    return res.status(200).json({
      tags: tagsListDecorator(rows)
    });
  } catch (error) {
    console.error('Error al listar etiquetas:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const store = async (req, res) => {
  try {
<<<<<<< HEAD
    const { name } = req.body;
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

   await pool.query(
      'INSERT INTO tags (id, name, user_id) VALUES (?, ?, ?)',
<<<<<<< HEAD
      [id, name, userId]
=======
      [id, name, user_id]
>>>>>>> origin/main
    );

    const [rows] = await pool.query(
      'SELECT * FROM tags WHERE id = ?',
      [id]
    );

    return res.status(201).json({
      data: tagDecorator(rows[0])
    });

  } catch (error) {
    console.error("Error al crear etiqueta:", error);

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};


export const show = async (req, res) => {
  try {
    const { id } = req.params;
<<<<<<< HEAD
    const userId = req.user.user ? req.user.user.id : req.user.id;
=======
>>>>>>> origin/main

    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ message: "Identificador de etiqueta no válido" });
    }

    const [rows] = await pool.query(
<<<<<<< HEAD
      'SELECT * FROM tags WHERE id = ? AND user_id = ? ORDER BY name ASC',
      [id,userId]
=======
      'SELECT * FROM tags WHERE user_id = ? ORDER BY name ASC',
      [id]
>>>>>>> origin/main
    );

    return res.status(200).json({
      data: rows.map(tagDecorator)
    });

  } catch (error) {
    console.error("Error al listar etiquetas:", error);

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};


export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
<<<<<<< HEAD
    const userId = req.user.user ? req.user.user.id : req.user.id;
=======
>>>>>>> origin/main

    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Identificador de etiqueta no válido' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Nombre obligatorio' });
    }

    const [result] = await pool.query(
<<<<<<< HEAD
      'UPDATE tags SET name = ? WHERE id = ? AND user_id = ?', [name, id, userId]
=======
      'UPDATE tags SET name = ? WHERE id = ?', [name, id]
>>>>>>> origin/main
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "etiqueta no encontrada"
      });
    }

    const [rows] = await pool.query(
<<<<<<< HEAD
      'SELECT * FROM tags WHERE id = ? AND user_id = ?', [id, userId]
=======
      'SELECT * FROM tags WHERE id = ?', [id]
>>>>>>> origin/main
    );

    return res.status(200).json({
      message: "etiqueta actualizada correctamente",
      data: tagDecorator(rows[0])
    });

  } catch (error) {
    console.error("Error al actualizar etiqueta:", error);

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
      return res.status(400).json({ message: 'Identificador de etiqueta no válido' });
    }

    const [result] = await pool.query(
<<<<<<< HEAD
      'DELETE FROM tags WHERE id = ? AND user_id = ?',
      [id, userId]
=======
      'DELETE FROM tags WHERE id = ?',
      [id]
>>>>>>> origin/main
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "etiqueta no encontrada"
      });
    }

    return res.status(200).json({
      message: "etiqueta eliminada correctamente"
    });

  } catch (error) {
    console.error("Error al eliminar etiqueta:", error);

    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};