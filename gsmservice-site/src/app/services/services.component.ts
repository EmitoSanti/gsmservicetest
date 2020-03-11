import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ServicesService } from './services.service';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  brands: any = [];
  selectedBrand: string;

  controlName = new FormControl();
  filteredNameSearch: Observable<any>;
  dataSearch: any = [];

  constructor(private servicesService: ServicesService) { }
  ngOnInit() {
    this.getBrands();
    this.selectedBrand= "samsung"; // dejar samsung por default 
  }

  getBrands() {
    const filter = {
      enabled: true
    };
		this.servicesService.getBrands(filter).subscribe(
      (response) => {
        console.log("brands: " + JSON.stringify(response[0].resp.docs,null, 2));
        this.brands = response[0].resp.docs;
        this.autocompleteSearch("");
			},
			(error) => {
			  console.error(error);
			}
		);
  }

  onGetTaxList(data: any) {
    this.dataSearch = data;
    console.log("onGetTaxList: " + JSON.stringify(this.dataSearch,null, 2));
    this.filteredNameSearch = this.controlName.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    console.log("filterValue: " + filterValue);
    return this.dataSearch.filter((dataSearch: any) => dataSearch.name.toLowerCase().includes(filterValue));
  }

  autocompleteSearch(name: string) {
    let filter: any = {
      brand : this.selectedBrand
    };

    if(name != '') {
      filter.name = name;
    } 

		this.servicesService.getByQuery(filter).subscribe(
      (response) => {
        console.log("dataSearch: " + JSON.stringify(response[0].resp.docs,null, 2));
        // this.dataSearch = response[0].resp.docs;
        const data = response[0].resp.docs;
        this.onGetTaxList(data);
			},
			(error) => {
			  console.error(error);
			}
		);
  }
}
