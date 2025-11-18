import { http } from './http';

interface LoginResponse {
    token: string;
}

export const AuthRepository = {
    async login(email: string, password: string): Promise<string> {
        if (email === "babunbogdan@gmail.com" && password === "12345") {
            return "mock-token-123456";
        }

        throw new Error("Invalid credentials");
    }
};

