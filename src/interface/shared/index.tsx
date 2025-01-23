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
    year?: string,
    plate_number: string,
}

export interface IRepaireRequestDetails extends IRepaireRequest {
    available_mechanic?: string,
    note?: string,
    service_ids?: string,
}

export interface IRepairUpdate {
    mechanic_id: string,
    request_id: string,
    request_status?: string,
    vehicle_id: string,
    service_id: string
    preferred_schedule: string,
    notes?: string,
    mechanic_notes?: string,
    image?: string
}

export interface IRepaireRequest extends IBase {
    request_id: string,
    service_type: string,
    preferred_schedule: string,
    plate_number: string,
    model:string,
    year:string,
    vehicle_name: string
    vehicle_id: string
    service_id: string
    requested_by?: string,
    requested_by_id?: string,
    request_status?: string,
}

export interface IServiceHistory extends IBase {
    date: string,
    user_name: string,
    history_id: string,
    car_name: string,
    plate_number: string,
    service_name: string,
    amount: string
    //For Table Header
    service?:string
    customer?: string
    car?: string
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
    handleChange?: (data: T, status: string) => void;
    hideUserID?: boolean
};