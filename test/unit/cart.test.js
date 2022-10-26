import {screen} from "@testing-library/react";
import events from "@testing-library/user-event";
import {renderApp} from "./utils/renderApp";
import {stubCartProducts} from "./utils/stubCartProducts";

const cartRoute = {
    route: '/cart'
}

const cartAppParams = {
    stubCart: true,
    ...cartRoute
}

describe('Корзина', () => {
    it('в шапке отображается количество не повторяющихся элементов в корзине', async () => {
        renderApp(cartAppParams);
        const cartCount = await screen.findByRole('link', {name: `Cart (${stubCartProducts.length})`})
        expect(cartCount).toBeInTheDocument();
    });

    it('отображается таблица с добавленными товарами', () => {
        const {container} = renderApp(cartAppParams);
        const cartTable = container.querySelector('.Cart-Table');
        expect(cartTable).toBeInTheDocument();
    });

    it('для каждого товара отображается название, цена, количество, стоимость', () => {
        const {container, store} = renderApp(cartAppParams);
        const tableBody = container.querySelector('.Cart-Table tbody');
        const rows = tableBody.children;
        const cart = store.getState().cart;

        for (let i = 0; i < stubCartProducts.length; ++i) {
            const row = rows[i];
            const currentProduct = cart[(stubCartProducts[i].id).toString()];

            const expectedString = [
                `${i + 1}`,
                `${currentProduct.name}`,
                `$${currentProduct.price}`,
                `${currentProduct.count}`,
                `$${currentProduct.count * currentProduct.price}`
            ].join('');

            expect(row).toBeTruthy();
            expect(row).toHaveTextContent(expectedString);
        }
    });

    it('отображается общая сумма заказа', () => {
        renderApp(cartAppParams);

        let expectedOrderPrice = 0;
        for (const stubProduct of stubCartProducts) {
            expectedOrderPrice += stubProduct.count * stubProduct.price;
        }

        const orderPrice = screen.queryByText('$' + expectedOrderPrice.toString());

        expect(orderPrice).toBeInTheDocument();
    });

    it('отображается кнопка "очистить корзину"', () => {
        renderApp(cartAppParams);
        const clearButton = screen.queryByRole('button', {name: 'Clear shopping cart'});
        expect(clearButton).toBeInTheDocument();
    });

    it('при нажатии на кнопку "очистить корзину" все товары удаляются', async () => {
        const {store, container} = renderApp(cartAppParams);

        const clearButton = screen.queryByRole('button', {name: 'Clear shopping cart'});
        const cartTable = container.querySelector('.Cart-Table');
        await events.click(clearButton);

        expect(cartTable).not.toBeInTheDocument();
        expect(store.getState().cart).toEqual({});
    });

    it('если корзина пустая, отображается ссылка на катлог товаров', () => {
        renderApp(cartRoute);
        const catalogLink = screen.queryByRole('link', {name: 'catalog'});
        expect(catalogLink).toBeInTheDocument();
    });
});