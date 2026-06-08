import ExpressAdapter from '@adapter/express.adapter';
import express, { NextFunction, Request, Response } from 'express';
import { createServer, Server } from 'http';

import VerifyParamMiddleware from './middleware/validate-param.middleware';

import OrderController from '@controller/order/order.controller';
import RouteBaseBlock from '@infra/http/route/block-baseurl.route';

import WhatsAppGetController from '@controller/whatsapp-api/whatsapp-check-webhook.controller';
import WhatsAppPostController from '@controller/whatsapp-api/whatsapp-post.controller';

import SocketIo from '@infra/http/socket.io';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Server as SocketServer } from 'socket.io';

export default class App {
    private readonly app: express.Application;
    private readonly httpServer: Server;
    private readonly io: SocketServer;

    constructor() {
        dotenv.config();

        this.app = express();
        this.configureParsers();

        this.httpServer = createServer(this.app);
        this.io = SocketIo.serverIo(this.httpServer);

        this.configureSocket();
        this.logEnvironment();
    }

    blockRootRoutes(): void {
        this.app.get(['/', '/teste'], ExpressAdapter.create(RouteBaseBlock.blockUrlBase));
    }

    orderRoutes(): void {
        this.app.get('/teste/:id', VerifyParamMiddleware.checkParam, ExpressAdapter.create(OrderController.getOrder, this.io));
    }

    whatsAppRoutes(): void {
        this.app.get('/webhooks', ExpressAdapter.create(WhatsAppGetController.checkWebHooksWhatsApp));
        this.app.post('/webhooks', ExpressAdapter.create(WhatsAppPostController.metaWhatsPostAppCallBack));
        this.configureErrorHandler();
    }

    listen(): void {
        const port = process.env.NODE_PORT || process.env.PORT || '3000';

        this.httpServer.listen(port, () => {
            console.log(`Server is up on port ${port} with Socket.io`);
        });
    }

    private configureParsers(): void {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private configureSocket(): void {
        this.io.on('connection', (socket) => {
            console.log('Usuário conectado');

            socket.on('disconnect', () => {
                console.log('Usuário desconectado');
            });
        });
    }

    private configureErrorHandler(): void {
        this.app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
            console.error(error);
            return res.status(500).send({
                code: 500,
                message: 'Erro interno do servidor',
                data: [],
            });
        });
    }

    private logEnvironment(): void {
        const environment = process.env.NODE_ENV || 'dev';
        console.log(`Server running in ${environment} mode.`);
    }
}
