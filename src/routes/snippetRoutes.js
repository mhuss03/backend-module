const express = require("express");
const snippetRouter = express.Router();
const { Snippet } = require("../models/index");
snippetRouter.use(express.json());
snippetRouter.use(express.urlencoded());

snippetRouter.get("/", async (req, res) => {
  const snippets = await Snippet.findAll();

  res.status(200).json(snippets);
});

snippetRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const snippets = await Snippet.findByPk(id);

  res.status(200).json(snippets);
});

snippetRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const snippets = await Snippet.findAll({ where: {} });

  res.status(200).json(snippets);
});

snippetRouter.post("/", async (req, res) => {
  const { language, code } = req.body;

  const snippets = await Snippet.create({
    language,
    code,
  });

  res.status(200).json({ message: "Snippet Created Successfully" });
});

module.exports = snippetRouter;
