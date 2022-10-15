import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  private isApiReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public database: SQLiteObject;

    user : any;

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
    })
    }
    apiURL = 'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos';
  constructor(private http:HttpClient) { }

  apiState() {
    return this.isApiReady.asObservable();
  }


  

  obtenerUsuarios():Observable<any>{
    return this.http.get(this.apiURL+'/users/').pipe(
    retry(3)

    );
    }
}
