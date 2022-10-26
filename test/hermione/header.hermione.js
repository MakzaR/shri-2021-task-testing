describe('Навигационное меню', () => {
    it('при ширине меньше 576px навигационное меню скрывается за гамбургер', async function () {
        await this.browser.setWindowSize(575, 1080);
        await this.browser.url('/hw/store/');
        await this.browser.assertView('burgerMenu', '.navbar-toggler', {
            compositeImage: false,
            allowViewportOverflow: true
        });
    });
});