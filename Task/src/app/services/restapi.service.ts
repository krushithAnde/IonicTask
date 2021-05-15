import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  employee: any;

  constructor(public http: HttpClient) {
    this.employee = null;
  }
  getEmployees(): Observable<any> {
    return this.http.get('http://localhost:8080/employees');
  }
  getEmployee(id): Observable<any> {
    return this.http.get('http://localhost:8080/employees/' + id)
  }
  createEmployee(employee): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/employees', JSON.stringify(employee), { headers: headers })

  }
  deleteEmployee(id): Observable<any> {
    return this.http.delete('http://localhost:8080/employees/' + id)
  }
}