const express = require("express");
const app = express();
const port = 3000;
const db = require("./models");
const komik = require("./models/komik");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

db.sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/komiks", async (req, res) => {
  const data = req.body;
  try {
    const komik = await db.Komik.create(data);
    res.send(komik);
  } catch (error) {
    res.status(500).json({ error: "Failed to create komik" });
  }
});

app.get("/komiks", async (req, res) => {
  try {
    const komiks = await db.Komik.findAll();
    res.send(komiks);
  } catch (error) {
    res.send(error);
  }
});

app.put("/komiks/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const komiks = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).json({ error: "Komik tidak tersedia" });
    }
    await komik.update(data);
    res.send({ message: "Komik berhasil diupdate", komik });
  } catch (error) {
    res.status(500).send(err);
  }
});

app.delete("/komiks/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const komiks = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).json({ error: "Komik tidak tersedia" });
    }
    await komik.destroy();
    res.send({ message: "Komik berhasil dihapus" });
  } catch (error) {
    res.status(500).send(err);
  }
});
