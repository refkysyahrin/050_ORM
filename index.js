const express = require("express");
const app = express();
const port = 3000;
const db = require("./models");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.listen(port, () => {
  console.log("Server is started on port 3000");
});

db.sequelize
  .sync()
  .then((result) => {
    app.listen(port, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/Komik", async (req, res) => {
  const data = req.body;
  try {
    const komik = await db.Komik.create(data);
    res.send(komik);
  } catch (error) {
    res.send(error);
  }
});

app.get("/Komik", async (req, res) => {
  try {
    const komik = await db.Komik.findAll();
    res.send(komik);
  } catch (error) {
    res.send(err);
  }
});

app.put("/Komik/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Komik = await db.Komik.findByPk(id);
    if (!Komik) {
      return res.status(404).send({ message: "Komik tidak tersedia" });
    }
    await Komik.update(data);
    res.send({ message: "Komik berhasil diupdate", Komik });
  } catch (error) {
    res.status(500).send(err);
  }
});

app.delete("/Komik/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const Komik = await db.Komik.findByPk(id);
    if (!Komik) {
      return res.status(404).send({ message: "Komik tidak tersedia" });
    }
    await Komik.destroy();
    res.send({ message: "Komik berhasil dihapus" });
  } catch (error) {
    res.status(500).send(err);
  }
});
