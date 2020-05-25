import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  submitted = false;
  user = new User();
  passwordConfirmation = '';
  alreadyTakenEmail = false;
  alreadyTakenUsername = false;
  registrationSuccessful = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.alreadyTakenEmail = false;
    this.alreadyTakenUsername = false;
    this.submitted = true;

    this.userService.add(this.user).subscribe(user => {
      this.submitted = false;
      this.registrationSuccessful = true;
    }, error => {
      const errors = error.error;
      this.submitted = false;
      if ('username' in errors) {
        this.alreadyTakenUsername = true;
        console.log(this.alreadyTakenUsername);
      }
      if ('email' in errors) {
        this.alreadyTakenEmail = true;
      }
    });
  }

}
