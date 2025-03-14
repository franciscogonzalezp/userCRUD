import { Component, inject, Input } from '@angular/core';
import { FormUserComponent } from '../../components/form-user/form-user.component';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  imports: [FormUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() id!: string;
  user!: IUser;
  operation: string = "new"

  userSevice = inject(UserService)

  getDataForm(user: IUser){
    console.log("Data form user", user)
  }

  getUser(){
    this.userSevice.getUser(this.id).subscribe({
      next: res => {
        this.user = res
      },
      error: error => {
        console.log("Error", error)
      }
    })
  }

  ngOnInit(){
    if(this.id) {
      this.getUser()
      this.operation = 'update'
    }
  }
}
