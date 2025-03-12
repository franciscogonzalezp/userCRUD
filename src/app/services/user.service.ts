import { inject, Injectable } from '@angular/core';
import { IResponse } from '../interfaces/iresponse.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint: string = "https://peticiones.online/api/users"
  private httpClient = inject(HttpClient);

  getAllUsers(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(this.endpoint);
  }

  getUser(id: number): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.endpoint}/${id}`)
  }

  createUser(body: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.endpoint, body)
  }

  deleteUser(id: number): Observable<IUser> {
    return this.httpClient.delete<IUser>(`${this.endpoint}/${id}`)
  }

  updateUser(body: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(`${this.endpoint}/${body.id}`, body)
  }
}
