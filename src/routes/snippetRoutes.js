const express = require("express");
const crypto = require("crypto");
const snippetRouter = express.Router();
const { Snippet } = require("../models/index");

snippetRouter.use(express.json());
snippetRouter.use(express.urlencoded());

snippetRouter.get("/", async (req, res) => {
  const snippets = await Snippet.findAll();

  res.status(200).json(snippets);
});

function decrypt(text) {
  const [ivHex, encryptedTextHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedTextHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(crypto.randomBytes(32)),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

snippetRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const snippet = await Snippet.findByPk(id);

  const decryptedCode = decrypt(snippet.code);

  res.status(200).json({
    id: snippet.id,
    language: snippet.language,
    code: decryptedCode,
  });
});

function encrypt(text) {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(crypto.randomBytes(32)),
    crypto.randomBytes(16)
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

snippetRouter.post("/", async (req, res) => {
  const { language, code } = req.body;

  const encryptedCode = encrypt(code);

  const snippet = await Snippet.create({
    language,
    code: encryptedCode,
  });

  res
    .status(200)
    .json({ message: "Snippet Created Successfully", snippetId: snippet.id });
});

module.exports = snippetRouter;
