import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.user = user);
  }

  downloadData(): void {
    this.userService.downloadData().subscribe(response => {
      this.downloadFile(response, 'text/json');
    });
  }

  downloadFile(data: any, type: string) {
    const blob = new Blob([data], { type });
    console.log(blob);
    const url = window.URL.createObjectURL(blob);
    console.log(url);

    const anchor = document.createElement('a');
    anchor.download = 'mes-donnees.json';
    anchor.href = url;
    anchor.click();
  }

}
