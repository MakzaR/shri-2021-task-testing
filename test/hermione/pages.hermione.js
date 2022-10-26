describe('Страницы', async function () {
    describe('Статическое отображение', () => {
        beforeEach(async function () {
            await this.browser.setWindowSize(1920, 1080);
        });

        it('главная страница имеет статическое отображение', async function () {
            await this.browser.url('/hw/store/');
            await this.browser.assertView('staticHome', '.Application', {
                compositeImage: false,
                allowViewportOverflow: true
            });
        });

        it('страница условий доставки имеет статическое отображение', async function () {
            await this.browser.url('/hw/store/delivery');
            await this.browser.assertView('staticDelivery', '.Application', {
                compositeImage: false,
                allowViewportOverflow: true
            });
        });

        it('страница контактов имеет статическое отображение', async function () {
            await this.browser.url('/hw/store/contacts');
            await this.browser.assertView('staticContacts', '.Application', {
                compositeImage: false,
                allowViewportOverflow: true
            });
        });
    });

    describe('Адаптивность', () => {
        beforeEach(async function () {
            await this.browser.setWindowSize(575, 1080);
        });

        it('главная страница адаптируется под ширину экрана', async function () {
            await this.browser.url('/hw/store/');
            await this.browser.assertView('adaptiveHome', '.Application', {
                compositeImage: false,
                allowViewportOverflow: true
            });
        });

        it('страница каталога адаптируется под ширину экрана', async function () {
            await this.browser.url('/hw/store/catalog');
            await this.browser.assertView('adaptiveCatalog', '.Application', {
                compositeImage: false,
                allowViewportOverflow: true,
                ignoreElements: ['.ProductItem-Name', '.ProductItem-Price']
            });
        });

        it('страница условий доставки адаптируется под ширину экрана', async function () {
            await this.browser.url('/hw/store/delivery');
            await this.browser.assertView('adaptiveDelivery', '.Application', {
                compositeImage: false,
                allowViewportOverflow: true
            });
        });

        it('страница контактов адаптируется под ширину экрана', async function () {
            await this.browser.url('/hw/store/contacts');
            await this.browser.assertView('adaptiveContacts', '.Application', {
                compositeImage: false,
                allowViewportOverflow: true
            });
        });

        it('страница корзины адаптируется под ширину экрана', async function () {
            await this.browser.url('/hw/store/cart');
            await this.browser.assertView('adaptiveCart', '.Application', {
                compositeImage: false,
                allowViewportOverflow: true
            });
        });
    });
});