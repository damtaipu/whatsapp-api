import OrderEntity from "@entity/order/order.entity";
import { Observable } from "rxjs";

export default interface OrderRepository{
    getOrder(id: number): Observable<OrderEntity>;
}