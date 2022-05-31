import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  nome: "",
  email: "",
  ddd: "",
  telefone: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { nome, email, ddd, telefone } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleFuncionario(id);
    }
  }, [id]);

  const getSingleFuncionario = async (id) => {
    const response = await axios.get(`http://localhost:5000/funcionario/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    
  };

  const addFuncionario = async (data) => {
    const response = await axios.post("http://localhost:5000/funcionario", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const updateFuncionario = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/funcionario/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !email || !ddd || !telefone) {
      toast.error("Preencha todos os campos");
    } else {
      if (!id) {
        addFuncionario(state);
      } else {
        updateFuncionario(state, id);
      }

      setTimeout(() => history.push("/"), 1000);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <h3>{id ? "Editar Funcionário" : "Cadastrar Funcionário"}</h3>
        <div class="col-md-12">
				  <div class="form-floating mb-3">
	  			  <input type="text" class="form-control" name= "nome" id="floatingInput"  value={nome} onChange={handleInputChange} placeholder="name@example.com"/>
	  				<label for="floatingInput">Nome</label>
					</div>
				</div>

        <div class="col-md-12">
				  <div class="form-floating mb-3">
	  			  <input type="email" class="form-control" name= "email" id="floatingInput"  value={email} onChange={handleInputChange} placeholder="name@example.com"/>
	  				<label for="floatingInput">Email</label>
					</div>
				</div>

        
        <div class = "row">
        <div class="col-md-3">
				  <div class="form-floating mb-3">
	  			  <input type="number" class="form-control" name= "ddd" id="floatingInput"  value={ddd} onChange={handleInputChange} placeholder="name@example.com"/>
	  				<label for="floatingInput">DDD</label>
					</div>
				</div>

        <div class="col-md-9">
				  <div class="form-floating mb-3">
	  			  <input type="number" class="form-control" name= "telefone" id="floatingInput"  value={telefone} onChange={handleInputChange} placeholder="name@example.com"/>
	  				<label for="floatingInput">Telefone</label>
					</div>
				</div>
        </div>
        <input class="btn btn-success btn-xs" type="submit" value={id ? "Atualizar" : "Cadastrar"} />
      </form>
    </div>
  );
};

export default AddEdit;
