import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {LoginPageComponent} from './auth/login-page/login-page.component';
import {AuthService} from './auth/auth.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {TracksListComponent} from './tracks/tracks-list/tracks-list.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TracksService} from './tracks/tracks.service';
import {UsersService} from './users/users.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
MatButtonModule,
MatCardModule,
MatFormFieldModule,
MatIconModule,
MatInputModule,
MatListModule,
MatSelectModule,
MatSidenavModule,
MatTabsModule,
MatToolbarModule
} from '@angular/material';
import {AgmCoreModule} from '@agm/core';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        TracksListComponent,
        DashboardComponent
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
        AgmCoreModule.forRoot({apiKey: environment.googleMapsKey}),
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTabsModule,
        MatListModule
    ],
    providers: [AuthService, AuthGuardService, TracksService, UsersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
