import nedb from "nedb";
const db = new nedb({filename: 'banco.db', autoload: true});

var usuario = {
	name: "Pedro Henrique",
	email: "pedrao@gmail.com",
	contact: "42999588779"
};

db.insert(usuario, function(err){
  if(err)return console.log(err); //caso ocorrer algum erro
 
  console.log("Novo usuário adicionado!");
 });
