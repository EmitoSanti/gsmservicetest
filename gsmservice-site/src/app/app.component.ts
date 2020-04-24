import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from './auth/auth.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Observable, of } from 'rxjs';
import { catchError, take, first } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GSM service';
	@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
	usuarioLogueado: User;
	currentUser: User;
	permissionsUser: string[];
	//usuarioLogueado = this.authService.usuarioLogueado;
	constructor(private authService: AuthService, private router: Router) {
		console.log("AppComponent");
		this.currentUser = this.authService.currentUserValue;
		//this.permissionsUser = this.authService.currentUserValue.permissions;
		if (localStorage.getItem('auth_token')) {
			this.authService.getPrincipal()
				.subscribe( 
					(response) => {
						this.currentUser = this.authService.currentUserValue;
						//this.permissionsUser = this.authService.currentUserValue.permissions;
						console.log("permissionsUser : " + JSON.stringify(this.permissionsUser));
						// return response;
					},((error: any) => {
						console.log(error);
						//return of("Datos no encontrados");
					})
			);
		}
	}
	ngOnInit(): void {
		this.getCurrentUser();
		//console.log("this.usuarioLogueado ngOnInit: " + JSON.stringify(this.usuarioLogueado));
	}
	public get usuarioLogueadoA(): User {
		return this.authService.currentUserValue;
	}
	public get getUserpermissions(): User {
		return this.currentUser;
	}
	getCurrentUser() {
		console.log("App Component getCurrentUser");
		if (localStorage.getItem('auth_token')) {
			this.authService.getPrincipal()
				.subscribe( 
					(response) => {
						this.currentUser = this.authService.currentUserValue;
						console.log("App Component response : " + JSON.stringify(response));
					}
			);
		}
	}

	navigateMenu(tag: string) {
		if(tag) { // despues validar se es admin para volver a validad la navegacion a users
			this.router.navigate([`/${tag}`]);
		}
	}

  logout() {
		localStorage.removeItem('currentUser');
		this.authService.logout().subscribe(
			() => { // Success
				localStorage.removeItem('currentUser');
				this.router.navigate(['/login']);
				location.reload(); // arreglar porque esto es un parche cuando se desloguea debe desaparecer el componenete menu
			}
		);
  }
}
// https://stackoverflow.com/questions/47591240/how-to-change-itemsperpagelabel-in-mat-paginator-angular-4