import ExpressAdapter from '@adapter/express.adpter';
import express from 'express';
import VerifyParamMiddleware from './middleware/validate-param.middleware';
import OrderController from '@controller/order/order.controller';
import RouteBaseBlock from '@route/block-baseurl.route';



export default class App {

    private app: express.Application;

    constructor(app: express.Application){
        this.app = app;
    }
     
    blockUrlBases(){
        this.app.get(['/', '/teste'], ExpressAdapter.create(RouteBaseBlock.blockUrlBase));
    }

    getOrderId(){
        this.app.get('/teste/:id', VerifyParamMiddleware.checkParam, ExpressAdapter.create(OrderController.getOrder));
    }
    
}

