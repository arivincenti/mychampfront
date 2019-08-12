import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user:UserModel;

  constructor(private auth:AuthService) { 
    this.user = new UserModel();
  }

  ngOnInit() {
  }

  signup(form:NgForm){
    this.auth.signup(this.user, form.controls['passwordConfirmation'].value).subscribe(resp => {
      console.log(resp);
    }, (err) => {
      console.log(err.error.error);
    })
  }

}
