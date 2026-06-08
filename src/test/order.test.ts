import OrderRepositoryMemory from "@infra/repository/order/order-repository.memory";
import GetOrderUseCase from "@usecase/order/get-order.usecase";
import Util from "@entity/Util/util.commons";
import { firstValueFrom } from "rxjs";

describe('GetOrderUseCase', () => {
    it('retorna pedido existente pelo número informado', async () => {
        const dataAccess = new OrderRepositoryMemory();
        const orderCall = new GetOrderUseCase(dataAccess);

        const order = await firstValueFrom(orderCall.execute(100));

        expect(order).toMatchObject({
            number: 100,
            status: 'fechado',
            product: [{ nome: 'Biscoito triunfo', valor: 10 }],
        });
    });

    it('retorna undefined quando pedido não existe', async () => {
        const dataAccess = new OrderRepositoryMemory();
        const orderCall = new GetOrderUseCase(dataAccess);

        await expect(firstValueFrom(orderCall.execute(999))).resolves.toBeUndefined();
    });
});

describe('Util.includeNineDigit', () => {
    it('inclui o nono dígito em telefones brasileiros sem ele', () => {
        expect(Util.includeNineDigit('551198765432')).toBe('5511998765432');
    });

    it('mantém telefones brasileiros que já possuem nono dígito', () => {
        expect(Util.includeNineDigit('5511998765432')).toBe('5511998765432');
    });
});
