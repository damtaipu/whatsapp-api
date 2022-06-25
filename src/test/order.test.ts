import OrderRepositoryMemory from "@infra/repository/order/order-repository.memory"
import GetOrderUseCase from "@usecase/order/get-order.usecase"

test('Teste return data', () => {
    const dataAccess = new OrderRepositoryMemory();
    const orderCall = new GetOrderUseCase(dataAccess);

    orderCall.execute(100).subscribe({
        next: value => {
            console.log('next:', value)
        },
        error: err => {
            console.log('error:', err)
        }
    }).unsubscribe();
    
})