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
            'Access-Control-Allow-Origin': '*'
        })
    }
    apiURURL = 'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos';

    apiASURL = 'https://my-json-server.typicode.com/victorrosendo/repoSeccionAsigSeccion';

    apiLURL = 'https://my-json-server.typicode.com/victorrosendo/repoListadoAutos';
    constructor(private http: HttpClient) { }
    getUsers(): Observable<any> {
        return this.http.get(this.apiURURL + '/users/').pipe(
            retry(3)
        );
    }
    getSubjects(): Observable<any> {
        return this.http.get(this.apiURURL + '/ramos/').pipe(
            retry(3)
        );
    }
    getSections(): Observable<any> {
        return this.http.get(this.apiASURL + '/seccion/').pipe(
            retry(3)
        );
    }
    getSubSect(): Observable<any> {
        return this.http.get(this.apiASURL + '/asigsecci/').pipe(
            retry(3)
        );
    }
    getList(): Observable<any> {
        return this.http.get(this.apiLURL + '/listado/').pipe(
            retry(3)
        );
    }

}
