export interface IUserDetails {
    name: string,
    email: string,
    role: string,
}

export interface IUserCredentials {
    name: string | null,
    email: string,
    password: string
}