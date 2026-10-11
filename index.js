import express from "express";
import sequelize from "./database.js";
import Produto from "./models/Produto.js";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/produtos", async (req, res) => {
  try {
    const produtos = await Produto.findAll();

    res.status(200).json(produtos)
  } catch (error) {
    res.status(500).json({error: "Produtos no encontrados"})
  }
});

app.get("/produtos/:id", async (req,res) => {
    try {
        const produto = await Produto.findByPk(req.params.id)

        if (!produto) {
            return res.status(404).json({error: "Produto no encontrado"})
        }

        res.status(200).json(produto)

    } catch (error) {
        res.status(500).json({error: "Error al buscar produto"})
    }
})

app.post("/produtos", async (req, res) => {
  try {
    const { nome, preco } = req.body;
    const produto = await Produto.create({
      nome: nome,
      preco: preco,
    });

    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ erro: "Error al crear producto" });
  }
});

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("Banco de datos e tabelas sincronizadas");

    app.listen(PORT, () => {
      console.log(`Servidor rodando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar", error);
  }
}

iniciarServidor();
