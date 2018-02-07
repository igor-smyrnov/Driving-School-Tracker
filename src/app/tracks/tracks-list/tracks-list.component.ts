import {Component, OnInit} from '@angular/core';
import {TracksService} from '../tracks.service';
import {AuthService} from '../../auth/auth.service';
import {UsersService} from '../../users/users.service';
import {ILoggedUser} from '../../app.interface';

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
    public tracksListModel: any = [];
    public markers: IMarker[] = [];
    public googleMap: IGoogleMap;
    public currentUser: ILoggedUser;

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
        console.log(points);
        for (let key in points) {
            if (points.hasOwnProperty(key)) {
                if (parseInt(key) === 0) {
                    this.markers.push({
                        lat: points[key]['latitude'],
                        lng: points[key]['longitude'],
                        label: 'A'
                    });
                }
                else if (parseInt(key) === Object.keys(points).length - 1) {
                    this.markers.push({
                        lat: points[key]['latitude'],
                        lng: points[key]['longitude'],
                        label: 'B'
                    });
                }
                else {
                    this.markers.push({
                        lat: points[key]['latitude'],
                        lng: points[key]['longitude'],
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

    public removeTrack($key: string): void {
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
                                        this.tracksListModel = [];
                                        tracks.forEach(
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
                                            }
                                        )
                                    }
                                });
                    }
                }
            );
    }
}
