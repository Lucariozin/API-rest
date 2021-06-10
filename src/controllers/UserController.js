// const User = require('../models/User');
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const { id, name, email } = await User.create(req.body);
      return res.json({ id, name, email });
    } catch (e) {
      return res.json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const allUsers = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(allUsers);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      const { name, email } = user;

      return res.json({ id, name, email });
    } catch (e) {
      return res.json('Usuário não pode ser encontrado.');
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      const { id, name, email } = await user.update(req.body);
      return res.json({ id, name, email });
    } catch (e) {
      return res.json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }

      await user.destroy();
      return res.json(user);
    } catch (e) {
      return res.json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
