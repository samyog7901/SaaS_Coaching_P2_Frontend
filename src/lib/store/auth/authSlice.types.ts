import { Status } from "@/lib/types/type";

export interface IUserData {
    id: string,
    username : string,
    token : string,
    currentInstituteNumber ?: string,
    email ?: string,
    role ?: string,
    instituteId ?: string

}

export interface IRegisterData extends IUserData {
    email : string
}

export interface IInitialState {
    user: IUserData;
    status : Status
}