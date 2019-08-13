import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit
{

  user: UserModel;
  form: FormGroup;

  constructor(private auth: AuthService, private router: Router)
  {
  }

  ngOnInit()
  {
    this.form = new FormGroup({
      'name': new FormControl(''),
      'email': new FormControl('', Validators.required, this.existEmail),
      'password': new FormControl('', Validators.required),
      'passwordConfirmation': new FormControl(''),
    });

    this.form.controls['passwordConfirmation'].setValidators([
      Validators.required,
      this.validPassword.bind(this)
    ]);
  }

  signup()
  {
    this.user = new UserModel();

    this.user.name = this.form.get('name').value;
    this.user.email = this.form.get('email').value;
    this.user.password = this.form.get('password').value;
    let confirmPassword = this.form.get('passwordConfirmation').value;

    Swal.fire({
      title: 'Creando la cuenta',
      text: 'Espere un momento por favor',
      type: 'info'
    });
    Swal.showLoading();

    this.auth.signup(this.user, confirmPassword).subscribe(resp => {
      console.log(resp);
      Swal.close();
      this.router.navigateByUrl('/login');
    }, (err) => {
      Swal.fire({
        title: 'Error al crear la cuenta',
        text: err,
        type: 'error'
      });
      console.log(err.error.error);
    });
  }

  validPassword(control: FormControl): { [s: string]: boolean }
  {
    if (control.value !== this.form.controls['password'].value)
    {
      return {
        noigual: true
      }
    }
    return null
  }

  existEmail(control: FormControl): Promise<any> | Observable<any>
  {
    let promise = new Promise((resolve, reject) =>
    {
      setTimeout(() =>
      {
        if (control.value === "arivincenti@gmail.com")
        {
          resolve({ exist: true });
        } else
        {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }

}
