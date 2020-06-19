const polka = require("polka");
const bent = require("bent");

const getStream = bent(process.env.SERVICE_HOST);

polka()
  .get("*", async (req, res) => {
    var message;
    try {
      let stream = await getStream("/");
      message = await stream.text();
    } catch (error) {
      message = error;
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message,
      })
    );
  })
  .listen(
    {
      port: 8082,
      host: "0.0.0.0",
    },
    (err) => {
      if (err) throw err;
      console.log(`> Server running on port :8082`);
    }
  );
