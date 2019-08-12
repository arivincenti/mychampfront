import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:UserModel;
  form:FormGroup;

  constructor(private auth:AuthService, private router:Router) { 
    this.user = new UserModel();
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  login(){

      console.log("Formulario posteado");
      console.log(this.form);

    // Swal.fire({
    //   allowOutsideClick: false,
    //   type: 'info',
    //   text: 'Espere por favor'
    // });

    // Swal.showLoading();

    // this.auth.getToken(this.user).subscribe(data => {
    //   console.log(data);
    //   this.router.navigateByUrl('/tournaments');
    //   Swal.close();

    // }, (err) => {
    //   console.log(err);
    //   Swal.fire({
    //     allowOutsideClick: false,
    //     type: 'error',
    //     title: 'Error al iniciar sesión',
    //     text: err.error.message
    //   });
    // });
  }
}
