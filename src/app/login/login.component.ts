import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loginError = false;
  submitted = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loginError = false;
    this.submitted = true;

    this.userService.login(this.username, this.password).subscribe(response => {
      this.submitted = false;
      this.router.navigateByUrl('/taches');
    }, error => {
      this.loginError = true;
      this.submitted = false;
    });
  }

}
