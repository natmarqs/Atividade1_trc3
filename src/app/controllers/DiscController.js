import Disciplina from "../models/Disciplina";

// CRUD - Create | Read | Update | Delete

class DiscController {
  async index(req, res) {
    try {
      const disciplina = await Disciplina.find();

      return res.status(200).json(disciplina);
    } catch (error) {
      return res.status(500).json({ message: `Erro no servidor! ${error}` });
    }
  }


  async store(req, res) {
    const { codigo, name } = req.body

    if(!codigo){
        return res.status(422).json({message: "Código é um campo obrigatório"})
    }

    try {
        const exist = await Matricula.find({
            "name": name
        })
        if(exist.length){
            return res.status(200).json({message: "Já matriculado"})
        }
    } catch(error){
        return res.status(500).json({ message: `Erro no servidor! ${error}` })
    }
    try {
        const matricula = await Matricula.create(req.body)
        return res.status(200).json(matricula)
    } catch (error){
        return res.status(500).json({ message: `Erro no servidor! ${error}` })
    }
}

  async update(req, res) {
    const { id } = req.params;

    const disciplinaToUpdate = await User.findOne({
      id: id,
    });

    if (!disciplinaToUpdate) {
      return res.status(422).json({ message: "Disciplina não existe, ID inválido" });
    }

    await Disciplina.update(req.body);

    return res.status(200).json({ message: "Disciplina atualizada com sucesso!" });
  }

  async delete(req, res) {
    const disciplinaToDelete = await Disciplina.findOne({ id: req.params.id });

    if (!disciplinaToDelete) {
      return res
        .status(422)
        .json({ message: "Disciplina não existe, ID inválido" });
    }

    await Disciplina.deleteOne({ id: req.params.id });

    return res.json({ message: "Excluído!" });
  }
}

export default new DiscController();
