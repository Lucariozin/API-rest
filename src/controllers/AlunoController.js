import Aluno from '../models/Aluno';
import Picture from '../models/Picture';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Picture, 'id', 'DESC']],
      include: {
        model: Picture,
        attributes: ['url', 'filename'],
      },
    });

    return res.json({ alunos });
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
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
      const aluno = await Aluno.findByPk(id);

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
      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Picture, 'id', 'DESC']],
        include: {
          model: Picture,
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
      const aluno = await Aluno.findByPk(id);

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

export default new AlunoController();
