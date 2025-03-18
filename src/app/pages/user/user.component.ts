import { Component, inject, Input } from '@angular/core';
import { FormUserComponent } from '../../components/form-user/form-user.component';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { toast } from 'ngx-sonner';
import { Observable } from 'rxjs';

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

  userService = inject(UserService)

  getDataForm(user: IUser){
    if(this.operation === 'update') user._id = this.id
    const userObservable: Observable<IUser> = this.operation === 'new' ? this.userService.create(user) : this.userService.update(user)
    userObservable.subscribe({
      next: res => {
        if(res.error){
          toast.error(`Se ha producido un error: ${res.error}`)
        } else {
          this.user = res
          toast.success("La operacion ha terminado correctamente")
        }
      },
      error: msg => {
        toast.error(`Se ha producido un error: ${msg.error}`)
      }
    })
  }

  getUser(){
    this.userService.getById(this.id).subscribe({
      next: res => {
        this.user = res
      },
      error: msg => {
        toast.error(`Se ha producido un error: ${msg.error}`)
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
