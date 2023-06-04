const cadastroModel = require('../models/cadastroModel');

class cadastroController {
  async salvar(req, res) {
    try {
      let cadastro = req.body;
      const max = await cadastroModel.findOne({}).sort({ id: -1 });
      cadastro.id = max == null ? 1 : max.id + 1;

      const resultado = await cadastroModel.create(cadastro);
      res.status(201).json(resultado);
    } catch (error) {
      console.error('Erro ao salvar o cadastro:', error);
      res.status(500).json({ error: 'Erro ao salvar o cadastro.' });
    }
  }

  async listar(req, res) {
    try {
      const resultado = await cadastroModel.find({});
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Erro ao listar os cadastros:', error);
      res.status(500).json({ error: 'Erro ao listar os cadastros.' });
    }
  }

  

  async listarUsuarios(req, res) {
    try {
      const { nome, sobrenome, cidade, estado, status } = req.query;

      const query = {};
      if (nome) query.nome = nome;
      if (sobrenome) query.sobrenome = sobrenome;
      if (cidade) query.cidade = cidade;
      if (estado) query.estado = estado;
      if (status) query.status = status;

      const resultado = await cadastroModel.find(query);
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Erro ao listar os usuários:', error);
      res.status(500).json({ error: 'Erro ao listar os usuários.' });
    }
  }

  async listarPorId(req, res) {
    try {
      const id = req.params.id;
      const resultado = await cadastroModel.findOne({ 'id': id });
      if (!resultado) {
        return res.status(404).json({ error: 'Cadastro não encontrado.' });
      }
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Erro ao obter o cadastro:', error);
      res.status(500).json({ error: 'Erro ao obter o cadastro.' });
    }
  }

  async atualizar(req, res) {
    try {
      const id = req.params.id;
      const cadastro = await cadastroModel.findOne({ id });
      if (!cadastro) {
        res.status(404).json({ error: 'Cadastro não encontrado.' });
        return;
      }

      await cadastroModel.updateOne({ id }, req.body);
      res.status(200).send();
    } catch (error) {
      console.error('Erro ao atualizar o cadastro:', error);
      res.status(500).json({ error: 'Erro ao atualizar o cadastro.' });
    }
  }

  async excluir(req, res) {
    try {
      const id = req.params.id;
      const cadastro = await cadastroModel.findOne({ id });
      if (!cadastro) {
        res.status(404).json({ error: 'Cadastro não encontrado.' });
        return;
      }

      await cadastroModel.deleteOne({ id });
      res.status(200).send();
    } catch (error) {
      console.error('Erro ao excluir o cadastro:', error);
      res.status(500).json({ error: 'Erro ao excluir o cadastro.' });
    }
  }
}

module.exports = new cadastroController();
