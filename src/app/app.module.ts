import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthService} from './providers/auth.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {TracksListComponent} from './tracks-list/tracks-list.component';
import {AuthGuardService} from './providers/auth-guard.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TracksService} from './providers/tracks.service';
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
        AppRoutingModule,
        BrowserAnimationsModule,
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
    providers: [AuthService, AuthGuardService, TracksService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
