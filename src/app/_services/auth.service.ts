import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import {AngularFirestore, AngularFirestoreDocument} from "angularfire2/firestore";
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
import {User} from "../_models/user.model";

@Injectable()

export class AuthService {
  currentUser;
  provider;
  user: Observable<firebase.User>;
  private usersDoc: AngularFirestoreDocument<User>;
  users: Observable<User>;
  usersCollection;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router ) {
    this.currentUser = afAuth.auth.currentUser;
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }


  login(email, password) {
    console.log('login creds', email, password);
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('success you logged in!', res);
      })
      .catch(err => console.log('you fucked up buddy', err));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(res => console.log('you successfully signed out', res))
      .catch(err => console.log('something went wrong', err));
  }

  register(email, password, data?: object) {
    console.log('reg', email, password);
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('success you registered', res);
        // this.router.navigate(['']);
        this.writeUserData(res);

      })
      .catch(err => {
        console.log('something went wrong while registering', err)
      });
  }

  // facebookLogin() {
  //   firebase.auth().signInWithPopup(this.provider).then((result) => {
  //     console.log('fb login result', result);
  //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //     const token = result.credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
  //     // ...
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     const credential = error.credential;
  //     // ...
  //   });
  // }

  writeUserData(user) {
    this.usersCollection.doc(user.uid).set({uid: user.uid, email: user.email});
  }
  updateUserData(id, data) {
    this.usersDoc = this.afs.doc<User>(`users/${id}`);
    this.usersDoc.update(data);
  }
}

