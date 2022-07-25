import OrderEntity from "@entity/order/order.entity";
import OrderRepository from "@repository/order/order-repository";
import { Observable, of } from "rxjs";

export default class OrderRepositoryMemory implements OrderRepository{

    product = [{nome: "Biscoito triunfo", valor: 10.00}];
    pedidos = [
        new OrderEntity(200, new Date("July 21, 1983 01:15:00"), this.product, 'aberto'),
        new OrderEntity(100, new Date("July 21, 1983 01:15:00"), this.product, 'fechado'),
        new OrderEntity(14, new Date("July 21, 1983 01:15:00"), this.product, 'aberto')
    ];

    getOrder(id: number): Observable<OrderEntity> { 
        return of(this.pedidos.find(r => r.number === Number(id)));
    }
    
} 