export interface IUserCredentials {
    name: string | null,
    email: string,
    password: string
}


export interface IBase {
    name: string,
}

export interface IService extends IBase {
    service_id: string,
    description: string,
    price: number,
}

export interface IUserDetails extends IBase {
    email: string,
    role: string,
    user_id: string,
    password: string | undefined
    confirm_password: string | undefined
}

export type ITable<T> = {
    type: "IService" | "IUserDetails";
    headers: (keyof T)[];
    rows: (string | number)[][];
    handleEdit: (data: T) => void;
    handleRemove: (id: string) => void;
};