import OrderEntity from "@entity/order/order.entity";
import OrderRepository from "@repository/order/order-repository";
import { Observable, of } from "rxjs";

export default class OrderRepositoryMemory implements OrderRepository {
    private readonly products = [{ nome: "Biscoito triunfo", valor: 10.00 }];

    private readonly orders = [
        new OrderEntity(200, new Date("1983-07-21T01:15:00.000Z"), this.products, 'aberto'),
        new OrderEntity(100, new Date("1983-07-21T01:15:00.000Z"), this.products, 'fechado'),
        new OrderEntity(14, new Date("1983-07-21T01:15:00.000Z"), this.products, 'aberto'),
    ];

    getOrder(id: number): Observable<OrderEntity | undefined> {
        return of(this.orders.find((order) => order.number === Number(id)));
    }
}
