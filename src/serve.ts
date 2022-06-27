import App from "@infra/http/express";

const api = new App();

api.blockRootRoutes();
api.orderRoutes();

api.listen(3000);