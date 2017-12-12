import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;

  constructor(public af: AngularFireAuth,private router: Router) {
    this.af.authState.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/members');
      }
    });
}


onSubmit(formData) {
  if(formData.valid) {
    this.af.auth.signInWithEmailAndPassword(
      formData.value.email,
      formData.value.password
    ).then(
      (success) => {
      this.router.navigate(['/members']);
    }).catch(
      (err) => {
      this.error = err;
    })
  }
}

  ngOnInit() {
  }

}
