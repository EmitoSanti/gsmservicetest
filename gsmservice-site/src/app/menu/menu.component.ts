import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth/auth.service';
import { ArticlesService } from '../articles/articles.service';
import { MatMenuTrigger } from '@angular/material/menu';
@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	title = 'GSM service';
	@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
	constructor(private authService: AuthService, private router: Router, private articlesService: ArticlesService) { }
	ngOnInit(): void {
		if (localStorage.getItem('auth_token')) {
			this.authService.getPrincipal().subscribe(
				(data: User) => { // Success
					return this.authService.usuarioLogueado = data;
				},
				(error) => {
					console.error(error);
				}
			);
		}
	}
	navigateMenu(tag: string) {
		if(tag) { // despues validar se es admin para volver a validad la navegacion a users
			this.router.navigate([`/${tag}`]);
		}
	}
	cosa() {
		this.authService.getPrincipal().subscribe(
			(data: User) => { // Success
				return this.authService.usuarioLogueado = data;
			},
			(error) => {
				console.error(error);
			}
		);
		console.log("cosa");
		// this.articlesService.getConfig().subscribe(
		//   (data) => { // Success
		//     console.log("data: " + JSON.stringify(data));
		//   },
		//   (error) => {
		//     console.error(error);
		//   }
		// );
	}

	get usuarioLogueado(): User {
		return this.authService.usuarioLogueado;
	}

  logout() {
		this.authService.logout().subscribe(
			() => { // Success
				this.router.navigate(['/']);
			},
			(error) => {
				console.error(error);
			}
		);
  }
}
