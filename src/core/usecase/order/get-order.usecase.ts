import OrderRepository from "@repository/order/order-repository";

export default class GetOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    execute(id: number) {
        return this.orderRepository.getOrder(id);
    }
}
