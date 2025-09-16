import { Status } from "@/lib/types/type";

// A course that exists in DB (has an id)
export interface IInstituteStudentInitialDataStudent extends IStudentPostData{
    id: string,
    studentName: string,
    studentPrice: string
  }
  
  // A student you send in POST request (id not needed yet)
  export interface IStudentPostData {
    studentName: string,
    studentEmail: string,
    studentPhoneNumber: string,
    studentAddress: string,
    enrolledDate : string,
    studentImage?: File | null
   
  }
  
  export interface IInstituteStudentInitialData {
    students: IInstituteStudentInitialDataStudent[],
    status: Status
  }