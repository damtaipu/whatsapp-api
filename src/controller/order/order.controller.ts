import { BaseData } from "@entity/baseData/base-data.entity";
import OrderRepositoryMemory from "@infra/repository/order/order-repository.memory";
import GetOrderUseCase from "@usecase/order/get-order.usecase";

export default class OrderController {
    static getOrder(params, res, io?) {
        let rtn;
        const orderMemory = new OrderRepositoryMemory();
        const getOrder = new GetOrderUseCase(orderMemory);
        const order = getOrder.execute(params.id);

        order.subscribe(p => {
            rtn = p;
        }).unsubscribe();

        if (!rtn) return BaseData.sendResponse(404, 'nao retornou resultados', [], res);
        
        //Dispara evento via Socket.io
        io.emit('test-message', 'Menssagem eviada via Socket.io para fins de teste');
        return BaseData.sendResponse(200, 'sucesso', Array(rtn), res);
    }
}