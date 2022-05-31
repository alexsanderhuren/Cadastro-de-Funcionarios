import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getFuncionarios();
  }, []);

  const getFuncionarios = async () => {
    const response = await axios.get("http://localhost:5000/funcionarios");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const onDeleteFuncionario = async (id) => {
    if (
      window.confirm("Você quer mesmo deletar esse funcionário?")
    ) {
      const response = await axios.delete(`http://localhost:5000/funcionario/${id}`);
      if (response.status === 200) {
        toast.success(response.data);
        getFuncionarios();
      }
    }
  };

  console.log("data=>", data);
  
  return (
   
    <div style={{ marginTop: "50px" }}>
      <div class = "container">
		    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
			    <h1>Cadastro de Funcionários do MMTech</h1>
			  <div class="btn-group mr-2">
				  <a href="/add"class="btn btn-success"><i class="bi bi-plus-circle"></i> Cadastrar</a>
			  </div>
		    </div>
        <div class="table-responsive">
          <table id="example" class="table table-bordered table-hover">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Nome</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>DDD</th>
                <th style={{ textAlign: "center" }}>Telefone</th>
                <th style={{ textAlign: "center" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => {
                  return (
                    <tr>
                      <td>{item.nome}</td>
                      <td>{item.email}</td>
                      <td>{item.ddd}</td>
                      <td>{item.telefone}</td>
                      <td>
                      <a href={`/update/${item._id}`} class="btn btn-sm btn-warning"><i class="bi bi-pen-fill"></i></a>&nbsp;
                      <a href="javascript:void(0)"  onClick={() => onDeleteFuncionario(item._id)} class="btn btn-sm btn-danger"><i class="bi bi-trash-fill"></i></a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
