import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ILoggedUser} from '../app.interface';

@Component({
    selector: 'app-home-page',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {
    private userData: ILoggedUser;

    constructor(private auth: AuthService) {
    }

    public ngOnInit(): void {
        this.auth.loggedInUser
            .subscribe(
                (data: ILoggedUser) => {
                    this.userData = data;
                }
            )
    }

    public signOut(): void {
        this.auth.signOut();
    }

}
