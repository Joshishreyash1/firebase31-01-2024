import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";




@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

 constructor(private afAuth: AngularFireAuth, private router:Router) { }

userDate: any;

ngOnInit(){
  var data = JSON.parse(localStorage.getItem('user_data') || '{}');
  this.userDate = data;
  console.log(this.userDate)
}

logout(){
  console.log("Sign-out successful.")

  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    this.router.navigate(['phone'])
  }).catch((error) => {
    // An error happened.
  });


//  return this.afAuth.signOut().then(()=>{
  // this.router.navigate(['phone'])
//  })
}
}
