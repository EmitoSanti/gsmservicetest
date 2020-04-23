import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isAuthorize: Boolean = false;

  constructor(private settingService: SettingsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAuthorization();
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  showError() {
    this.toastr.error('everything is broken', 'Major Error', {
      timeOut: 3000
    });
  }
  generateNewAuthorization() {
    this.settingService.generateNewCode().subscribe(
      (response) => {
        console.log("response: " + JSON.stringify(response));
			},
			(error) => {
			  console.error(error);
			}
		);
  }

  getAuthorization() {
    this.settingService.verifyAuthorization().subscribe(
      (response) => {
        this.isAuthorize = true;
        console.log("response: " + JSON.stringify(response));
			},
			(error) => {
			  console.error(error);
			}
		);
  }

  startMigration() {
    this.settingService.startMigration().subscribe(
      (response) => {
        console.log("response: " + JSON.stringify(response));
			},
			(error) => {
			  console.error(error);
			}
		);
  }
}
