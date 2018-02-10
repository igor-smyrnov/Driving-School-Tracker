export interface IDbUser {
    uid?: string;
    role: number;
    email: string;
    firstName?: string;
    lastName?: string;
}

export interface IAuthUser {
    uid: string;
    email: string;
}

export interface ITrack {
    instructorData?: object[],
    studentData?: object[],
    instructorUid: string,
    studentUid: string,
    timestamp: number
    points: object[]
}