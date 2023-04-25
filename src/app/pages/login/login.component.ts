/*import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
errorMessage = '';
public mail: string;
  public password: string;
  public message: string;

  constructor(private http: HttpClient, private router: Router) {
   }

  ngOnInit() {
  }

  public onSubmit(): void {
    const url = 'http://localhost:8085/';

    const credentials = {
      mail: this.mail,
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
}

}

*/

/*export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    this.http.post<User>('/api/login', credentials).subscribe(
      user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/menu']);
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
  }
}*/

import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
errorMessage = '';
  constructor(private router: Router, private auth: AuthenticationService, private httpClient: HttpClient) {
   }

  ngOnInit() {
  }

  onLogin(user) {
    this.errorMessage='';
    console.log(user);
    this.auth.login(user)
      .subscribe(
        resp => {

       //  this.auth.convertToUser_= true;
          let jwt = resp.headers.get('Authorization');
          this.auth.saveToken(jwt);

          this.router.navigateByUrl("/menu");
        },
        err => {
        console.log(err);
          this.errorMessage='Vérifier vos informations';

        }
      );
   // this.router.navigateByUrl("/menu");
  }

  isAdmin() {
    return this.auth.isAdmin();
  }

  isUser() {
    return this.auth.isUser();
  }

  isAuthentificated() {
    return this.auth.isAuthentificated();
  }


}
