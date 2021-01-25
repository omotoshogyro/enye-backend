const express = require("express");
const axios = require("axios");
const app = express();
var PORT = process.env.PORT || 5000;

app.get("/api/rates", (req, res) => {
  const { base, currency } = req.query;

  if (!base) {
    return res
      .status(422)
      .json({ error: "Base exchange currency type is not Specified" });
  }

  axios
    .get(
      `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`
    )
    .then((response) => {
      const { base, date, rates } = response.data;
      const currentDate = new Date().toJSON().slice(0, 10);
      return res.status(200).json({
        results: { base, date: date, rates },
      });
    })
    .catch((err) => {
      return res.status(err.status).json({ error: err.messsage });
    });
});

app.use((req, res) => {
  return res.status(404).json({ error: "Invalid endpoint request" });
});

app.listen(PORT);
