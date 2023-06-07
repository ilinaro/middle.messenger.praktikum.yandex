const express = require("express");

const app = express();

app.use(express.static(`${__dirname}/../dist`));
app.use(
    require("express-history-api-fallback")("index.html", { root: "./dist" })
);

app.listen(3000, () => {
    console.log(`listening 3000!`);
});
