import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth/auth.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	title = 'GSM service';
	@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
	public usuarioLogueado;
	
	constructor(private authService: AuthService, private router: Router) {}
	ngOnInit(): void {
		if (localStorage.getItem('auth_token')) {
      console.log("MenuComponent localStorage: " + localStorage.getItem("auth_token") + " " + localStorage.length);
			this.authService.getPrincipal().subscribe( userCurrent => this.usuarioLogueado = userCurrent);
		}
	}

	navigateMenu(tag: string) {
		if(tag) { // despues validar se es admin para volver a validad la navegacion a users
			this.router.navigate([`/${tag}`]);
		}
	}

  logout() {
		this.authService.logout().subscribe(
			() => { // Success
				this.router.navigate(['/']);
				location.reload(); // arreglar porque esto es un parche cuando se desloguea debe desaparecer el componenete menu
			},
			(error) => {
				console.error(error);
			}
		);
  }
}
