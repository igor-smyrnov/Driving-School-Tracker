import {Component, Input, OnInit} from '@angular/core';
import {TracksService} from './tracks.service';
import {AuthService} from '../auth/auth.service';
import {UsersService} from '../users/users.service';
import {IAuthUser, IDbUser, IPoint, IUserTrack} from '../app.interface';
import {ActivatedRoute, Router} from '@angular/router';

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

@Component({
    selector: 'app-tracks-list',
    templateUrl: './tracks-list.component.html',
    styles: []
})

export class TracksListComponent implements OnInit {
    @Input()
    public tracksListModel: any = [];
    @Input()
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
                private router: Router,
                private route: ActivatedRoute,
                private usersService: UsersService) {
    }

    public ngOnInit(): void {
        this.showUserPosition();
        this.getUserData();
        this.route.queryParams.subscribe(
            params => {
                this.tracksService.getTrackByKey(params['uid'])
                    .subscribe(
                        track => {
                            if (track) {
                                this.showOnMap(track);
                            }
                        }
                    )
            }
        );
    }

    public showOnMap(track: IUserTrack | any): void {
        if (track.$key) {
            this.router.navigate([], {queryParams: {uid: track.$key}});
        }
        let points: IPoint[] = track.points;
        this.points = [];
        this.markers = [];
        for (let key in points) {
            if (points.hasOwnProperty(key)) {
                if (parseInt(key) === 0) {
                    this.googleMap.latitude = points[key][0];
                    this.googleMap.longitude = points[key][1];
                    this.markers.push({
                        latitude: points[key][0],
                        longitude: points[key][1],
                        label: 'A'
                    });
                }
                if (parseInt(key) === Object.keys(points).length - 1) {
                    this.markers.push({
                        latitude: points[key][0],
                        longitude: points[key][1],
                        label: 'B'
                    });
                }
                this.points.push({
                    latitude: points[key][0],
                    longitude: points[key][1],
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
