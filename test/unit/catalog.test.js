import {Router} from "react-router-dom";
import {Provider} from "react-redux";

import {cleanup, render, screen} from "@testing-library/react";
import events from "@testing-library/user-event";
import {createMemoryHistory} from "history";

import {basename, renderApp, StubAPi, StubCartApi} from "./utils/renderApp";
import {stubProduct} from "./utils/stubProduct";
import {stubProducts} from "./utils/stubProducts";

import {initStore} from "../../src/client/store";
import {Application} from "../../src/client/Application";

const catalogRoute = {
    route: '/catalog'
}

const catalogRouteString = '/catalog';
const productRouteString = `/catalog/${stubProduct.id}`;

describe('Каталог', () => {
    it('отображаются товары, список которых приходит с свервера', async () => {
        const {api} = renderApp(catalogRoute);
        await api.getProducts();

        stubProducts.forEach((stubProduct) => {
            const product = screen.queryByText(stubProduct.name);
            expect(product).toBeInTheDocument();
        });
    });

    it('для каждого товара отображается название, цена и ссылка на страницу с подробной информацией', async () => {
        const {api} = renderApp(catalogRoute);
        await api.getProducts();

        stubProducts.forEach((stubProduct) => {
            const productName = screen.queryByText(stubProduct.name);
            const productPrice = screen.queryByText('$' + (stubProduct.price).toString());

            const productsLinks = screen.queryAllByText('Details');
            const expectedLink = `/catalog/${stubProduct.id}`;

            expect(productName).toBeInTheDocument();
            expect(productPrice).toBeInTheDocument();
            expect(productsLinks[stubProduct.id]).toHaveAttribute('href', expectedLink);
        });
    });

    it('если товар добавлен в корзину, отображается сообщение об этом', async () => {

        //при вызове метода renderApp() каждый раз создаётся новый store
        //не использую данный метод из utils, потому что надо сохранять общий store

        const api = new StubAPi(stubProducts);
        const cart = new StubCartApi();
        const store = initStore(api, cart);

        const history = createMemoryHistory({initialEntries: [catalogRouteString]});

        const app = (
            <Router basename={basename} history={history}>
                <Provider store={store}>
                    <Application/>
                </Provider>
            </Router>
        )

        render(app);
        await api.getProducts();
        history.push(productRouteString);
        cleanup();

        render(app);
        await api.getProductById();
        const addButton = screen.queryByRole('button', {name: 'Add to Cart'});
        await events.click(addButton);
        history.push(catalogRouteString);
        cleanup();

        render(app);
        const cartBadge = await screen.findByText('Item in cart');
        expect(cartBadge).toBeInTheDocument();
    });
});