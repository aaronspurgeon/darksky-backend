const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World"
  });
});

server.get("/weather", (req, res) => {
  const { lat, lon } = req.query;

  let request = unirest(
    "GET",
    `https://${process.env.RAPID_HOST}/${lat},${lon}`
  );

  request.query({
    lang: "en",
    units: "auto"
  });

  request.end(res => {
    if (res.error) res.status(500).end();

    const {
      summary,
      precipProbability,
      temperature,
      windSpeed,
      windBearing
    } = res.body.currently;

    res.status(200).send(
      JSON.stringify({
        summary: summary,
        chanceOfRain: precipProbability,
        temp: temperature,
        wind: {
          speed: windSpeed,
          bearing: windBearing
        }
      })
    );
  });
});

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;

server.listen(port, host, () => {
  console.log("app runnin");
});
