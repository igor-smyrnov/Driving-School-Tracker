import {Component, OnInit} from '@angular/core';
import {TracksService} from '../providers/tracks.service';
import {AuthService} from '../providers/auth.service';

@Component({
    selector: 'app-tracks-list',
    templateUrl: './tracks-list.component.html',
    styles: []
})
export class TracksListComponent implements OnInit {

    private currentUserUid: string;
    private currentUserRole: number;
    private userTracks: any;

    constructor(private tracksService: TracksService,
                private auth: AuthService) {
    }

    ngOnInit() {
        this.getUserTracks();
    }

    getUserTracks() {
        this.auth.user
            .subscribe(
                userData => {
                    if (userData) {
                        this.currentUserUid = userData.uid;
                        this.currentUserRole = userData.role;
                        if (userData.role === 0) {
                            this.tracksService.getStudentTracksList(userData.uid)
                                .subscribe(tracksList => {
                                    this.userTracks = tracksList;
                                    console.log(tracksList);
                                });
                        } else if (userData.role === 1) {

                            //ToDo: finish it
                            console.log('In progress!');
                        }
                    }
                }
            );
    }

    //toDo: make it directive
    getDateFromTimestamp(timestamp) {
        let date: Date = new Date(timestamp);
        return date.toLocaleTimeString() + ' | ' + date.toLocaleDateString();
    }

    createTrack() {
        if (this.currentUserUid) {
            this.tracksService.createSampleTrack('JtBu0EVIdHfUwRUXLLLWr1wbmZE3', this.currentUserUid);
        }
    }

}
