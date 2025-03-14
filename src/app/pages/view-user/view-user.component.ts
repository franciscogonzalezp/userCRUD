import { Component, inject, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-view-user',
  imports: [],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
  @Input() id!: string;
  user!: IUser;

  userService: UserService = inject(UserService)

  getUser() {
    this.userService.getUser(this.id).subscribe({
      next: (response) => {
        if(!response.username) {
          alert(response)
        }else {
          this.user = response
        }
      },
      error: (error) => {
        console.log("Error al consultar el usuario", error)
      }
    })
  }

  ngOnInit(){
    this.getUser()
  }
}
