import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Track} from './track.interface';
import {FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TracksService {

    private basePath: string = '/items';
    items: AngularFireObject<Track[]> = null; //  list of objects
    item: AngularFireObject<Track> = null; //   single object

    constructor(private db: AngularFireDatabase) {
    }

    getItemsList(query={}): AngularFireList<Track[]> {
        return
    }

}
