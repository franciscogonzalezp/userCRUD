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
  @Input() id!: number;
  user!: IUser;

  userService: UserService = inject(UserService)

  getUser() {
    this.userService.getUser(this.id).subscribe({
      next: (response) => {
        this.user = {
          "id": 55,
          "first_name": "Emilio",
          "last_name": "Alva Durán",
          "username": "emilio.alva",
          "email": "emilio.alvaduran@peticiones.online",
          "image": "https://i.pravatar.cc/500?u=emilio.alvaduran@peticiones.online"
      }
       /*  if(!response.username) {
          alert(response)
        }else {
          console.log("Usuario", response)
        } */
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
