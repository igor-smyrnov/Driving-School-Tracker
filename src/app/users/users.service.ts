import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {IDbUser} from '../app.interface';

@Injectable()
export class UsersService {

    constructor(private db: AngularFireDatabase) {
    }

    public getUserDataByUid(uid: string): any {
        return this.db.object('/users/' + uid).valueChanges();
    }

    public setUserDataByUid(uid: string, userData: IDbUser): any {
        const data: IDbUser = {
            role: userData.role,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName
        };
        this.db.object('/users/' + uid).set(data);
    }
}
