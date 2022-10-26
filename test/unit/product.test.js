import {screen} from "@testing-library/react";
import events from "@testing-library/user-event";

import {renderApp} from "./utils/renderApp";
import {stubProduct} from "./utils/stubProduct";

const productRoute = {
    route: `/catalog/${stubProduct.id}`
}

describe('Страница товара', () => {
    it('оторбажаются название товара, описание, цена, цвет, материал и кнопка "добавить в корзину"', async () => {
        const {api} = renderApp(productRoute);
        await api.getProductById();

        const productName = screen.queryByText(stubProduct.name);
        const productDescription = screen.queryByText(stubProduct.description);
        const productPrice = screen.queryByText('$' + (stubProduct.price).toString());
        const productColor = screen.queryByText(stubProduct.color);
        const productMaterial = screen.queryByText(stubProduct.material);

        const addButton = screen.queryByRole('button', {name: 'Add to Cart'});

        expect(productName).toBeInTheDocument();
        expect(productDescription).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
        expect(productColor).toBeInTheDocument();
        expect(productMaterial).toBeInTheDocument();

        expect(addButton).toBeInTheDocument();
    });

    it('если товар добавлен в корзину, отображается сообщение об этом', async () => {
        const {api} = renderApp(productRoute)
        await api.getProductById();

        const addButton = screen.queryByRole('button', {name: 'Add to Cart'});
        await events.click(addButton);

        const cartBadge = screen.queryByText('Item in cart');

        expect(cartBadge).toBeInTheDocument();
    });

    it('когда товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" увеличивает его количество', async () => {
        const {store, api} = renderApp(productRoute);
        await api.getProductById();

        const addButton = screen.queryByRole('button', {name: 'Add to Cart'});
        await events.click(addButton);
        await events.click(addButton);

        const cart = store.getState().cart;
        const productCount = cart[(stubProduct.id).toString()].count;

        expect(productCount).toBe(2);
    });
});