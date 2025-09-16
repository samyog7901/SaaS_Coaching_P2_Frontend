import { Status } from "@/lib/types/type"

export interface ITeacher {
    id ?: string,
    teacherName : string,
    teacherEmail : string,
    teacherPhoneNumber : string,
    teacherJoinedDate ?: string,
    courseId? : string
}

export interface IInitialTeacherData{
    teacher : ITeacher,
    status : Status
}

export interface ITeacherPostData extends ITeacher{
    teacherExperience : string,
    teacherSalary : string,
    teacherJoinedDate : string,
    teacherPhoto?: File | null,
    courseId : string
}
