import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user:UserModel;
  form:FormGroup;

  constructor(private auth:AuthService) { 
    this.user = new UserModel();
  }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(''),
      'email': new FormControl(''),
      'password': new FormControl('', Validators.required),
      'passwordConfirmation': new FormControl(''),
    });

    this.form.controls['passwordConfirmation'].setValidators([
      Validators.required,
      this.validPassword.bind(this)
    ]);
  }

  signup(){
    console.log(this);
    // this.auth.signup(this.user, this.form.controls['passwordConfirmation'].value).subscribe(resp => {
    //   console.log(resp);
    // }, (err) => {
    //   console.log(err.error.error);
    // });
  }

  validPassword(control: FormControl):{ [s:string]:boolean }{

    if ( control.value !== this.form.controls['password'].value) {
      return{
        noigual:true
      }
    }
    return null
  }

}
