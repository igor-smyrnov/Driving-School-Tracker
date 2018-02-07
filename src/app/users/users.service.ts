import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class UsersService {

    constructor(private db: AngularFireDatabase) {
    }

    public getUserDataByUid(uid): any {
        return this.db.object('/users/' + uid).valueChanges();
    }
}
