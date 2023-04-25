import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 

interface User {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.scss']
})
export class Login1Component implements OnInit {

  email: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    this.http.post<User>('/api/login1', credentials).subscribe(
      user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/menu']);
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
  }
  /*public onSubmit(): void {
    const url = 'http://localhost:8085/login1';

    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post(url, credentials).subscribe(
      (response) => {
        // Login successful
        localStorage.setItem('userSession', JSON.stringify(response));
        this.router.navigate(['/menu']);
      },
      (error) => {
        // Login failed
        this.message = 'Incorrect username or password';
      }
    );
}*/
}