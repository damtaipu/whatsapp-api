import express from "express";
import App from "@http/express";

let expressApp = express();
const routes = new App(expressApp);

routes.blockUrlBases();
routes.getOrderId();

expressApp.listen(3000, () => {
    console.log("Servidor Online");
})