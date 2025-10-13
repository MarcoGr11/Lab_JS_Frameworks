import { Book, User } from './models';
import { Storage } from './services/Storage';
import { Library } from './services/Library';
import { BorrowService } from './services/BorrowService';
import { isYear, notEmpty } from './utils/validation';

/* ======================== Persist ======================== */
const booksStore = new Storage('lab3_books');
const usersStore = new Storage('lab3_users');
const borrowMapStore = new Storage('lab3_borrow_map'); // {[bookId]: userId}

const booksLib = new Library<Book>(booksStore.load<Book[]>([]));
const usersLib = new Library<User>(usersStore.load<User[]>([]));
let borrowMap: Record<string, string> =
    borrowMapStore.load<Record<string, string>>({});

const borrowSvc = new BorrowService(booksLib.all(), usersLib.all());

/* ======================== DOM ======================== */
const alerts = document.getElementById('alerts') as HTMLElement;

// Books
const bookForm = document.getElementById('book-form') as HTMLFormElement;
const bookTitle = document.getElementById('book-title') as HTMLInputElement;
const bookAuthor = document.getElementById('book-author') as HTMLInputElement;
const bookYear = document.getElementById('book-year') as HTMLInputElement;
const bookSearch = document.getElementById('book-search') as HTMLInputElement;
const booksTbody = document.getElementById('books-tbody') as HTMLElement;
const booksPagination = document.getElementById('books-pagination') as HTMLElement;
const booksCounter = document.getElementById('books-counter') as HTMLElement;

// Users
const userForm = document.getElementById('user-form') as HTMLFormElement;
const userId = document.getElementById('user-id') as HTMLInputElement | null;
const userName = document.getElementById('user-name') as HTMLInputElement;
const userEmail = document.getElementById('user-email') as HTMLInputElement;
const usersTbody = document.getElementById('users-tbody') as HTMLElement;

// Borrow
const borrowUser = document.getElementById('borrow-user') as HTMLSelectElement;
const borrowBook = document.getElementById('borrow-book') as HTMLSelectElement;
const borrowTbody = document.getElementById('borrow-tbody') as HTMLElement;

// Reset all
const resetAllBtn = document.getElementById('reset-all') as HTMLButtonElement;

/* ======================== Utils ======================== */
function notify(
    msg: string,
    type: 'success' | 'danger' | 'warning' | 'info' = 'info'
) {
    if (!alerts) return alert(msg);
    const el = document.createElement('div');
    el.className = `alert alert-${type}`;
    el.textContent = msg;
    alerts.prepend(el);
    setTimeout(() => el.remove(), 2500);
}

function persistAll() {
    booksStore.save(booksLib.all());
    usersStore.save(usersLib.all());
    borrowMapStore.save(borrowMap);
}

/* ======================== Renders ======================== */
let page = 1;
const pageSize = 5;

function filteredBooks(): Book[] {
    const q = (bookSearch?.value || '').toLowerCase();
    if (!q) return booksLib.all();
    return booksLib.search(
        (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
}

function renderBooks() {
    const list = filteredBooks();
    const total = list.length;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    if (page > pages) page = pages;

    const slice = list.slice((page - 1) * pageSize, page * pageSize);
    booksTbody.innerHTML = slice
        .map(
            (b, i) => `
      <tr>
        <td>${(page - 1) * pageSize + i + 1}</td>
        <td>${b.title}</td>
        <td>${b.author}</td>
        <td>${b.year}</td>
        <td>${
                b.isBorrowed
                    ? '<span class="badge bg-warning">Позичено</span>'
                    : '<span class="badge bg-success">Доступна</span>'
            }</td>
        <td class="text-end">
          ${
                b.isBorrowed
                    ? `<button class="btn btn-sm btn-outline-primary me-2" data-action="return" data-id="${b.id}">Повернути</button>`
                    : `<button class="btn btn-sm btn-outline-primary me-2" data-action="borrow" data-id="${b.id}">Позичити</button>`
            }
          <button class="btn btn-sm btn-outline-danger" data-action="delete-book" data-id="${b.id}">Видалити</button>
        </td>
      </tr>`
        )
        .join('');

    // paginator
    booksPagination.innerHTML = '';
    for (let i = 1; i <= pages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item' + (i === page ? ' active' : '');
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener('click', (e) => {
            e.preventDefault();
            page = i;
            renderBooks();
        });
        booksPagination.appendChild(li);
    }

    booksCounter.textContent = `Всього книг: ${total}`;
}

function renderUsers() {
    usersTbody.innerHTML = usersLib
        .all()
        .map(
            (u, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.borrowedCount}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-danger" data-action="delete-user" data-id="${u.id}">Видалити</button>
        </td>
      </tr>`
        )
        .join('');
}

function renderBorrowControls() {
    borrowUser.innerHTML = usersLib
        .all()
        .map((u) => `<option value="${u.id}">${u.name} (#${u.id})</option>`)
        .join('');

    borrowBook.innerHTML = booksLib
        .all()
        .filter((b) => !b.isBorrowed)
        .map((b) => `<option value="${b.id}">${b.title} — ${b.author}</option>`)
        .join('');
}

function renderBorrowTable() {
    const rows = Object.entries(borrowMap)
        .map(([bookId, userId], idx) => {
            const book = booksLib.findById(bookId);
            const user = usersLib.findById(userId);
            if (!book || !user) return '';
            return `
        <tr>
          <td>${idx + 1}</td>
          <td>${book.title} — ${book.author}</td>
          <td>${user.name} (#${userId})</td>
          <td><span class="badge bg-warning">Позичено</span></td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-primary" data-action="return" data-id="${bookId}">Повернути</button>
          </td>
        </tr>`;
        })
        .join('');

    borrowTbody.innerHTML =
        rows || `<tr><td colspan="5" class="text-center text-muted">Немає активних позичань</td></tr>`;
}

/* ======================== Events: Books ======================== */
bookForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();
    const yearStr = bookYear.value.trim();

    if (!notEmpty(title) || !notEmpty(author)) {
        notify('Назва та Автор обовʼязкові', 'warning');
        return;
    }
    if (!isYear(yearStr)) {
        notify('Рік: формат YYYY', 'warning');
        return;
    }

    const id = 'b_' + crypto.randomUUID();
    booksLib.add(new Book(id, title, author, parseInt(yearStr, 10), false));
    persistAll();
    bookForm.reset();
    notify('Книгу додано', 'success');
    renderBooks();
    renderBorrowControls();
});

bookSearch?.addEventListener('input', () => {
    page = 1;
    renderBooks();
});

booksTbody?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('button');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id')!;

    const book = booksLib.findById(id);
    if (!book) return;

    if (action === 'delete-book') {
        const uid = borrowMap[id];
        if (uid != null) {
            borrowSvc.returnBook(id, uid);
            delete borrowMap[id];
        }
        booksLib.remove(id);
        persistAll();
        notify('Книгу видалено', 'success');
        renderBooks(); renderBorrowControls(); renderBorrowTable();
    }


    if (action === 'borrow') {
        const uid = borrowUser?.value || usersLib.all()[0]?.id;
        if (!uid) {
            notify('Додайте користувача', 'warning');
            return;
        }
        const msg = borrowSvc.borrow(id, uid);
        if (msg.toLowerCase().includes('успіш')) {
            const user = usersLib.findById(uid)!;
            borrowMap[id] = uid;
            persistAll();
            notify(msg, 'success');
            renderBooks();
            renderBorrowControls();
            renderBorrowTable();
            renderUsers();
        } else {
            notify(msg, 'warning');
        }
    }

    if (action === 'return') {
        const uid = borrowMap[id] ?? usersLib.all()[0]?.id;
        if (!uid) return;
        const msg = borrowSvc.returnBook(id, uid);
        const user = usersLib.findById(uid);
        if (user) user.borrowedCount = Math.max(0, user.borrowedCount - 1);
        delete borrowMap[id];
        persistAll();
        notify(msg, 'success');
        renderBooks();
        renderBorrowControls();
        renderBorrowTable();
        renderUsers();
    }
});

/* ======================== Events: Users ======================== */
userForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // якщо в макеті є поле ID — беремо його, інакше генеруємо
    let id = (userId?.value.trim() || '').toString();
    id = id ? (id.startsWith('u_') ? id : `u_${id}`) : `u_${Date.now()}`;

    const name = userName.value.trim();
    const email = userEmail.value.trim();

    if (!notEmpty(name) || !notEmpty(email)) {
        notify('Імʼя та Email — обовʼязкові', 'warning');
        return;
    }
    if (usersLib.findById(id)) {
        notify('Користувач з таким ID вже існує', 'warning');
        return;
    }

    usersLib.add(new User(id, name, email, 0));
    persistAll();
    userForm.reset();
    notify('Користувача додано', 'success');
    renderUsers();
    renderBorrowControls();
});

usersTbody?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('button');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id')!;

    if (action === 'delete-user') {
        Object.entries(borrowMap).forEach(([bookId, userId]) => {
            if (userId === id) {
                borrowSvc.returnBook(bookId, id);
                delete borrowMap[bookId];
            }
        });
        usersLib.remove(id);
        persistAll();
        notify('Користувача видалено', 'success');
        renderUsers(); renderBorrowControls(); renderBooks(); renderBorrowTable();
    }
});

/* ======================== Events: Borrow tab ======================== */
// Делегуємо клік від контейнера вкладки, щоб не залежати від моменту монтажу кнопки
document.getElementById('borrow')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('#borrow-btn') as
        | HTMLButtonElement
        | null;
    if (!btn) return;

    const uid = (document.getElementById('borrow-user') as HTMLSelectElement)
        .value; // string
    const bid = (document.getElementById('borrow-book') as HTMLSelectElement)
        .value;

    const user = usersLib.findById(uid);
    const book = booksLib.findById(bid);

    if (!user || !book) {
        notify('Оберіть користувача і книгу', 'warning');
        return;
    }
    if (user.borrowedCount >= BorrowService.MAX_PER_USER) {
        notify('Ліміт 3 книги перевищено', 'warning');
        return;
    }
    if (book.isBorrowed) {
        notify('Книга вже позичена', 'warning');
        return;
    }

    const msg = borrowSvc.borrow(bid, uid);
    if (msg.toLowerCase().includes('успіш')) {
        borrowMap[bid] = uid;
        persistAll();
        notify(msg, 'success');
        renderBooks();
        renderBorrowControls();
        renderBorrowTable();
        renderUsers();
    } else {
        notify(msg, 'warning');
    }
});

/* ======================== Reset all ======================== */
resetAllBtn?.addEventListener('click', () => {
    if (!confirm('Видалити всі книги, користувачів і позичання?')) return;
    booksLib.setAll([]);
    usersLib.setAll([]);
    borrowMap = {};
    persistAll();
    notify('Дані очищено', 'success');
    renderBooks();
    renderUsers();
    renderBorrowControls();
    renderBorrowTable();
});

/* ======================== First render ======================== */
renderBooks();
renderUsers();
renderBorrowControls();
renderBorrowTable();
