import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {LoginPageComponent} from './auth/login-page.component';
import {AuthService} from './auth/auth.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './router/app-routing.module';
import {TracksListComponent} from './tracks/tracks-list.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TracksService} from './tracks/tracks.service';
import {UsersService} from './users/users.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {UserProfileComponent} from './users/user-profile.component';
import {NotFoundPageComponent} from './NotFoundPage/not-found-page.component';
import {NgStickyDirective} from 'ng-sticky';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        TracksListComponent,
        DashboardComponent,
        UserProfileComponent,
        NotFoundPageComponent,
        NgStickyDirective
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AgmCoreModule.forRoot({apiKey: environment.googleMapsKey})
    ],
    providers: [AuthService, AuthGuardService, TracksService, UsersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
