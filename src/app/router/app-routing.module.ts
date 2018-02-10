import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from '../auth/login-page/login-page.component';
import {TracksListComponent} from '../tracks/tracks-list/tracks-list.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {UserProfileComponent} from '../users/user-profile/user-profile.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'dashboard/tracks', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        children: [
            {path: 'tracks', component: TracksListComponent},
            {path: 'userProfile', component: UserProfileComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}