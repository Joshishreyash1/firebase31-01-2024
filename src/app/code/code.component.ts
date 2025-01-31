import { Component } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-code',
  standalone: false,
  
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {
 otp!:string;
 verify:any;

 constructor(private router:Router){}

 ngOnInit(){
   this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
   console.log(this.verify)
 }

  config ={
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  }

  onOtpChange(otpCode:any){
    this.otp = otpCode;
    console.log(this.otp)
  }

  handelClick(){
    var credential = firebase.auth.PhoneAuthProvider.credential(this.verify,this.otp);

    firebase.auth().signInWithCredential(credential).then((response)=>{
      console.log(response)
      localStorage.setItem('user_data',JSON.stringify(response))
      this.router.navigate(['/dashboard']);
    }).catch((error)=>{
      alert(error.massage)
    })
  }
}
