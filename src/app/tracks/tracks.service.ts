import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Track} from './track.interface';
import {UsersService} from '../users/users.service';

@Injectable()
export class TracksService {

    tracksList: AngularFireList<any>;

    constructor(private db: AngularFireDatabase,
                private usersService: UsersService) {
    }

    getStudentTracksList(studentUid): AngularFireList<any> {
        this.tracksList = this.db.list('/tracks',
            ref => ref.orderByChild('studentUid').equalTo(studentUid));

        return this.tracksList;
    }

    getInstructorTracksList(instructorUid): AngularFireList<any> {
        this.tracksList = this.db.list('/tracks',
            ref => ref.orderByChild('instructorUid').equalTo(instructorUid));

        this.tracksList.valueChanges().subscribe(
            instructorTracks => {

                instructorTracks.forEach(
                    track => {
                        track.instructorData.firstName = "Test";
                    }
                )
            }
        );

        return this.tracksList;
    }

    getCompleteTracksList(): AngularFireList<any> {
        this.tracksList = this.db.list('/tracks');

        return this.tracksList;
    }

    public createSampleTrack(instructorUid: string, studentUid: string) {
        let tracksDb = this.db.list('/tracks');
        let instructorData: object;
        this.usersService.getUserDataByUid(instructorUid).subscribe(
            userData => {
                instructorData = userData;

                navigator.geolocation.getCurrentPosition(
                    location => {
                        const data: Track = {
                            instructorUid: instructorUid,
                            instructorData: instructorData,
                            studentUid: studentUid,
                            timestamp: location.timestamp,
                            points: [
                                [
                                    location.coords.latitude,
                                    location.coords.longitude
                                ],
                                [
                                    location.coords.latitude + Math.random()/10,
                                    location.coords.longitude + Math.random()/10
                                ],
                                [
                                    location.coords.latitude + Math.random()/10,
                                    location.coords.longitude + Math.random()/10
                                ],
                                [
                                    location.coords.latitude + Math.random()/10,
                                    location.coords.longitude + Math.random()/10
                                ],
                                [
                                    location.coords.latitude + Math.random()/10,
                                    location.coords.longitude + Math.random()/10
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
        );

    }

    removeTrack($key : string){
        this.tracksList.remove($key);
    }
}
