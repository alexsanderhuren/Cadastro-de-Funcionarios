import express from "express";

import { getFuncionarios, createFuncionario, getFuncionario, deleteFuncionario, updateFuncionario } from "../controllers/funcionarios.js";

const router = express.Router();

router.get("/funcionarios", getFuncionarios);
router.post("/funcionario", createFuncionario);
router.get("/funcionario/:id", getFuncionario);
router.delete("/funcionario/:id", deleteFuncionario);
router.put("/funcionario/:id", updateFuncionario);

export default router;
