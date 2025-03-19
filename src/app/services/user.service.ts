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

  getAll(page: number = 1, per_page: number = 6): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${this.endpoint}?page=${page}&total=${per_page}`);
  }

  getById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.endpoint}/${id}`)
  }

  create(body: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.endpoint, body)
  }

  delete(id: string | undefined): Observable<IUser> {
    return this.httpClient.delete<IUser>(`${this.endpoint}/${id}`)
  }

  update(body: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(`${this.endpoint}/${body._id}`, body)
  }
}
