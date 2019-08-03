import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private title: string;

  constructor(private authService: AuthenticationService) {
    this.title = 'Note-App';
   }

  ngOnInit() {
  }

}
