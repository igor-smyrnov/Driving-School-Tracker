import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Track} from '../data/track.interface';

@Injectable()
export class TracksService {

    constructor(private db: AngularFireDatabase) {
    }

    public createSampleTrack(instructorUid: string, studentUid: string) {
        let tracksDb = this.db.database.ref('/tracks');

        navigator.geolocation.getCurrentPosition(
            location => {
                const data: Track = {
                    // ToDo: check if student have role 0 and instructor have role 1
                    instructorUid: instructorUid,
                    studentUid: studentUid,
                    timestamp: location.timestamp,
                    points: [
                        [
                            location.coords.latitude,
                            location.coords.longitude
                        ],
                        [
                            location.coords.latitude,
                            location.coords.longitude
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

    public getStudentTracksList(studentUid): any {
        return this.db.list('/tracks', ref => ref.orderByChild('studentUid').equalTo(studentUid)).valueChanges()
            .map(tracks => {
                    return tracks.map((track: any) => {
                        this.getUserDataByUid(track.instructorUid).subscribe(
                            instructorData => {
                                track.instructorData = instructorData
                            }
                        );
                        return track;
                    })
                }
            )
    }

    private getUserDataByUid(uid) {
        return this.db.object('/users/' + uid).valueChanges();
    }

}
