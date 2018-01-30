import {Component, OnInit} from '@angular/core';
import {TracksService} from '../tracks.service';
import {AuthService} from '../../auth/auth.service';
import {Track} from '../track.interface';
import {AngularFireList} from 'angularfire2/database';
import {User} from '../../users/user.interface';

@Component({
    selector: 'app-tracks-list',
    templateUrl: './tracks-list.component.html',
    styles: []
})

export class TracksListComponent implements OnInit {

    public userTracksList: Track[];
    private currentUser: User;
    private googleMap: GoogleMap;

    constructor(private tracksService: TracksService,
                private authService: AuthService) {
        this.googleMap = {zoom: 14}
    }

    ngOnInit() {
        this.getUserTracksList();
        this.showUserPosition();
    }

    getUserTracksList() {
        this.authService.loggedInUser
            .subscribe(
                userData => {
                    if (userData) {
                        this.currentUser = userData;

                        let userTracksList: AngularFireList<any>;
                        userTracksList = this.returnTracksByRoleAndUid(userData.role, userData.uid);
                        userTracksList.snapshotChanges()
                            .subscribe(
                                tracks => {
                                    this.userTracksList = [];

                                    tracks.forEach(
                                        track => {
                                            let newTrack = track.payload.toJSON();
                                            newTrack['$key'] = track.key;
                                            this.userTracksList.push(newTrack as Track);
                                        });
                                }
                            )
                    }
                });
    }

    private returnTracksByRoleAndUid(role: number, uid: string): AngularFireList<any> {
        switch (role) {
            case 0:
                return this.tracksService.getStudentTracksList(uid);
            case 1:
                return this.tracksService.getInstructorTracksList(uid);
            case 2:
                return this.tracksService.getCompleteTracksList();
        }
    }

    showOnMap(points) {
        this.markers = [];
        for (let key in points) {
            if (points.hasOwnProperty(key)) {
                if (parseInt(key) === 0) {
                    this.markers.push({
                        lat: points[key][0],
                        lng: points[key][1],
                        label: 'A'
                    });
                }
                else if (parseInt(key) === Object.keys(points).length - 1) {
                    this.markers.push({
                        lat: points[key][0],
                        lng: points[key][1],
                        label: 'B'
                    });
                }
                else {
                    this.markers.push({
                        lat: points[key][0],
                        lng: points[key][1],
                        label: key
                    });
                }
            }
        }
    }

    private createTrack() {
        if (this.currentUser.uid) {
            this.tracksService.createSampleTrack('JtBu0EVIdHfUwRUXLLLWr1wbmZE3', this.currentUser.uid);
        }
    }

    private removeTrack($key: string) {
        this.tracksService.removeTrack($key);
    }

    private showUserPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.googleMap.position = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }
            );
        }
    }

    markers: Marker[] = []
}

//ToDo: make it in another file
interface GoogleMap {
    position?: object;
    zoom: number;
}
//ToDo: make it in another file
interface Marker {
    lat: number;
    lng: number;
    label?: string;
}
