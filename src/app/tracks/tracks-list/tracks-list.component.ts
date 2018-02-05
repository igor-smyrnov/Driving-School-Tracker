import {Component, OnInit} from '@angular/core';
import {TracksService} from '../tracks.service';
import {AuthService} from '../../auth/auth.service';
import {UsersService} from '../../users/users.service';
import {ILoggedUser, ITrack} from '../../app.interface';

interface IGoogleMap {
    position?: object;
    zoom: number;
}

interface IMarker {
    lat: number;
    lng: number;
    label?: string;
}

@Component({
    selector: 'app-tracks-list',
    templateUrl: './tracks-list.component.html',
    styles: []
})

export class TracksListComponent implements OnInit {
    public userTracksList: ITrack[] = [];
    public markers: IMarker[] = [];
    public googleMap: IGoogleMap;
    private currentUser: ILoggedUser;

    constructor(private tracksService: TracksService,
                private authService: AuthService,
                private usersService: UsersService) {
        this.googleMap = {zoom: 14}
    }

    public ngOnInit(): void {
        this.getUserData();
        this.showUserPosition();
    }

    public showOnMap(points): void {
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

    public createTrack(): void {
        if (this.currentUser.uid) {
            this.tracksService.createSampleTrack('JtBu0EVIdHfUwRUXLLLWr1wbmZE3', this.currentUser.uid);
        }
    }

    public removeTrack($key: string) {
        this.tracksService.removeTrack($key);
    }

    public showUserPosition(): void {
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

    private getUserData(): void {
        this.authService.loggedInUser
            .subscribe(
                userData => {
                    if (userData) {
                        this.currentUser = userData;
                        this.tracksService.getUserTracksList(userData.uid, userData.role)
                            .snapshotChanges()
                            .subscribe(
                                tracks => {
                                    if (tracks) {
                                        this.userTracksList = [];
                                        tracks.forEach(
                                            track => {
                                                let newTrack = track.payload.toJSON();
                                                newTrack['$key'] = track.key;
                                                this.usersService.getUserDataByUid(newTrack.instructorUid)
                                                    .subscribe(
                                                        instructorData =>
                                                            newTrack['instructorData'] = instructorData
                                                    );
                                                this.usersService.getUserDataByUid(newTrack.studentUid)
                                                    .subscribe(
                                                        studentData =>
                                                            newTrack['studentData'] = studentData
                                                    );
                                                this.userTracksList.push(newTrack);
                                            }
                                        )
                                    }
                                });
                    }
                }
            );
    }
}
