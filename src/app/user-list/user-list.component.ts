import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../user-service/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = [
    'identifier',
    'login',
    'name',
    'surname',
    'delete-button'
  ]

  pageDefaultEvent:PageEvent= {
    pageIndex: 0,
    pageSize: 3,
    length: 0
  }

  constructor(public userService:UserServiceService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.loadUsersFromBackend(this.pageDefaultEvent.pageIndex,this.pageDefaultEvent.pageSize);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUserFromBackend(userId)
      .subscribe({
        next: (data) => {
          this.snackBar.open('User has been deleted', undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'start',
            duration: 5000
          })
          this.userService.loadUsersFromBackend(this.pageDefaultEvent.pageIndex,this.pageDefaultEvent.pageSize);
        },
        error: (error) => {
          this.snackBar.open(`Error: ${error.message}`, undefined, {
            verticalPosition: 'top',
            horizontalPosition: 'start',
            duration: 5000,
            panelClass: "error-snackbar",
          })
          console.log(error);
          this.userService.loadUsersFromBackend(this.pageDefaultEvent.pageIndex,this.pageDefaultEvent.pageSize);
        }
      })
  }

  loadUsers(pageEvent:PageEvent):void{
    this.userService.loadUsersFromBackend(pageEvent.pageIndex,pageEvent.pageSize);
  }

}
