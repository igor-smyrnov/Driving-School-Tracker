import {Component, OnInit} from '@angular/core';
import {AuthService} from '../providers/auth.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {

    private userData: object;

    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {
        this.auth.user
            .subscribe(
                data => {
                    this.userData = data;
                }
            )
    }

    signOut(): void {
        this.auth.signOut();
    }

}
