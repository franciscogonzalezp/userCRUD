import { Component, inject, input, ViewChild } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { toast } from 'ngx-sonner';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card-user',
  imports: [RouterLink, ModalComponent],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {
  user = input<IUser>()
  userService = inject(UserService)

  @ViewChild(ModalComponent) modalUser!: ModalComponent;

  deleteBtnClick(){
    this.modalUser.open()
  }

  deleteUser(){
      this.userService.delete(this.user()?._id).subscribe({
        next: (response) => {
          if(response.error) {
            toast.error(`Se ha producido un error: ${response.error}`)
          }else {
            toast.success("Se ha eliminado correctamente al usuario")
          }
        },
        error: (msg) => {
          toast.error(`Se ha producido un error: ${msg.error}`)
        }
      })
      this.modalUser.close()
    }

  ngOnInit(){ }
}
