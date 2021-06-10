"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Picture = require('../models/Picture'); var _Picture2 = _interopRequireDefault(_Picture);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Picture2.default, 'id', 'DESC']],
      include: {
        model: _Picture2.default,
        attributes: ['url', 'filename'],
      },
    });

    return res.json({ alunos });
  }

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);
      const { id, nome, email } = aluno;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado.'],
        });
      }

      await aluno.update(req.body);

      const { nome, email } = aluno;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Picture2.default, 'id', 'DESC']],
        include: {
          model: _Picture2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado.'],
        });
      }

      return res.json({ aluno });
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      await aluno.destroy();

      return res.json('Aluno apagado com sucesso.');
    } catch (e) {
      return res.status(400).json(null);
    }
  }
}

exports. default = new AlunoController();
