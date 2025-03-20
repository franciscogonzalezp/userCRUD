import { Component, inject, Input } from '@angular/core';
import { FormUserComponent } from '../../components/form-user/form-user.component';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { toast } from 'ngx-sonner';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

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

  router = inject(Router)
  userService = inject(UserService)
  spinnerService = inject(NgxSpinnerService)

  getDataForm(user: IUser){
    this.spinnerService.show()
    if(this.operation === 'update') user._id = this.id
    const userObservable: Observable<IUser> = this.operation === 'new' ? this.userService.create(user) : this.userService.update(user)
    userObservable.subscribe({
      next: res => {
        this.spinnerService.hide()
        if(res.error){
          toast.error(`Se ha producido un error: ${res.error}`)
        } else {
          this.user = res
          toast.success("La operacion ha terminado correctamente")
          this.router.navigate(['/home'])
        }
      },
      error: msg => {
        this.spinnerService.hide()
        toast.error(`Se ha producido un error: ${msg.error}`)
      }
    })
  }

  getUser(){
    this.spinnerService.show()
    this.userService.getById(this.id).subscribe({
      next: res => {
        if(res.error){
          toast.error(`Se ha producido un error: ${res.error}`)
        } else {
          this.user = res
        }
        this.spinnerService.hide()
      },
      error: msg => {
        this.spinnerService.hide()
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
