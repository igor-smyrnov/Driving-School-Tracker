import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from '../auth/login-page.component';
import {TracksListComponent} from '../tracks/tracks-list.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {UserProfileComponent} from '../users/user-profile.component';
import {NotFoundPageComponent} from '../NotFoundPage/not-found-page.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'dashboard/tracks', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        children: [
            {path: 'tracks', component: TracksListComponent},
            {path: 'user-profile', component: UserProfileComponent}
        ]
    },
    {path: '**', component: NotFoundPageComponent}
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