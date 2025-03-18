import { Component, ElementRef, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  selector: 'app-view-user',
  imports: [RouterLink, ModalComponent],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
  @Input() id!: string;
  user: IUser = {_id: '', id: 0, first_name:'',  last_name: '',  username: '', email: '',  image: '' };
  showModal: Boolean = false

  userService: UserService = inject(UserService)
  router = inject(Router)
  @ViewChild(ModalComponent) modalUser!: ModalComponent;

  getUser() {
    this.userService.getById(this.id).subscribe({
      next: (response) => {
        if(response.error) {
          toast.error(`Se ha producido un error: ${response.error}`)
        }else {
          this.user = response
        }
      },
      error: (msg) => {
        toast.error(`Se ha producido un error: ${msg.error}`)
      }
    })
  }

  deleteBtnClick(){
    this.modalUser.open()
  }

  deleteUser(){
    this.userService.delete(this.id).subscribe({
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
    this.router.navigate(['/home'])
  }

  ngOnInit(){
    this.getUser()
  }
}
