import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"



@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private apiUrl = "http://localhost:3000";



    constructor(private http: HttpClient) { }



    createUser(data: any): Observable<any>{
        return this.http.post(`${this.apiUrl}/user`, data)
    }

    login(data: { email: string, password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/user/login`, data);
      }

    
}