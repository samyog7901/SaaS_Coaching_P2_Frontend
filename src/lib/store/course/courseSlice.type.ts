import { Status } from "@/lib/types/type";

export interface ICourse{
    courseName : string,
    courseDescription : string,
    courseDuration : string,
    coursePrice : number,
}

export interface IInitialCourseData{
    course : ICourse,
    status : Status
}