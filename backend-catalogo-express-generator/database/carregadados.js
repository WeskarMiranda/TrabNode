require("./mongodb");
const mongoose = require("mongoose");
const cadastros = require("./cadastros.json");
const cadastroModel = require("../models/cadastroModel");

async function carregarDados() {
    try {
        await cadastroModel.deleteMany({});
        for (const cadastro of cadastros) {
            await cadastroModel.create(cadastro);
        }
        console.log("usuário cadastrado");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

carregarDados();