import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;
  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => (this.isLogged = user));
  }

  async onLogin(user: any): Promise<Boolean> {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        localStorage.setItem('token', userCredential.user.uid)
        return true
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            console.log('error', "email invalido");
            break;
          case "auth/wrong-password":
            console.log('error', "clave invalida");
            break;
          case "auth/too-many-requests":
            console.log('error', "A realizados demaciados intentos")
        }
        return false
      });
  }


  async onRegister(user: any) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    }
    catch (error) {
      console.log('Error, en registro');
    }
  }

  GetCurrentUser() {
    return this.afAuth.currentUser;
  }

  LogOutCurrentUser() {
    this.afAuth.signOut();
  }

}