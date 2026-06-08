import OrderDataModel from "@domain/order/order-data.model";

export type OrderStatus = 'aberto' | 'fechado';

export default class OrderEntity {
    constructor(
        public readonly number: number,
        public readonly date: Date,
        public readonly product: OrderDataModel[],
        public readonly status: OrderStatus,
    ) {}
}
