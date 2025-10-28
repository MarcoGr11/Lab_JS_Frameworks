export type Gender = 'male' | 'female'

export interface User {
    id: number
    firstName: string
    lastName: string
    gender: Gender
    age: number
    position: string
    photo: string
    hobbies: string[]
}
