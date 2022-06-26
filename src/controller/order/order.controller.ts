import { BaseData } from "@entity/baseData/base-data.entity";
import OrderRepositoryMemory from "@infra/repository/order/order-repository.memory";
import GetOrderUseCase from "@usecase/order/get-order.usecase";

export default class OrderController {
    static getOrder(params, body, res) {
        let rtn;
        const orderMemory = new OrderRepositoryMemory();
        const getOrder = new GetOrderUseCase(orderMemory);
        const order = getOrder.execute(params.id);
        order.subscribe(p => {
            rtn = p;
        }).unsubscribe();

        if (!rtn) return BaseData.sendResponse(404, 'nao retornou resultados', [], res);
        return BaseData.sendResponse(200, 'sucesso', Array(rtn), res);
    }
}