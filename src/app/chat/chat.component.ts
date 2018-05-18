import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { EventService } from './../demo-utils/event.service';
import { AuthService } from './auth.service';
import { User } from './../events';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  items: AngularFireList<any>[] = [];
  user: Observable<firebase.User>;
  userName: string;
  // items = [];
  emailsArray = [];
  itemschild = [];
  name: any;
  msgVal: string;
  userObj: any;
  uid: string;
  hideFrnds = false;
  frndDetail = {} as User;
  friend = {
    email: '',
    uid: ''
  };
  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private eve: EventService,
    private _ngZone: NgZone,
    private cdref: ChangeDetectorRef,
    private as: AuthService) {
    // this.items = db.list('items');
  }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList() {
    this.eve.getUsers().then(data => {
      this.emailsArray = data.data;
    }).catch(err => {
      console.log(err, '456');
    });
  }

  getUrFriend(email: string, id: number) {
    const frnd = this;
    this.eve.getUserData(id).then(data => {
      this.frndDetail = data.data;
      const user = this.afAuth.auth.currentUser;
      firebase.database().ref('users/').orderByChild('email').equalTo(email).once('value').then(function (snap) {
        const friendDet = snap.val();
        for (let i in friendDet) {
          if (true) {
            const r = i;
            frnd.friend.email = friendDet[r].email;
            frnd.friend.uid = friendDet[r].uid;
            frnd.hideFrnds = false;
            frnd.getChat(localStorage.getItem('userId'), frnd.frndDetail.id, user.uid, frnd.friend.uid);
          }
        }
      });
    }).catch(err => {

    });
    console.log(this.friend, 'friend');
  }

  signUp() {
    firebase.auth().createUserWithEmailAndPassword(localStorage.getItem('email'), '123456').then(data => {
      const user = this.afAuth.auth.currentUser;
      this.login();
      user.updateProfile({
        displayName: localStorage.getItem('name'),
        photoURL: 'https://example.com/jane-q-user/profile.jpg'
      }).then(function () {
        // Update successful.
      }).catch(function (error) {
        // An error happened.
      });
      this.saveUsers(data);
    }).catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage, '456');
    });
  }

  login() {
    const selfie = this;
    this.afAuth.authState.subscribe((auth) => {
      this.name = auth.displayName;
    });
    firebase.auth().signInWithEmailAndPassword(localStorage.getItem('email'), '123456').then(data => {
      const user = this.afAuth.auth.currentUser;
      selfie.uid = user.uid;
      selfie.hideFrnds = true;
      firebase.database().ref('users/').orderByKey().startAt(user.uid).endAt(user.uid).on('value', function (snap) {
        const userObj = snap.val();
        selfie.userObj = Object.keys(userObj).map(function (key) { return userObj[key]; });
        selfie.uid = selfie.userObj[0].id;
        return firebase.database().ref('.info/connected').on('value', function (connected) {
          if (connected) {
            let status = connected ? 'online' : 'offline';
            selfie.as.updateStatus(status, user.uid);
          }
        });
      }, function (err) {
        console.log('err', +err);
      });
      selfie.cdref.markForCheck();
      if (user.displayName === null) {
        user.updateProfile({
          displayName: localStorage.getItem('name'),
          photoURL: 'https://example.com/jane-q-user/profile.jpg'
        }).then(function () {
          // Update successful.
        }).catch(function (error) {
          // An error happened.
        });
      }
    }).catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, '123', errorMessage);
      if (errorCode === 'auth/user-not-found') {
        selfie.signUp();
      }
    });
  }


  getChat(userId: any, frndId: number, uId: string, fId: string) {
    console.log(userId, frndId, 'last', uId, fId);
    const self = this;
    const user = this.afAuth.auth.currentUser;
    console.log(self.friend.uid, user.uid);
    if (userId < frndId) {
      console.log('user');
      const t = firebase.database().ref('chatRoom/' + user.uid + self.friend.uid);
      t.on('value', function (snapshot) {
        const variab = snapshot.val();
        self.items = Object.keys(variab).map(function (key) { return variab[key]; });
        self.cdref.markForCheck();
      });
    } else {
      const t = firebase.database().ref('chatRoom/' + self.friend.uid + user.uid);
      t.on('value', function (snapshot) {
        const variab = snapshot.val();
        self.items = Object.keys(variab).map(function (key) { return variab[key]; });
        self.cdref.markForCheck();
      });
    }
  }


  createRoom() {
    let i = 0;
    const newPostKey = firebase.database().ref('chatRoom/' + 'RDByDHFkdcO6dP8yVxN3AJuPlJr2' + 'jf1JPFjEHEbbJ6JYb22KHm7ygg42').push().key;
    const update = { msg: 'hello' };
    firebase.database().ref('chatRoom/' + '1' + '3').child(newPostKey)
      .set({
        msg: 'HELLO23',
        time: new Date().toISOString(),
        rid: 1
      });
  }



  saveUsers(o: any) {
    firebase.database().ref('users/' + o.uid).set({
      email: o.email,
      name: o.displayName,
      uid: o.uid
    });
  }


  chatSend(theirMessage: string) {
    firebase.database().ref('chat/' + this.uid).set({
      msg: theirMessage
    });
  }

  chatProceed(theirMessage: string) {
    const u = this;
    const user = this.afAuth.auth.currentUser;
    const newPostKey = firebase.database().ref('chatRoom/' + user.uid + u.friend.uid).push().key;
    const ui = +localStorage.getItem('userId');
    if (ui < this.frndDetail.id) {
      firebase.database().ref('chatRoom/' + user.uid + u.friend.uid).child(newPostKey)
        .set({
          msg: theirMessage,
          time: new Date().toISOString(),
          senderName: user.displayName,
          senderId: user.uid,
          rId: u.friend.uid
        });
    } else {
      console.log(localStorage.getItem('userId'), this.frndDetail.id, 'frnd');
      firebase.database().ref('chatRoom/' + u.friend.uid + user.uid).child(newPostKey)
        .set({
          msg: theirMessage,
          time: new Date().toISOString(),
          senderName: user.displayName,
          senderId: user.uid,
          rId: u.friend.uid
        });
    }
    this.getChat(localStorage.getItem('userId'), u.frndDetail.id, '', '');
    this.msgVal = '';
  }

  logout() {
    const log = this;
    return this.afAuth.auth.signOut().then(function () {
      log.hideFrnds = false;
      const user = this.afAuth.auth.currentUser;
      log.name = '';
      firebase.database().ref().child(`users/${user.uid}`)
      .onDisconnect()
      .update({ status: 'offline' });
      if (this.user !== null) {
        this.userName = user.displayName;
        console.log(`[constructor]userName : ${this.userName}`);
      }
    }).catch(function (err) {
      console.log(err);
    });
  }
}
