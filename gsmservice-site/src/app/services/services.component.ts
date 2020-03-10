import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  selectedBrand: string;
  controlName = new FormControl();
  controlMPN = new FormControl();
  filteredNameSearch: Observable<string[]>;
  filteredMPNSearch: Observable<string[]>;
  dataSearch: any = [];
  brands: any = [];

  constructor(private servicesService: ServicesService) { }
  ngOnInit() {
    this.getBrands();
    this.filteredNameSearch = this.controlName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)) // selectedBrand
    );
    this.filteredMPNSearch = this.controlMPN.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)) // selectedBrand
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.dataSearch.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  async getBrands() {
    const filter = {
      enabled: true // false
    };
    console.log("getBrands: " + JSON.stringify(filter));
		await this.servicesService.getBrands(filter).subscribe(
      (response) => { // Success
        console.log("brands: " + JSON.stringify(response[0].resp.docs,null, 2));
				this.brands = response[0].resp.docs;
			},
			(error) => {
			  console.error(error);
			}
		);
  }
  search() {
    const filter = {
      brand: this.selectedBrand
    };
		this.servicesService.getByQuery(filter).subscribe(
      (response) => { // Success
        console.log("dataSearch: " + JSON.stringify(response[0].resp.docs,null, 2));
				this.dataSearch = response[0].resp.docs;
			},
			(error) => {
			  console.error(error);
			}
		);
  }
}
