export interface EventsTypes {
    eTitle: string;
    eStartDate: string;
    eStartTime: string;
    eEndDate: string;
    eEndTime: string;
    eLocation: string;
    createdBy: number;
    eClientId: number;
    eModelId: number;
    eAgencyId: number;
}

export interface Login {
    // client_id?: string;
    // grant_type?: string;
    email: string;
    password: string;
}

export interface Token {
    name: string;
    roleId: number;
    userId: number;
    access_token: string;
    // expires: number;
    // token_type: string;
    // user: string;
    email: string;
    data: any;
    headers: any;
    success: boolean;
}

export interface User {
    name: string;
    x_access_token: string;
    email: string;
    userId: number;
    roleId: number;
    data: any;
    success: boolean;
}

export interface Profile {
    email: string;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    mobileNo: number;
    isActive: boolean;
    isDelete: boolean;
    isPwdChanged: boolean;
    createdOn: string;
    updatedOn: string;
    roleId: number;
}