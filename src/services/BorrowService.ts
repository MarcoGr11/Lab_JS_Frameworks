import { Book, User } from '../models';

export class BorrowService {
    static readonly MAX_PER_USER = 3;

    constructor(private books: Book[], private users: User[]) {}

    borrow(bookId: string, userId: string): string {
        const book = this.books.find(b => b.id === bookId);
        const user = this.users.find(u => u.id === userId);

        if (!book || !user) return 'Книга або користувач не знайдені';

        if (book.isBorrowed) return 'Книга вже позичена';

        if (user.borrowedCount >= BorrowService.MAX_PER_USER) {
            return 'Користувач досяг ліміту у 3 книги';
        }

        book.borrow();
        user.borrowedCount += 1;

        return 'Книгу успішно позичено';
    }

    returnBook(bookId: string, userId: string): string {
        const book = this.books.find(b => b.id === bookId);
        const user = this.users.find(u => u.id === userId);

        if (!book || !user) return 'Книга або користувач не знайдені';
        if (!book.isBorrowed) return 'Книга вже повернута';

        book.returnBack();
        user.borrowedCount = Math.max(0, user.borrowedCount - 1);

        return 'Книгу повернуто';
    }
}
