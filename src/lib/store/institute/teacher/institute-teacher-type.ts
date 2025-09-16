import { Status } from "@/lib/types/type";


export enum teacherExperience{
    Beginner = "beginner",
    Intermediate = "intermediate",
    Advance = "advance"
}
export interface IInstituteTeacherInitialDataTeacherCourse{
    courseName : string,
    coursePrice : string,
    courseThumbnail : string,
    courseId : string | null
   
}
export interface IInstituteTeacherInitialDataTeacher {
    id : string,
    teacherName : string | null,
    teacherEmail : string | null,
    teacherPhoneNumber : string,
    teacherExperience : string,
    teacherSalary : string,
    teacherJoinedDate : string,
    teacherPhoto?: File | null,
    courseName : string
}
 interface IInitialTeacherDataWithCourse extends IInstituteTeacherInitialDataTeacher{
    course ?: IInstituteTeacherInitialDataTeacherCourse
}


export interface IInstituteTeacherInitialData{
    teachers : IInitialTeacherDataWithCourse[],
    status : Status
}