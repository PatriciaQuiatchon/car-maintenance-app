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

export interface IService {
    service_id: string,
    name: string,
    description: string,
    price: number
}