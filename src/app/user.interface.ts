export interface User {
    uid: string;
    email: string;
    role?: number;
    firstName?: string;
    lastName?: string;
    tracks?: object;
}
