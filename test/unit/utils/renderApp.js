import {Router} from "react-router-dom";
import {Provider} from "react-redux";

import {render} from "@testing-library/react";
import {createMemoryHistory} from "history";

import {initStore} from "../../../src/client/store";
import {Application} from "../../../src/client/Application";

import {stubProducts} from "./stubProducts";
import {stubCartProducts} from "./stubCartProducts";
import {stubProduct} from "./stubProduct";

export const basename = '/hw/store';

export class StubAPi {
    constructor(products) {
        this.products = products;
    }

    async getProducts() {
        return {data: this.products};
    }

    async getProductById() {
        return {data: stubProduct};
    }
}

export class StubCartApi {
    constructor() {
        this.state = {};
    }

    getState() {
        return this.state;
    }

    setState(cart) {
        this.state = cart;
    }
}

export const renderApp = ({route = '/', stubCart = false} = {}) => {
    const api = new StubAPi(stubProducts);
    const cart = new StubCartApi();

    if (stubCart) {
        cart.getState = jest.fn().mockReturnValueOnce(stubCartProducts);
    }

    const store = initStore(api, cart);

    const history = createMemoryHistory({initialEntries: [route]});

    const app = (
        <Router basename={basename} history={history}>
            <Provider store={store}>
                <Application/>
            </Provider>
        </Router>
    )

    return {...render(app), history, store, api};
}