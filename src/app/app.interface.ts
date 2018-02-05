export interface ILoggedUser {
    uid: string;
    name: string;
    surname: string;
}

export interface ITrack {
    instructorData?: object[],
    studentData?: object[],
    instructorUid: string,
    studentUid: string,
    timestamp: number
    points: object[]
}