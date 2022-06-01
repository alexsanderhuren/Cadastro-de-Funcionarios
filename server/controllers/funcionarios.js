import nedb from "nedb";
const db = new nedb({filename: 'banco.db', autoload: true});

export const getFuncionarios = (req, res) => {
  db.find({}).sort({ nome: 1 }).exec(function (err, funcionarios) {
    res.send(funcionarios);
  })
};

export const createFuncionario = (req, res) => {
  const funcionario = req.body;
  db.insert(funcionario, function(err){
    res.send("Funcionário Adicionado com Sucesso!");
  })
};

export const getFuncionario = (req, res) => {
  db.find({_id: req.params.id}, function (err, funcionario) {
    res.send(funcionario);
  })
};

export const deleteFuncionario = (req, res) => {
  db.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
    res.send("Funcionário deletado com sucesso");
  })
};

export const updateFuncionario = (req, res) => {
  db.update({ _id: req.params.id }, { $set: { "nome": req.body.nome, "email": req.body.email, "ddd": req.body.ddd, "telefone": req.body.telefone } }, {}, function () {
    res.send("Usuário Atualizado com sucesso");
  })
};
