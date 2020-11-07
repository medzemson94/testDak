import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class LangueServicesService {
  constructor(private http: HttpClient) { }
createLangue(langue: any): any
{
    return this.http.post(API.CREATE, langue, httpOptions);
}

getOne(id: any): any{
    return  this.http.get(API.GET_ONE + id, httpOptions);
}
 getAll(): any{
   return this.http.get(API.GET_ALL, httpOptions);
 }
 update(langue: any, id): any{
   return this.http.patch(API.UPDATE + id, langue, httpOptions);
 }
 delete( id): any{
   console.log(id);
   return this.http.delete(API.DELETE + id);
}
}
