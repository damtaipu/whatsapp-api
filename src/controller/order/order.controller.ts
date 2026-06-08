import { BaseData } from "@entity/baseData/base-data.entity";
import OrderRepositoryMemory from "@infra/repository/order/order-repository.memory";
import GetOrderUseCase from "@usecase/order/get-order.usecase";
import { Request, Response } from "express";
import { Server as SocketServer } from "socket.io";
import { firstValueFrom } from "rxjs";

export default class OrderController {
    static async getOrder(req: Request, res: Response, io?: SocketServer) {
        const orderMemory = new OrderRepositoryMemory();
        const getOrder = new GetOrderUseCase(orderMemory);
        const order = await firstValueFrom(getOrder.execute(Number(req.params.id)));

        if (!order) {
            return BaseData.sendResponse(404, 'Não retornou resultados', [], res);
        }

        io?.emit('test-message', 'Mensagem enviada via Socket.io para fins de teste');
        return BaseData.sendResponse(200, 'sucesso', [order], res);
    }
}
