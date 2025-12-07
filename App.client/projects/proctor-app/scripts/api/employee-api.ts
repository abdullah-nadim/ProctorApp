import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SETTINGS } from '@scripts/settings';
import { Employee } from '@models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeAPI {
  private readonly baseUrl = SETTINGS.API_BASE_URL + '/employee';
  constructor(private http: HttpClient) {}

  // Employee
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}`);
  }
  
  getActiveEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/active`);
  }
  
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }
  
  createEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}`, employee);
  }
  
  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, employee);
  }
} 
