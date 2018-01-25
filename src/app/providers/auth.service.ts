import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {User} from '../data/user.interface';

export class EmailPasswordCredentials {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {

    public user: Observable<User>;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                private router: Router) {

        this.user = this.afAuth.authState
            .switchMap(
                user => {
                    if (user) {
                        return this.db.object<User>(`users/${user.uid}`).valueChanges();
                    } else {
                        return Observable.of(null)
                    }
                })
    }

    public emailLogin(credentials: EmailPasswordCredentials): Promise<object> {
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
            .then((credentials) => {
                this.db.list(`/users/${credentials.uid}`).valueChanges()
                    .subscribe(
                        userTable => {
                            if (!userTable.length) {
                                this.initUserData(credentials);
                            }
                        }
                    );
                this.router.navigate(['']);
            })
            .catch(error => {
                return error
            });
    }

    public initUserData(user): void {
        let userTable = this.db.database.ref(`/users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email,
            role: 1,
            firstName: null,
            lastName: null
        };
        userTable.set(data)
            .catch(error => {
                return error
            });
    }

    public signOut(): void {
        this.db.database.goOffline();
        this.afAuth.auth.signOut()
            .then(() => this.router.navigate(['/login']))
            .catch(error => {
                return error
            });
    }

}
