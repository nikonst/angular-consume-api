import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../interface/user';
import { Info } from '../interface/info';
import { Response } from '../interface/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl: string  = "https://randomuser.me/api/"

  constructor(private http: HttpClient) { }

  //Fetch users
  getUsers(size: number = 10): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/?results=${size}`).pipe(
      map(this.processResponse)
    )
  }

  //Fetch one user by id
  getUser(uuid: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/?uuid=${uuid}`).pipe(
      map(this.processResponse)
    )
  }

  private processResponse(response: any ): Response {
    return {
      info: {...response.info },
      result: response.results.map((user: any) => ({
        uuid: user.login.uuid,
        firstname: user.name.first,
        lastname: user.name.last,
        email: user.email,
        username: user.login.username,
        gender: user.gender,
        address: `${user.location.street.number} ${user.location.street.name} ${user.location.city} ${user.location.street.country}`,
        dateOfBirth: user.dob.date,
        phone: user.phone,
        imgUrl: user.picture.medium,
        coordinate: {latitude: +user.location.coordinates.latitude, longitude: +user.location.coordinates.longitude}
      }))
    }
  }
}
