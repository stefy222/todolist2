import { randomUUID } from "crypto";
import { pool } from "../db/connection.js";
import { tagDecorator,tagsListDecorator } from "../decorators/tag.decorator.js";
import {isValidId} from "../utils/validators.js"

export const index = async (req, res) => {
  try {
    const userId = req.user.user ? req.user.user.id : req.user.id;  
    const page = parseInt(req.query.page) || 1;
    const limit = 10; 
    const offset = (page - 1) * limit; 

    const [countRows] = await pool.query(
      'SELECT COUNT(*) as total FROM tags WHERE user_id = ?',
      [userId]
    );
    const totalItems = countRows[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    const [rows] = await pool.query
    ('SELECT * FROM tags WHERE user_id = ? ORDER BY created_at DESC', [userId,limit,offset]);
    
    return res.status(200).json({
          categories: tagsListDecorator(rows),
          pagination: {
            totalItems,
            totalPages,
            currentPage: page,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
          }
    })
  } catch (error) {
    console.error('Error al listar etiquetas:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const store = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.user ? req.user.user.id : req.user.id;

    if (!name) {
      return res.status(400).json({
        message: "El nombre es obligatorio"
      });
    }

    const id = randomUUID();

   await pool.query(
      'INSERT INTO tags (id, name, user_id) VALUES (?, ?, ?)',
      [id, name, userId]
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
    const userId = req.user.user ? req.user.user.id : req.user.id;

    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ message: "Identificador de etiqueta no válido" });
    }

    const [rows] = await pool.query(
      'SELECT * FROM tags WHERE id = ? AND user_id = ? ORDER BY name ASC',
      [id,userId]
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
    const userId = req.user.user ? req.user.user.id : req.user.id;

    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Identificador de etiqueta no válido' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Nombre obligatorio' });
    }

    const [result] = await pool.query(
      'UPDATE tags SET name = ? WHERE id = ? AND user_id = ?', [name, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "etiqueta no encontrada"
      });
    }

    const [rows] = await pool.query(
      'SELECT * FROM tags WHERE id = ? AND user_id = ?', [id, userId]
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
    const userId = req.user.user ? req.user.user.id : req.user.id;

    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Identificador de etiqueta no válido' });
    }

    const [result] = await pool.query(
      'DELETE FROM tags WHERE id = ? AND user_id = ?',
      [id, userId]
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