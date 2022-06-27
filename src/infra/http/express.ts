import ExpressAdapter from '@adapter/express.adpter';
import express from 'express';
import VerifyParamMiddleware from './middleware/validate-param.middleware';
import OrderController from '@controller/order/order.controller';
import RouteBaseBlock from '@infra/http/route/block-baseurl.route';

export default class App {

    private app: express.Application;

    constructor(){
        this.app = express();
    }
     
    //Root routes
    blockRootRoutes(){
        this.app.get(['/', '/teste'], ExpressAdapter.create(RouteBaseBlock.blockUrlBase));
    }

    // Order API
    orderRoutes(){
        this.app.get('/teste/:id', VerifyParamMiddleware.checkParam, ExpressAdapter.create(OrderController.getOrder));
    }

    listen(port: number){
        this.app.listen(port, () => {
            console.log(`Serve is up in port ${port}`);
        });
    }
}

