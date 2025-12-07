import { Injectable } from '@angular/core';
import { EmployeeAPI } from '@scripts/api/employee-api';
import { Employee } from '@models/employee';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private api: EmployeeAPI) {}

  // Employee
  getEmployees(): Observable<Employee[]> {
    return this.api.getEmployees();
  }
  
  getActiveEmployees(): Observable<Employee[]> {
    return this.api.getActiveEmployees();
  }
  
  getEmployeeById(id: number): Observable<Employee> {
    return this.api.getEmployeeById(id);
  }
  
  createEmployee(employee: Employee): Observable<any> {
    return this.api.createEmployee(employee);
  }
  
  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.api.updateEmployee(id, employee);
  }
} 
