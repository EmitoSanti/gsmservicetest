import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isAuthorize: Boolean = false;

  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    this.getAuthorization();
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
