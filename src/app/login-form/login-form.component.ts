import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { AuthenticationRequest } from '../model/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  notification:string|any = null;
  logginIn:boolean = false;

  authenticationRequest:AuthenticationRequest={
    login:'',
    pass:''
  }

  constructor(protected authService:AuthenticationService,
    private snackBar:MatSnackBar,
    private router:Router,
    private renderer:Renderer2) { }

  ngOnInit(): void {
  }

  clearForm():void{
    this.authenticationRequest={
      login:'',
      pass:''
    }
  }

  login():void{
    this.authService.authenticate(this.authenticationRequest);
  }

}
