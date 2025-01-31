import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

var config = {
  apiKey: 'AIzaSyAtVSWNuS6AIgtvOArubEiFkhGNRvjkFOo',
  authDomain: 'phone-auth-8a5c4.firebaseapp.com',
  projectId: 'phone-auth-8a5c4',
  storageBucket: 'phone-auth-8a5c4.firebasestorage.app',
  messagingSenderId: '911643832009',
  appId: '1:911643832009:web:f2980418f4acd33c39a718',
};

@Component({
  selector: 'app-phonenumber',
  standalone: false,

  templateUrl: './phonenumber.component.html',
  styleUrl: './phonenumber.component.css',
})
export class PhonenumberComponent {

  phoneNumber!: string;
  otp!: string;
  verificationId!: string;
  private recaptchaVerifier!: firebase.auth.RecaptchaVerifier;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.setupRecaptcha();
  }

  setupRecaptcha() {
    this.afAuth.useDeviceLanguage();
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.sendOTP();
      }
    });
    this.recaptchaVerifier.render();
  }

  sendOTP() {
    const appVerifier = this.recaptchaVerifier;
    this.afAuth.signInWithPhoneNumber(this.phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code.
        this.verificationId = confirmationResult.verificationId;
      }).catch((error) => {
        // Error; SMS not sent.
        console.error('Error during signInWithPhoneNumber', error);
      });
  }
  
  verifyOTP() {
    const credential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.otp);
    this.afAuth.signInWithCredential(credential).then((result) => {
      // User signed in successfully.
      const user = result.user;
      // Navigate to dashboard or perform other actions.
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.error('Error while checking the verification code', error);
    });
  }
}
  // phoneNumber: any;
  // reCaptchaVerifier: any;

  // constructor(private router: Router) {}

  // ngOnInit() {
  //   // firebase.initializeApp(config);
  // }

  // getOTP() {
  //   this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign', {
  //     size: 'invisible',
  //   });
  //   console.log(this.reCaptchaVerifier);

  //   console.log(this.phoneNumber);
  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier)
  //     .then((confirmationResult) => {
  //       localStorage.setItem(
  //         'verificationId',
  //         JSON.stringify(confirmationResult.verificationId)
  //       );
  //       this.router.navigate(['code'])
  //     })
  //     .catch((error) => {
  //       alert(error.massage + " hello");
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 5000);
  //     });
  // }

