import { Status } from "@/lib/types/type";

// A course that exists in DB (has an id)
export interface IInstituteCourseInitialDataCourse extends ICoursePostData{
    id: string,
    courseName: string,
    coursePrice: string
  }
  
  // A course you send in POST request (id not needed yet)
  export interface ICoursePostData {
    courseName: string,
    coursePrice: string,
    courseDescription: string,
    courseDuration: string,
    courseThumbnail?: File | null,
    courseLevel: string,
    categoryId: string,
    teacherId : string
  }
  
  export interface IInstituteCourseInitialData {
    courses: IInstituteCourseInitialDataCourse[],
    status: Status
  }
  