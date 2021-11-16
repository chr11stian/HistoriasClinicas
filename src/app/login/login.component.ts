import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInterface } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = '';
  password = '';

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    
  }

  Ingresar(){
    let credenciales = {
      dni : this.usuario,
      password : this.password
    }
    
    let cr = JSON.parse(JSON.stringify(credenciales));
    this.router.navigate(['dashboard']);
    
    /*this.loginService.user_login(cr).subscribe(resp => {
      
      this.router.navigate(['page']);
    })*/
  }

    mostrarClave() {
        // var x = document.getElementById("myInput");
        // if (x.type === "password") {
        //     x.type = "text";
        // } else {
        //     x.type = "password";
        // }
    }

}
