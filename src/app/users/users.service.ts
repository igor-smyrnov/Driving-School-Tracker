import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersService {

    constructor(private db: AngularFireDatabase) {
    }

    public getUserDataByUid(uid): Observable {
        return this.db.object('/users/' + uid).valueChanges();
    }
}
