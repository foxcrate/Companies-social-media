const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log("server is running http://localhost:" + process.env.PORT);
});
