import OrderDataModel from "@domain/order/order-data.model";

export default class OrderEntity {
    number: number;
    date: Date;
    product: Array<OrderDataModel>;
    status: string;
    
    constructor(number: number, date: Date, product: Array<OrderDataModel>, status: string){ 
        this.number = number;
        this.date = date;
        this.product = product;
        this.status = status;
    }
}