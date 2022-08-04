import App from "@infra/http/express";

const api = new App();

api.blockRootRoutes();

api.orderRoutes();

api.whatsAppRoutes();

api.listen(true);