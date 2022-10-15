import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
    })
    }
    apiURL = 'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos';
  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(this.apiURL+'/users/').pipe(
    retry(3)
    );
  }
 getSubjects():Observable<any>{
    return this.http.get(this.apiURL+'/ramos/').pipe(
    retry(3)
    );
    }
}
