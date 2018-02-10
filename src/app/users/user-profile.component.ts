import {Component, OnInit} from '@angular/core';
import {IAuthUser, IDbUser} from '../app.interface';
import {AuthService} from '../auth/auth.service';
import {UsersService} from './users.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styles: []
})
export class UserProfileComponent implements OnInit {
    public userUid: string;
    public userDataModel: IDbUser = {
        role: 0,
        email: '',
        firstName: '',
        lastName: ''
    };

    constructor(private authService: AuthService,
                private usersService: UsersService) {
    }

    public ngOnInit(): void {
        this.getUserData();
    }

    public save() {
        this.usersService.setUserDataByUid(this.userUid, this.userDataModel);
    }

    private getUserData(): void {
        this.authService.authUser
            .subscribe(
                (authUser: IAuthUser) => {
                    if (authUser) {
                        this.userUid = authUser.uid;
                        this.usersService
                            .getUserDataByUid(authUser.uid)
                            .subscribe(
                                (userData: IDbUser) => {
                                    this.userDataModel = {
                                        role: userData.role,
                                        email: userData.email,
                                        firstName: userData.firstName,
                                        lastName: userData.lastName
                                    }
                                }
                            )
                    }
                })
    }
}
