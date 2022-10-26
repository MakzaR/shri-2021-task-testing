import {renderApp} from "./utils/renderApp";
import {screen} from "@testing-library/react";
import events from "@testing-library/user-event";

describe('Шапка', () => {
    it('при рендере приложения отображается шапка', () => {
        const {container} = renderApp();
        const navbar = container.querySelector('.navbar');
        expect(navbar).toBeInTheDocument();
    })

    describe('В шапке отображаются ссылки на страницы магазина и корзину', () => {
        it('количество ссылок в шапке равно 5', () => {
            renderApp();
            const links = screen.queryAllByRole('link');
            expect(links.length).toBe(5);
        });

        it('отображается ссылка на главную страницу', () => {
            renderApp();
            const homeLink = screen.queryByRole('link', {name: 'Example store'});
            expect(homeLink).toBeInTheDocument();
        });

        it('отображается ссылка на страницу каталога', () => {
            renderApp();
            const catalogLink = screen.queryByRole('link', {name: 'Catalog'});
            expect(catalogLink).toBeInTheDocument();
        });

        it('отображается ссылка на страницу доставки', () => {
            renderApp();
            const deliveryLink = screen.queryByRole('link', {name: 'Delivery'});
            expect(deliveryLink).toBeInTheDocument();
        });

        it('отображается ссылка на страницу контактов', () => {
            renderApp();
            const contactsLink = screen.queryByRole('link', {name: 'Contacts'});
            expect(contactsLink).toBeInTheDocument();
        });

        it('отображается ссылка на страницу корзины', () => {
            renderApp();
            const cartLink = screen.queryByRole('link', {name: 'Cart'});
            expect(cartLink).toBeInTheDocument();
        });
    });

    it('название магазина в шапке является ссылкой на главную страницу', () => {
        renderApp();
        const appBrand =  screen.queryByRole('link', {name: 'Example store'});
        expect(appBrand).toHaveAttribute('href', '/');
    });

    it('при выборе элемента из меню "гамбургера", меню закрывается', async () => {
        const {container} = renderApp();

        const navBarToggler = container.querySelector('.navbar-toggler');
        const menu = container.querySelector('.navbar-collapse');
        const catalogLink = screen.queryByRole('link', {name: 'Catalog'});

        await events.click(navBarToggler);
        await events.click(catalogLink);

        expect(menu.classList).toContain('collapse');
    });
});