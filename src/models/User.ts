export interface IUser {
    id: string;
    name: string;
    email: string;
    borrowedCount: number;
}

export class User implements IUser {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public borrowedCount: number = 0
    ) {}
}