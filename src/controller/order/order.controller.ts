import { BaseData } from "@entity/baseData/base-data.entity";
import OrderRepositoryMemory from "@infra/repository/order/order-repository.memory";
import GetOrderUseCase from "@usecase/order/get-order.usecase";

export default class OrderController {
	static getOrder (params, body, res) {

        let rtn;
        const orderMemory = new OrderRepositoryMemory();
		const getOrder = new GetOrderUseCase(orderMemory);
		const order = getOrder.execute(params.id);
        order.subscribe(p => {
            rtn = p;
        }).unsubscribe();

        if(!rtn) return new BaseData(404, 'nao retornou resultados', []).sendResponse(res);
        return new BaseData(200, 'sucesso', Array(rtn)).sendResponse(res);

        
	}
}