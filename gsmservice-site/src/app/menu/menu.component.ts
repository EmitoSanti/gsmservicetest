import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  ngOnInit(): void {
    if (localStorage.getItem('auth_token')) {
      this.authService.getPrincipal();
    }
  }
  cosa() {
    console.log("cosa");
    this.authService.getConfig().subscribe(
      (data) => { // Success
        console.log("data: " + JSON.stringify(data));
      },
      (error) => {
        console.error(error);
      }
    );
  }
  get usuarioLogueado(): User {
    return this.authService.usuarioLogueado;
  }

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    // this.authService
    //   .logout()
    //   .then(_ => {
    //     this.router.navigate(['/']);
    //   })
    //   .catch(error => {});
  }
}
