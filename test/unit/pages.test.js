import {renderApp} from "./utils/renderApp";

describe('Страницы', () => {
    it('в магазине есть главная страница', () => {
        const {container} = renderApp();
        const homeComponent = container.querySelector('.Home');
        expect(homeComponent).toBeInTheDocument();
    });

    it('в магазине есть страница каталога', () => {
        const {container} = renderApp({route: "/catalog"});
        const catalogComponent = container.querySelector('.Catalog');
        expect(catalogComponent).toBeInTheDocument();
    });

    it('в магазине есть страница условий доставки', () => {
        const {container} = renderApp({route: "/delivery"});
        const deliveryComponent = container.querySelector('.Delivery');
        expect(deliveryComponent).toBeInTheDocument();
    });

    it('в магазине есть страница контактов', () => {
        const {container} = renderApp({route: "/contacts"});
        const contactsComponent = container.querySelector('.Contacts');
        expect(contactsComponent).toBeInTheDocument();
    });
});