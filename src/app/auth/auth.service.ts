import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

interface IEmailPasswordCredentials {
    email: string;
    password: string;
}
interface IAuthUser {
    uid: string;
    email: string;
    role: number;
    firstName?: string;
    lastName?: string;
}

@Injectable()
export class AuthService {

    public loggedInUser: any;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                private router: Router) {

        this.loggedInUser = this.afAuth.authState
            .switchMap(
                user => {
                    if (user) {
                        return this.db.object<IAuthUser>(`users/${user.uid}`).valueChanges();
                    } else {
                        return Observable.of(null)
                    }
                })
    }

    public emailLogin(credentials: IEmailPasswordCredentials): Promise<AngularFireAuth> {
        return this.afAuth.auth
            .signInWithEmailAndPassword(credentials.email, credentials.password)
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
        const data: IAuthUser = {
            uid: user.uid,
            email: user.email,
            role: 0,
            firstName: null,
            lastName: null
        };
        userTable.set(data)
            .catch(error => {
                return error
            });
    }

    public signOut(): void {
        this.afAuth.auth.signOut()
            .then(() => this.router.navigate(['/login']))
            .catch(error => {
                return error
            });
    }

}
