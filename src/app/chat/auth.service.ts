import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

    userId: string; // current user uid

    constructor(private afAuth: AngularFireAuth,
        private db: AngularFireDatabase) {

        /// Subscribe to auth state in firebase
        this.afAuth.authState
            .do(user => {
                if (user) {
                    this.userId = user.uid;
                    // this.updateOnConnect();
                    this.updateOnDisconnect();
                }

            })
            .subscribe();


    }

    /// Helper to perform the update in Firebase
    updateStatus(status: string, u: string) {
        if (!u) {
            return;
        }

        this.db.object(`users/` + u).update({ status: status });
    }


    /// Updates status when connection to Firebase starts
    // private updateOnConnect() {
    //     const u = this;
    //     return firebase.database().ref('.info/connected').on('value', function (connected) {
    //         if (connected) {
    //             let status = connected ? 'online' : 'offline';
    //             u.updateStatus(status, );
    //         }
    //     });
    //     // this.db.object('.info/connected')
    //     //     .do(connected => {
    //     //         let status = connected.$value ? 'online' : 'offline';
    //     //         this.updateStatus(status);
    //     //     })
    //     //     .subscribe();
    // }

    private updateOnDisconnect() {
        firebase.database().ref().child(`users/${this.userId}`)
            .onDisconnect()
            .update({ status: 'offline' });
    }

}
