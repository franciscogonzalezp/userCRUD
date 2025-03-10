import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'newuser', component: UserComponent},
  {path: 'user/:id', component: ViewUserComponent},
  {path: 'updateuser/:id', component: UserComponent},
  {path: '**', redirectTo: 'home'}
];
