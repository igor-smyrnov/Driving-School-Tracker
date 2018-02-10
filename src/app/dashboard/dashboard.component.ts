import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {IAuthUser, IDbUser} from '../app.interface';
import {UsersService} from '../users/users.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {
    public userData: IDbUser;

    constructor(private auth: AuthService,
                private usersService: UsersService) {
    }

    public ngOnInit(): void {
        this.auth.authUser
            .subscribe(
                (authUser: IAuthUser) => {
                    this.usersService.getUserDataByUid(authUser.uid)
                        .subscribe(userData => {
                            this.userData = userData;
                        })
                }
            )
    }

    public signOut(): void {
        this.auth.signOut();
    }

}
