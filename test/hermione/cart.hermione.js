describe('Корзина', () => {
    it('содержимое корзины сохраняется между перезагрузками страницы', async function () {
        await this.browser.setWindowSize(1920, 1080);

        await this.browser.url('/hw/store/catalog/0');
        await this.browser.$('.Product button').click();

        await this.browser.url('/hw/store/cart');

        await this.browser.assertView('cartBeforeRefresh', '.Application', {
            compositeImage: false,
            allowViewportOverflow: true,
            ignoreElements: ['thead', 'tbody', 'tfoot']
        });

        this.browser.refresh();

        await this.browser.assertView('cartAfterRefresh', '.Application', {
            compositeImage: false,
            allowViewportOverflow: true,
            ignoreElements: ['thead', 'tbody', 'tfoot']
        });

        await this.browser.$('.Cart-Clear').click();
    });
});