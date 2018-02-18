import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {IAuthUser, IDbUser} from '../app.interface';
import {UsersService} from '../users/users.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-home-page',
    templateUrl: './dashboard.component.html',
    styles: [],
    animations: [
        trigger('slideInOut', [
            state('opened', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            state('closed', style({
                transform: 'translate3d(0, -40%, 0)'
            })),
            transition('opened => closed', animate('400ms ease-in-out')),
            transition('closed => opened', animate('400ms ease-in-out'))
        ]),
    ]
})
export class DashboardComponent implements OnInit {
    public userData: IDbUser;
    public menuState: string = 'closed';

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

    public toggleMenu() {
        this.menuState = this.menuState === 'closed' ? 'opened' : 'closed';
    }

    public signOut(): void {
        this.auth.signOut();
    }

}
