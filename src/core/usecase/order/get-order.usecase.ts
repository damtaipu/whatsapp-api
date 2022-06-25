import OrderRepository from "@repository/order/order-repository";

export default class GetOrderUseCase {
    orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository
    }

    execute(id: number) {
        return this.orderRepository.getOrder(id);
    }
}