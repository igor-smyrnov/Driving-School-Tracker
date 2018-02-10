import {Component, OnInit} from '@angular/core';
import {TracksService} from './tracks.service';
import {AuthService} from '../auth/auth.service';
import {UsersService} from '../users/users.service';
import {IAuthUser, IDbUser} from '../app.interface';

interface IGoogleMap {
    latitude: number;
    longitude: number;
    zoom: number;
}

interface IMarker {
    latitude: number;
    longitude: number;
    label?: string;
}

interface IPoint {
    latitude: number;
    longitude: number;
}

@Component({
    selector: 'app-tracks-list',
    templateUrl: './tracks-list.component.html',
    styles: []
})

export class TracksListComponent implements OnInit {
    public tracksListModel: any = [];
    public points: IPoint[] = [];
    public markers: IMarker[] = [];
    public googleMap: IGoogleMap = {
        latitude: 51.7613777,
        longitude: 51.7613777,
        zoom: 14
    };
    public userDataModel: IDbUser;

    constructor(private tracksService: TracksService,
                private authService: AuthService,
                private usersService: UsersService) {
    }

    public ngOnInit(): void {
        this.showUserPosition();
        this.getUserData();
    }

    public showOnMap(points): void {
        this.markers = [];
        for (let key in points) {
            if (points.hasOwnProperty(key)) {
                if (parseInt(key) === 1) {
                    this.googleMap.latitude = points[key].latitude;
                    this.googleMap.longitude = points[key].longitude;
                    this.markers.push({
                        latitude: points[key].latitude,
                        longitude: points[key].longitude,
                        label: 'A'
                    });
                }
                if (parseInt(key) === Object.keys(points).length - 1) {
                    this.markers.push({
                        latitude: points[key].latitude,
                        longitude: points[key].longitude,
                        label: 'B'
                    });
                }
                this.points.push({
                    latitude: points[key].latitude,
                    longitude: points[key].longitude,
                });
            }
        }
    }

    public showUserPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.googleMap.latitude = position.coords.latitude;
                    this.googleMap.longitude = position.coords.longitude;
                }
            );
        }
    }

    public removeTrack($key: string): void {
        this.tracksService.removeTrack($key);
    }

    private getUserData(): void {
        this.authService.authUser
            .subscribe(
                (authUser: IAuthUser) => {
                    if (authUser) {
                        this.usersService
                            .getUserDataByUid(authUser.uid)
                            .subscribe(
                                (userData: IDbUser) => {
                                    if (userData) {
                                        this.userDataModel = {
                                            role: userData.role,
                                            email: userData.email,
                                            firstName: userData.firstName,
                                            lastName: userData.lastName
                                        };
                                        this.tracksService
                                            .getUserTracksList(authUser.uid, userData.role)
                                            .snapshotChanges()
                                            .subscribe(
                                                userTracks => {
                                                    if (userTracks) {
                                                        this.tracksListModel = [];
                                                        userTracks
                                                            .forEach(
                                                                track => {
                                                                    let newTrack: any = track.payload.toJSON();
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
                                                                    this.tracksListModel.push(newTrack);
                                                                    console.log(this.tracksListModel);
                                                                }
                                                            )
                                                    }
                                                }
                                            )
                                    }
                                }
                            );
                    }
                }
            );
    }
}
