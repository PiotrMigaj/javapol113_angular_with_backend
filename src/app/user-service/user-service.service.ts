import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse } from '../model/pagination';
import { CreateUserRequest, UserDTO } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  loadingList: boolean = false;

  constructor(private httpClient: HttpClient) { }

  public getDefautUserRequest(): CreateUserRequest {
    return {
      login: "",
      pass: "",
      name: "",
      surname: ""
    }
  }

  public users:UserDTO[]=[];
  public totalElements:number = 0;

  private USER_BASE_URL:string = "http://localhost:8080/api/user/"

  public registerUser(createUserRequest: CreateUserRequest) : Observable<Object>{
    return this.httpClient.post(this.USER_BASE_URL, createUserRequest);
  }

  public loadUsersFromBackend(page?: number | null, size?: number | null):void{

    let httpParams = new HttpParams()
        .set('page',page ? page : 0)
        .set('size',size ? size : 10);

    this.loadingList = true;
    this.httpClient.get<PageResponse<UserDTO>>(this.USER_BASE_URL,{params:httpParams})
      .subscribe({
        next: (data)=>{
          this.loadingList = false;
          console.log(data);
          this.users = data.content;
          this.totalElements = data.totalElements;
        },
        error: (error)=>{
          this.loadingList = true;
          console.log(error);
        }
      })
  }

  public deleteUserFromBackend(userId:number):Observable<Object>{
    return this.httpClient.delete(this.USER_BASE_URL+userId);
  }


}
