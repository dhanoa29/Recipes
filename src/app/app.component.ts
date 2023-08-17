import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my-project';

  myScriptElement: HTMLScriptElement;
  constructor(private authService: AuthService) {
    this.myScriptElement = document.createElement('script');
    this.myScriptElement.src =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(this.myScriptElement);
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
