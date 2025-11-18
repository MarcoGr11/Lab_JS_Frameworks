import { http } from '../repositories/http'
import type { User } from '../types/user'

interface DummyUser {
    id: number
    firstName: string
    lastName: string
    email: string
    image: string
}

interface DummyUsersResponse {
    users: DummyUser[]
}

function mapUser(u: DummyUser): User {
    return {
        id: u.id,
        email: u.email,
        fullName: `${u.firstName} ${u.lastName}`,
        avatar: u.image,
    }
}

export const UsersRepository = {
    async list(): Promise<User[]> {
        const res = await http.get<DummyUsersResponse>('https://dummyjson.com/users')
        return res.users.map(mapUser)
    },

    async getById(id: number): Promise<User> {
        const res = await http.get<DummyUser>(`https://dummyjson.com/users/${id}`)
        return mapUser(res)
    }
}
