import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ILoggedUser} from '../../app.interface';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styles: []
})
export class UserProfileComponent implements OnInit {
    public currentUser: ILoggedUser;
    public userForm: FormGroup;

    constructor(private authService: AuthService) {
    }

    public ngOnInit(): void {
        this.getUserData();
    }

    private getUserData(): void {
        this.authService.loggedInUser
            .subscribe(
                userData => {
                    if (userData) {
                        console.log(userData);
                        this.currentUser = userData;
                    }
                })
    }
}
