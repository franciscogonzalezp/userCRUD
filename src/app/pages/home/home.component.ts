import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';
import { CardUserComponent } from "../../components/card-user/card-user.component";

@Component({
  selector: 'app-home',
  imports: [CardUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usersList: IUser[] = []
  userService: UserService = inject(UserService);

  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: response => {
        this.usersList = response.results
      },
      error: error => {
        console.log("Error", error)
      }
    })
  }

  ngOnInit(){
    this.getUsers();
  }
}
