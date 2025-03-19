import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';
import { CardUserComponent } from "../../components/card-user/card-user.component";
import { toast } from 'ngx-sonner';
import { SkeletonCardComponent } from '../../components/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-home',
  imports: [CardUserComponent, SkeletonCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usersList: IUser[] = []
  userService: UserService = inject(UserService);
  page: number = 1
  totalPages: number = 0
  loading: boolean = true

  getUsers() {
    this.userService.getAll(this.page).subscribe({
      next: response => {
        this.usersList = response.results
        this.totalPages = response.total_pages
        this.loading = false
      },
      error: msg => {
        toast.error(`Se ha producido un error: ${msg.error}`)
        this.loading = false
      }
    })
  }

  paginationBtnClick(btn: string){
    this.page = btn === 'next' ? ++this.page : --this.page;
    this.loading = true
    this.getUsers()
  }

  ngOnInit(){
    this.getUsers();
  }
}
