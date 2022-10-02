import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_BASE_URL } from '../model/constants';
import { AuthenticationRequest, UserDTO } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authorizationHeader: string|null=null;
  loggedInUser:UserDTO|null = null;
  logginIn:boolean = false;

  constructor(private httpClient:HttpClient) {

   }

   authenticate(request:AuthenticationRequest):void{
     this.httpClient.post<UserDTO>("http://localhost:8080/login",request,{
       observe:'response',
       withCredentials:false
     })
     .subscribe({
       next:(data)=>{
         console.log('Success logging in!');
        const authorizationHeader=data.headers.get('Authorization');
        this.authorizationHeader = authorizationHeader;
        this.loggedInUser = data.body;
        console.log(this.loggedInUser);
        this.logginIn = false;
       },
       error:(error)=>{
        console.log('Errod logging in: '+error);
        this.authorizationHeader = null;
        this.loggedInUser = null;
        this.logginIn=false;
       }
     })
   }
}
