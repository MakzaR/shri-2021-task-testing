# Запуск и тестирование

Задание выполнено на NodeJS 14.20.1 и ОС Ubuntu 22.04. 

Запуск подразумевает наличие глобально установленного `selenium-standalone`.

Процесс запуска тестов: <br>
1. `npm install`
2. `npm run build`
3. В отдельном терминале `npm start`
4. Для запуска unit-тестов `npm test`
5. Для первого запуска hermione `npm run e2e:first`
6. Для повторных запусков `npm run e2e`

# Домашнее задание ШРИ: Автотесты

Вам дано приложение — интернет магазин. С его помощью можно смотреть каталог товаров, добавлять товары в корзину и оформлять заказы.

Вам нужно написать автотесты: модульные и интеграционные. Главный критерий проверки — автотесты должны находить баги.

## Функциональные требования

**Общие требования:**
- вёрстка должна адаптироваться под ширину экрана
- в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину
- название магазина в шапке должно быть ссылкой на главную страницу
- на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"
  - при выборе элемента из меню "гамбургера", меню должно закрываться

**Страницы:**
- в магазине должны быть страницы: главная, каталог, условия доставки, контакты
- страницы главная, условия доставки, контакты должны иметь статическое содержимое

**Каталог:**
- в каталоге должны отображаться товары, список которых приходит с сервера
- для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре
- на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"
- если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом
- если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество
- содержимое корзины должно сохраняться между перезагрузками страницы

**Корзина:**
- в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней
- в корзине должна отображаться таблица с добавленными в нее товарами
- для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа
- в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться
- если корзина пустая, должна отображаться ссылка на каталог товаров

## Выполнение задания

Форкните этот репозиторий, добавьте модульные и интеграционные тесты в папку `test` и отправьте репозиторий на проверку через личный кабинет.

Интеграционные тесты можно запускать на уже развернутом приложении: https://shri.yandex/hw/store

**Внимание!** Содержимое папки `src` менять нельзя!

## Как происходит проверка

Ваши тесты будут запускаться на нескольких версиях приложения, каждая из которых содержит определенный баг. Чтобы пройти проверку, ваши тесты должны обнаружить этот баг. При этом на каждом запуске должно упасть не больше трех тестов. На разных багах должны падать разные тесты.
