import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ServicesService } from './services.service';
import { PageEvent } from '@angular/material/paginator';

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

  // MatPaginator Inputs
  pageSize: number = 12;
  pageSizeOptions: number[] = [4, 8, 12, 24, 48];
  // MatPaginator Output
  pageEvent: PageEvent;

  totalDocs: number;
  limit: number;
  totalPages: number;

  constructor(private servicesService: ServicesService) { }
  ngOnInit() {
    this.getBrands();
    this.selectedBrand= "Samsung"; // dejar samsung por default
  }
 
  getBrands() {
    const filter = {
      enabled: true
    };
		this.servicesService.getBrands(filter).subscribe(
      (response) => {
        console.log("brands: " + JSON.stringify(response[0].resp.docs));
        this.brands = response[0].resp.docs;
        this.getArticles({});
			},
			(error) => {
			  console.error(error);
			}
		);
  }
  onGetTaxList(data: any) {
    this.dataSearch = data;
    // console.log("onGetTaxList: " + JSON.stringify(this.dataSearch));
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
    let filter: any = {};
    if(name != '') {
      filter.name = name;
    } 
  }

  getArticles(value: any) {
    console.log("value: " + JSON.stringify(value));

    let filter: any = value;
    filter.brand = this.selectedBrand;
    console.log("filter: " + JSON.stringify(filter));
    this.servicesService.getByQuery(filter).subscribe(
      (response) => {
        // console.log("dataSearch: " + JSON.stringify(response[0].resp.docs));
        // this.dataSearch = response[0].resp.docs;
        this.totalDocs = response[0].resp.totalDocs;
        this.limit = response[0].resp.limit;
        this.totalPages = response[0].resp.totalPages;
        const data = response[0].resp.docs;


        this.onGetTaxList(data);
			},
			(error) => {
			  console.error(error);
			}
		);
  }
}
