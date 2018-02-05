import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {ITrack} from '../app.interface';

@Injectable()
export class TracksService {

    constructor(private db: AngularFireDatabase) {
    }

    public getUserTracksList(userUid, userRole): AngularFireList {
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

    public createSampleTrack(instructorUid: string, studentUid: string): void {
        let tracksDb = this.db.list('/tracks');

        navigator.geolocation.getCurrentPosition(
            location => {
                const data: ITrack = {
                    instructorUid: instructorUid,
                    studentUid: studentUid,
                    timestamp: location.timestamp,
                    points: [
                        [
                            location.coords.latitude,
                            location.coords.longitude
                        ],
                        [
                            location.coords.latitude + Math.random() / 10,
                            location.coords.longitude + Math.random() / 10
                        ],
                        [
                            location.coords.latitude + Math.random() / 10,
                            location.coords.longitude + Math.random() / 10
                        ],
                        [
                            location.coords.latitude + Math.random() / 10,
                            location.coords.longitude + Math.random() / 10
                        ],
                        [
                            location.coords.latitude + Math.random() / 10,
                            location.coords.longitude + Math.random() / 10
                        ],
                        [
                            location.coords.latitude + Math.random() / 10,
                            location.coords.longitude + Math.random() / 10
                        ]
                    ]
                };
                tracksDb.push(data);
            },
            error => {
                return error;
            }
        );

    }

    public removeTrack($key: string) {
        this.db.list('/tracks').remove($key);
    }
}
