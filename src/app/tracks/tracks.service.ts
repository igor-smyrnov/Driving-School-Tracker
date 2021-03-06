import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {IUserTrack} from '../app.interface';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TracksService {

    constructor(private db: AngularFireDatabase) {
    }

    public getUserTracksList(userUid, userRole): AngularFireList<IUserTrack[]> {
        switch (userRole) {
            case 0: {
                return this.db.list('/tracks',
                    ref => ref.orderByChild('studentUid').equalTo(userUid));
            }
            case 1: {
                return this.db.list('/tracks',
                    ref => ref.orderByChild('instructorUid').equalTo(userUid));
            }
            case 2: {
                return this.db.list('/tracks');
            }
            default: {
                return this.db.list('/tracks');
            }
        }
    }

    public getTrackByKey($key: string): Observable<object> {
        return this.db.object('/tracks/' + $key).valueChanges();
    }

    public removeTrack($key: string) {
        this.db.list('/tracks').remove($key);
    }
}
