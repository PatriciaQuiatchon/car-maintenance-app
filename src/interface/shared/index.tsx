export interface IUserCredentials {
    name: string | null,
    email: string,
    password: string
    phone_num?: string,
    role?: string,
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
    phone_num?: string,
}

export interface IVehicle extends IBase {
    vehicle_id: string,
    user_id: string,
    type: string,
    model: string,
    plate_number: string,
}

export interface IRepaireRequestDetails extends IRepaireRequest {
    available_mechanic?: string,
    note?: string,
}

export interface IRepaireRequest extends IBase {
    request_id: string,
    service_type: string,
    preferred_schedule: string,
    plate_number: string,
    model:string,
    vehicle_name: string
}

export interface IServiceHistory extends IBase {
    date: string,
    user_name: string,
    history_id: string,
    car_name: string,
    plate_number: string,
    service: string,
    amount: string
}

export interface IServiceRequested extends IBase {
    request_id: string
}

export type ITable<T> = {
    type: "IService" | "IUserDetails" | "IServiceHistory" | "IServiceRequested" | "IRepaireRequestDetails" | "IVehicle";
    headers: (keyof T)[];
    rows: (string | number)[][];
    handleEdit: (data: T) => void;
    handleRemove: (id: string) => void;
};