import { Status } from "@/lib/types/type"

export interface IInstitute {
    instituteName : string,
    instituteEmail : string,
    institutePhoneNumber : string,
    instituteAddress : string,
    institutePanNo ?: string,
    instituteVatNo ?: string,
    instituteId ?: string,
    userId ?: string,
    instituteNumber ?: string

}


export interface IInstituteInitialData{
    institute : IInstitute,
    currentInstitute : IInstitute | null
    status : Status
}