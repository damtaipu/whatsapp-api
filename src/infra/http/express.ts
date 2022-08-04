import ExpressAdapter from '@adapter/express.adpter';
import express from 'express';
import { createServer, Server } from 'http';

import VerifyParamMiddleware from './middleware/validate-param.middleware';

import OrderController from '@controller/order/order.controller';
import RouteBaseBlock from '@infra/http/route/block-baseurl.route';

import WhatsAppGetController from '@controller/whatsapp-api/whatsapp-check-webhook.controller';
import WhatsAppPostController from '@controller/whatsapp-api/whatsapp-post.controller';

import SocketIo from '@infra/http/socket.io';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';


export default class App {
    private app: express.Application;
    private httpServer: Server;
    private io;

    constructor() {
        this.app = express();

        // Metodos de leitura de dados via POST
        this.app.use(bodyparser.urlencoded({ extended: true }));
        this.app.use(express.json());
        // **

        this.httpServer = createServer(this.app);
        dotenv.config();

        // Configuracao do Socket.io
        this.io = SocketIo.serverIo(this.httpServer);

        this.io.on("connection", (socket) => {
            console.log('Usuário conectado');

            socket.on('disconnect', () => {
                console.log('usário desconectado');
            });
        });
        // **

        if (process.env.NODE_ENV === "dev") {
            console.log(`Server runing in ${process.env.NODE_ENV} mode.`)
        }

        if (process.env.NODE_ENV === "prod") {
            console.log(`Server runing in ${process.env.NODE_ENV} mode.`)
        }
    }

    //Root routes
    blockRootRoutes() {
        this.app.get(['/', '/teste'], ExpressAdapter.create(RouteBaseBlock.blockUrlBase));
    }

    // Order API
    orderRoutes() {
        this.app.get('/teste/:id', VerifyParamMiddleware.checkParam, ExpressAdapter.create(OrderController.getOrder, this.io));
    }

    // WhatsApp API
    whatsAppRoutes() {
        this.app.get('/webhooks', ExpressAdapter.create(WhatsAppGetController.checkWebHooksWhatsApp));

        this.app.post('/webhooks', ExpressAdapter.create(WhatsAppPostController.metaWhatsPostAppCallBack));
    }

    listen() {
        this.httpServer.listen(process.env.NODE_PORT, () => {
            console.log(`Server is up in port ${process.env.NODE_PORT} with SocketI.io`);
        });
    }
}

