import ExpressAdapter from '@adapter/express.adpter';
import express from 'express';
import VerifyParamMiddleware from './middleware/validate-param.middleware';
import OrderController from '@controller/order/order.controller';
import RouteBaseBlock from '@infra/http/route/block-baseurl.route';
import { createServer, Server } from 'http';
import SocketIo from '@infra/http/socket.io';

export default class App {

    private app: express.Application;
    private httpServer: Server;
    private io;

    constructor() {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = SocketIo.serverIo(this.httpServer);

        this.io.on("connection", (socket) => {
            console.log('Usuário conectado');

            socket.on('disconnect', () => {
                console.log('usário desconectado');
            });
        });
    }

    //Root routes
    blockRootRoutes() {
        this.app.get(['/', '/teste'], ExpressAdapter.create(RouteBaseBlock.blockUrlBase));
    }

    // Order API
    orderRoutes() {
        this.app.get('/teste/:id', VerifyParamMiddleware.checkParam, ExpressAdapter.create(OrderController.getOrder, this.io));
    }

    listen(port: number, socket: boolean) {

        // Para iniciar o servidor com Socket.io
        if (socket) {
            this.httpServer.listen(port, () => {
                console.log(`Serve is up in port ${port} with SocketI.io`);
            });
            return;
        }

        this.app.listen(port, () => {
            console.log(`Serve is up in port ${port}, sem Socket.io`);
        });
    }
}

