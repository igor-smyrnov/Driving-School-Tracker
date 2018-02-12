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

export interface IPoint {
    latitude: number;
    longitude: number;
}

export interface IUserTrack {
    $key?: string,
    instructorData?: object[],
    studentData?: object[],
    instructorUid: string,
    studentUid: string,
    timestamp: number
    points: IPoint[]
}