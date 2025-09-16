import { Status } from "@/lib/types/type"


export interface IStudent{
    studentName: string,
    studentEmail: string,
    studentPhoneNumber: string,
    studentAddress: string
}
export interface IInitialStudentData{
    student :IStudent,
    status : Status
}