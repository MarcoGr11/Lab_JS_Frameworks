/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models */ \"./src/models/index.ts\");\n/* harmony import */ var _services_Storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/Storage */ \"./src/services/Storage.ts\");\n/* harmony import */ var _services_Library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/Library */ \"./src/services/Library.ts\");\n/* harmony import */ var _services_BorrowService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/BorrowService */ \"./src/services/BorrowService.ts\");\n/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/validation */ \"./src/utils/validation.ts\");\nvar _a;\n\n\n\n\n\n/* ======================== Persist ======================== */\nconst booksStore = new _services_Storage__WEBPACK_IMPORTED_MODULE_1__.Storage('lab3_books');\nconst usersStore = new _services_Storage__WEBPACK_IMPORTED_MODULE_1__.Storage('lab3_users');\nconst borrowMapStore = new _services_Storage__WEBPACK_IMPORTED_MODULE_1__.Storage('lab3_borrow_map'); // {[bookId]: userId}\nconst booksLib = new _services_Library__WEBPACK_IMPORTED_MODULE_2__.Library(booksStore.load([]));\nconst usersLib = new _services_Library__WEBPACK_IMPORTED_MODULE_2__.Library(usersStore.load([]));\nlet borrowMap = borrowMapStore.load({});\nconst borrowSvc = new _services_BorrowService__WEBPACK_IMPORTED_MODULE_3__.BorrowService(booksLib.all(), usersLib.all());\n/* ======================== DOM ======================== */\nconst alerts = document.getElementById('alerts');\n// Books\nconst bookForm = document.getElementById('book-form');\nconst bookTitle = document.getElementById('book-title');\nconst bookAuthor = document.getElementById('book-author');\nconst bookYear = document.getElementById('book-year');\nconst bookSearch = document.getElementById('book-search');\nconst booksTbody = document.getElementById('books-tbody');\nconst booksPagination = document.getElementById('books-pagination');\nconst booksCounter = document.getElementById('books-counter');\n// Users\nconst userForm = document.getElementById('user-form');\nconst userId = document.getElementById('user-id');\nconst userName = document.getElementById('user-name');\nconst userEmail = document.getElementById('user-email');\nconst usersTbody = document.getElementById('users-tbody');\n// Borrow\nconst borrowUser = document.getElementById('borrow-user');\nconst borrowBook = document.getElementById('borrow-book');\nconst borrowTbody = document.getElementById('borrow-tbody');\n// Reset all\nconst resetAllBtn = document.getElementById('reset-all');\n/* ======================== Utils ======================== */\nfunction notify(msg, type = 'info') {\n    if (!alerts)\n        return alert(msg);\n    const el = document.createElement('div');\n    el.className = `alert alert-${type}`;\n    el.textContent = msg;\n    alerts.prepend(el);\n    setTimeout(() => el.remove(), 2500);\n}\nfunction persistAll() {\n    booksStore.save(booksLib.all());\n    usersStore.save(usersLib.all());\n    borrowMapStore.save(borrowMap);\n}\n/* ======================== Renders ======================== */\nlet page = 1;\nconst pageSize = 5;\nfunction filteredBooks() {\n    const q = ((bookSearch === null || bookSearch === void 0 ? void 0 : bookSearch.value) || '').toLowerCase();\n    if (!q)\n        return booksLib.all();\n    return booksLib.search((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));\n}\nfunction renderBooks() {\n    const list = filteredBooks();\n    const total = list.length;\n    const pages = Math.max(1, Math.ceil(total / pageSize));\n    if (page > pages)\n        page = pages;\n    const slice = list.slice((page - 1) * pageSize, page * pageSize);\n    booksTbody.innerHTML = slice\n        .map((b, i) => `\r\n      <tr>\r\n        <td>${(page - 1) * pageSize + i + 1}</td>\r\n        <td>${b.title}</td>\r\n        <td>${b.author}</td>\r\n        <td>${b.year}</td>\r\n        <td>${b.isBorrowed\n        ? '<span class=\"badge bg-warning\">Позичено</span>'\n        : '<span class=\"badge bg-success\">Доступна</span>'}</td>\r\n        <td class=\"text-end\">\r\n          ${b.isBorrowed\n        ? `<button class=\"btn btn-sm btn-outline-primary me-2\" data-action=\"return\" data-id=\"${b.id}\">Повернути</button>`\n        : `<button class=\"btn btn-sm btn-outline-primary me-2\" data-action=\"borrow\" data-id=\"${b.id}\">Позичити</button>`}\r\n          <button class=\"btn btn-sm btn-outline-danger\" data-action=\"delete-book\" data-id=\"${b.id}\">Видалити</button>\r\n        </td>\r\n      </tr>`)\n        .join('');\n    // paginator\n    booksPagination.innerHTML = '';\n    for (let i = 1; i <= pages; i++) {\n        const li = document.createElement('li');\n        li.className = 'page-item' + (i === page ? ' active' : '');\n        li.innerHTML = `<a class=\"page-link\" href=\"#\">${i}</a>`;\n        li.addEventListener('click', (e) => {\n            e.preventDefault();\n            page = i;\n            renderBooks();\n        });\n        booksPagination.appendChild(li);\n    }\n    booksCounter.textContent = `Всього книг: ${total}`;\n}\nfunction renderUsers() {\n    usersTbody.innerHTML = usersLib\n        .all()\n        .map((u, idx) => `\r\n      <tr>\r\n        <td>${idx + 1}</td>\r\n        <td>${u.name}</td>\r\n        <td>${u.email}</td>\r\n        <td>${u.borrowedCount}</td>\r\n        <td class=\"text-end\">\r\n          <button class=\"btn btn-sm btn-outline-danger\" data-action=\"delete-user\" data-id=\"${u.id}\">Видалити</button>\r\n        </td>\r\n      </tr>`)\n        .join('');\n}\nfunction renderBorrowControls() {\n    borrowUser.innerHTML = usersLib\n        .all()\n        .map((u) => `<option value=\"${u.id}\">${u.name} (#${u.id})</option>`)\n        .join('');\n    borrowBook.innerHTML = booksLib\n        .all()\n        .filter((b) => !b.isBorrowed)\n        .map((b) => `<option value=\"${b.id}\">${b.title} — ${b.author}</option>`)\n        .join('');\n}\nfunction renderBorrowTable() {\n    const rows = Object.entries(borrowMap)\n        .map(([bookId, userId], idx) => {\n        const book = booksLib.findById(bookId);\n        const user = usersLib.findById(userId);\n        if (!book || !user)\n            return '';\n        return `\r\n        <tr>\r\n          <td>${idx + 1}</td>\r\n          <td>${book.title} — ${book.author}</td>\r\n          <td>${user.name} (#${userId})</td>\r\n          <td><span class=\"badge bg-warning\">Позичено</span></td>\r\n          <td class=\"text-end\">\r\n            <button class=\"btn btn-sm btn-outline-primary\" data-action=\"return\" data-id=\"${bookId}\">Повернути</button>\r\n          </td>\r\n        </tr>`;\n    })\n        .join('');\n    borrowTbody.innerHTML =\n        rows || `<tr><td colspan=\"5\" class=\"text-center text-muted\">Немає активних позичань</td></tr>`;\n}\n/* ======================== Events: Books ======================== */\nbookForm === null || bookForm === void 0 ? void 0 : bookForm.addEventListener('submit', (e) => {\n    e.preventDefault();\n    const title = bookTitle.value.trim();\n    const author = bookAuthor.value.trim();\n    const yearStr = bookYear.value.trim();\n    if (!(0,_utils_validation__WEBPACK_IMPORTED_MODULE_4__.notEmpty)(title) || !(0,_utils_validation__WEBPACK_IMPORTED_MODULE_4__.notEmpty)(author)) {\n        notify('Назва та Автор обовʼязкові', 'warning');\n        return;\n    }\n    if (!(0,_utils_validation__WEBPACK_IMPORTED_MODULE_4__.isYear)(yearStr)) {\n        notify('Рік: формат YYYY', 'warning');\n        return;\n    }\n    const id = 'b_' + crypto.randomUUID();\n    booksLib.add(new _models__WEBPACK_IMPORTED_MODULE_0__.Book(id, title, author, parseInt(yearStr, 10), false));\n    persistAll();\n    bookForm.reset();\n    notify('Книгу додано', 'success');\n    renderBooks();\n    renderBorrowControls();\n});\nbookSearch === null || bookSearch === void 0 ? void 0 : bookSearch.addEventListener('input', () => {\n    page = 1;\n    renderBooks();\n});\nbooksTbody === null || booksTbody === void 0 ? void 0 : booksTbody.addEventListener('click', (e) => {\n    var _a, _b, _c;\n    const btn = e.target.closest('button');\n    if (!btn)\n        return;\n    const action = btn.getAttribute('data-action');\n    const id = btn.getAttribute('data-id');\n    const book = booksLib.findById(id);\n    if (!book)\n        return;\n    if (action === 'delete-book') {\n        const uid = borrowMap[id];\n        if (uid != null) {\n            borrowSvc.returnBook(id, uid);\n            delete borrowMap[id];\n        }\n        booksLib.remove(id);\n        persistAll();\n        notify('Книгу видалено', 'success');\n        renderBooks();\n        renderBorrowControls();\n        renderBorrowTable();\n    }\n    if (action === 'borrow') {\n        const uid = (borrowUser === null || borrowUser === void 0 ? void 0 : borrowUser.value) || ((_a = usersLib.all()[0]) === null || _a === void 0 ? void 0 : _a.id);\n        if (!uid) {\n            notify('Додайте користувача', 'warning');\n            return;\n        }\n        const msg = borrowSvc.borrow(id, uid);\n        if (msg.toLowerCase().includes('успіш')) {\n            const user = usersLib.findById(uid);\n            borrowMap[id] = uid;\n            persistAll();\n            notify(msg, 'success');\n            renderBooks();\n            renderBorrowControls();\n            renderBorrowTable();\n            renderUsers();\n        }\n        else {\n            notify(msg, 'warning');\n        }\n    }\n    if (action === 'return') {\n        const uid = (_b = borrowMap[id]) !== null && _b !== void 0 ? _b : (_c = usersLib.all()[0]) === null || _c === void 0 ? void 0 : _c.id;\n        if (!uid)\n            return;\n        const msg = borrowSvc.returnBook(id, uid);\n        const user = usersLib.findById(uid);\n        if (user)\n            user.borrowedCount = Math.max(0, user.borrowedCount - 1);\n        delete borrowMap[id];\n        persistAll();\n        notify(msg, 'success');\n        renderBooks();\n        renderBorrowControls();\n        renderBorrowTable();\n        renderUsers();\n    }\n});\n/* ======================== Events: Users ======================== */\nuserForm === null || userForm === void 0 ? void 0 : userForm.addEventListener('submit', (e) => {\n    e.preventDefault();\n    // якщо в макеті є поле ID — беремо його, інакше генеруємо\n    let id = ((userId === null || userId === void 0 ? void 0 : userId.value.trim()) || '').toString();\n    id = id ? (id.startsWith('u_') ? id : `u_${id}`) : `u_${Date.now()}`;\n    const name = userName.value.trim();\n    const email = userEmail.value.trim();\n    if (!(0,_utils_validation__WEBPACK_IMPORTED_MODULE_4__.notEmpty)(name) || !(0,_utils_validation__WEBPACK_IMPORTED_MODULE_4__.notEmpty)(email)) {\n        notify('Імʼя та Email — обовʼязкові', 'warning');\n        return;\n    }\n    if (usersLib.findById(id)) {\n        notify('Користувач з таким ID вже існує', 'warning');\n        return;\n    }\n    usersLib.add(new _models__WEBPACK_IMPORTED_MODULE_0__.User(id, name, email, 0));\n    persistAll();\n    userForm.reset();\n    notify('Користувача додано', 'success');\n    renderUsers();\n    renderBorrowControls();\n});\nusersTbody === null || usersTbody === void 0 ? void 0 : usersTbody.addEventListener('click', (e) => {\n    const btn = e.target.closest('button');\n    if (!btn)\n        return;\n    const action = btn.getAttribute('data-action');\n    const id = btn.getAttribute('data-id');\n    if (action === 'delete-user') {\n        Object.entries(borrowMap).forEach(([bookId, userId]) => {\n            if (userId === id) {\n                borrowSvc.returnBook(bookId, id);\n                delete borrowMap[bookId];\n            }\n        });\n        usersLib.remove(id);\n        persistAll();\n        notify('Користувача видалено', 'success');\n        renderUsers();\n        renderBorrowControls();\n        renderBooks();\n        renderBorrowTable();\n    }\n});\n/* ======================== Events: Borrow tab ======================== */\n// Делегуємо клік від контейнера вкладки, щоб не залежати від моменту монтажу кнопки\n(_a = document.getElementById('borrow')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {\n    const btn = e.target.closest('#borrow-btn');\n    if (!btn)\n        return;\n    const uid = document.getElementById('borrow-user')\n        .value; // string\n    const bid = document.getElementById('borrow-book')\n        .value;\n    const user = usersLib.findById(uid);\n    const book = booksLib.findById(bid);\n    if (!user || !book) {\n        notify('Оберіть користувача і книгу', 'warning');\n        return;\n    }\n    if (user.borrowedCount >= _services_BorrowService__WEBPACK_IMPORTED_MODULE_3__.BorrowService.MAX_PER_USER) {\n        notify('Ліміт 3 книги перевищено', 'warning');\n        return;\n    }\n    if (book.isBorrowed) {\n        notify('Книга вже позичена', 'warning');\n        return;\n    }\n    const msg = borrowSvc.borrow(bid, uid);\n    if (msg.toLowerCase().includes('успіш')) {\n        borrowMap[bid] = uid;\n        persistAll();\n        notify(msg, 'success');\n        renderBooks();\n        renderBorrowControls();\n        renderBorrowTable();\n        renderUsers();\n    }\n    else {\n        notify(msg, 'warning');\n    }\n});\n/* ======================== Reset all ======================== */\nresetAllBtn === null || resetAllBtn === void 0 ? void 0 : resetAllBtn.addEventListener('click', () => {\n    if (!confirm('Видалити всі книги, користувачів і позичання?'))\n        return;\n    booksLib.setAll([]);\n    usersLib.setAll([]);\n    borrowMap = {};\n    persistAll();\n    notify('Дані очищено', 'success');\n    renderBooks();\n    renderUsers();\n    renderBorrowControls();\n    renderBorrowTable();\n});\n/* ======================== First render ======================== */\nrenderBooks();\nrenderUsers();\nrenderBorrowControls();\nrenderBorrowTable();\n\n\n//# sourceURL=webpack://lab-app/./src/index.ts?\n}");

/***/ }),

/***/ "./src/models/Book.ts":
/*!****************************!*\
  !*** ./src/models/Book.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Book: () => (/* binding */ Book)\n/* harmony export */ });\nclass Book {\n    constructor(id, title, author, year, isBorrowed = false) {\n        this.id = id;\n        this.title = title;\n        this.author = author;\n        this.year = year;\n        this.isBorrowed = isBorrowed;\n    }\n    borrow() { this.isBorrowed = true; }\n    returnBack() { this.isBorrowed = false; }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/models/Book.ts?\n}");

/***/ }),

/***/ "./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\nclass User {\n    constructor(id, name, email, borrowedCount = 0) {\n        this.id = id;\n        this.name = name;\n        this.email = email;\n        this.borrowedCount = borrowedCount;\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/models/User.ts?\n}");

/***/ }),

/***/ "./src/models/index.ts":
/*!*****************************!*\
  !*** ./src/models/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Book: () => (/* reexport safe */ _Book__WEBPACK_IMPORTED_MODULE_0__.Book),\n/* harmony export */   User: () => (/* reexport safe */ _User__WEBPACK_IMPORTED_MODULE_1__.User)\n/* harmony export */ });\n/* harmony import */ var _Book__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Book */ \"./src/models/Book.ts\");\n/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./User */ \"./src/models/User.ts\");\n\n\n\n\n//# sourceURL=webpack://lab-app/./src/models/index.ts?\n}");

/***/ }),

/***/ "./src/services/BorrowService.ts":
/*!***************************************!*\
  !*** ./src/services/BorrowService.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BorrowService: () => (/* binding */ BorrowService)\n/* harmony export */ });\nclass BorrowService {\n    constructor(books, users) {\n        this.books = books;\n        this.users = users;\n    }\n    borrow(bookId, userId) {\n        const book = this.books.find(b => b.id === bookId);\n        const user = this.users.find(u => u.id === userId);\n        if (!book || !user)\n            return 'Книга або користувач не знайдені';\n        if (book.isBorrowed)\n            return 'Книга вже позичена';\n        if (user.borrowedCount >= BorrowService.MAX_PER_USER) {\n            return 'Користувач досяг ліміту у 3 книги';\n        }\n        book.borrow();\n        user.borrowedCount += 1;\n        return 'Книгу успішно позичено';\n    }\n    returnBook(bookId, userId) {\n        const book = this.books.find(b => b.id === bookId);\n        const user = this.users.find(u => u.id === userId);\n        if (!book || !user)\n            return 'Книга або користувач не знайдені';\n        if (!book.isBorrowed)\n            return 'Книга вже повернута';\n        book.returnBack();\n        user.borrowedCount = Math.max(0, user.borrowedCount - 1);\n        return 'Книгу повернуто';\n    }\n}\nBorrowService.MAX_PER_USER = 3;\n\n\n//# sourceURL=webpack://lab-app/./src/services/BorrowService.ts?\n}");

/***/ }),

/***/ "./src/services/Library.ts":
/*!*********************************!*\
  !*** ./src/services/Library.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Library: () => (/* binding */ Library)\n/* harmony export */ });\n// src/services/Library.ts\nclass Library {\n    constructor(initial = []) {\n        this.items = [];\n        this.items = initial;\n    }\n    all() {\n        return this.items;\n    }\n    add(item) {\n        this.items.push(item);\n    }\n    remove(id) {\n        this.items = this.items.filter(i => i.id !== id);\n    }\n    findById(id) {\n        return this.items.find(i => i.id === id);\n    }\n    search(predicate) {\n        return this.items.filter(predicate);\n    }\n    setAll(items) {\n        this.items = items;\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/services/Library.ts?\n}");

/***/ }),

/***/ "./src/services/Storage.ts":
/*!*********************************!*\
  !*** ./src/services/Storage.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Storage: () => (/* binding */ Storage)\n/* harmony export */ });\nclass Storage {\n    constructor(key) {\n        this.key = key;\n    }\n    load(fallback) {\n        const raw = localStorage.getItem(this.key);\n        return raw ? JSON.parse(raw) : fallback;\n    }\n    save(data) {\n        localStorage.setItem(this.key, JSON.stringify(data));\n    }\n    clear() {\n        localStorage.removeItem(this.key);\n    }\n}\n\n\n//# sourceURL=webpack://lab-app/./src/services/Storage.ts?\n}");

/***/ }),

/***/ "./src/utils/validation.ts":
/*!*********************************!*\
  !*** ./src/utils/validation.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isNumericId: () => (/* binding */ isNumericId),\n/* harmony export */   isYear: () => (/* binding */ isYear),\n/* harmony export */   notEmpty: () => (/* binding */ notEmpty)\n/* harmony export */ });\nconst isYear = (v) => /^(18\\d{2}|19\\d{2}|20\\d{2}|2100)$/.test(v);\nconst isNumericId = (v) => /^\\d+$/.test(v);\nconst notEmpty = (v) => v.trim().length > 0;\n\n\n//# sourceURL=webpack://lab-app/./src/utils/validation.ts?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;