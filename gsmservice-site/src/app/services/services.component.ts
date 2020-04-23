import { Component, OnInit,  } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from './services.service';
import { PageEvent  } from '@angular/material/paginator';
import * as _ from 'lodash';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})

export class ServicesComponent implements OnInit {
  // Brand Select
  brands: any = [];
  selectedBrand: string;

  // Autocomplete Search
  isLoading = false;
  autocompleteSearchForm: FormGroup;
  filteredNameSearch: any[] = [];
 
  // Paginator Inputs
  pageSize: number = 12;
  pageSizeOptions: number[] = [4, 8, 12, 24, 48];
  // Paginator Output
  pageEvent: PageEvent;
  totalDocs: number;
  limit: number;
  totalPages: number;

  cosa: any;
  constructor(private fb: FormBuilder, private servicesService: ServicesService) {
    this.autocompleteSearchForm = this.fb.group({
      searchInput: this.fb.control({value: '', disabled: false})
    });
  }
  
  ngOnInit() {
    this.getBrands();
    this.selectedBrand= "Samsung"; // dejar samsung por default pasar a un filtro que obtenga samsung 
    this.autocompleteSearch();
  }

  autocompleteSearch() {
    this.autocompleteSearchForm.get('searchInput').valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap((value: string) => {return this.getArticles({name: value});})
      )
      .subscribe();
  }
  displayFn(data: any) {
    if (data) { return data.name; }
  }

  getBrands() {
    this.autocompleteSearchForm.reset({searchInput: ''}, {emitEvent: false});
    let filter = {
      enabled: true
    };

		this.servicesService.getBrands(filter).subscribe(
      (response) => {
        console.log("brands: " + JSON.stringify(response[0].resp.docs));
        this.brands = response[0].resp.docs;
        this.getArticles(undefined);
			},
			(error) => {
			  console.error(error);
			}
		);
  }

  // dataSearch: any = [];
  // onGetTaxList(data: any) {
  //   this.dataSearch = data;
  //   // console.log("onGetTaxList: " + JSON.stringify(this.dataSearch));
  //   this.filteredNameSearch = this.controlName.valueChanges
  //     .pipe(
  //       startWith(''),
  //       map(value => value.length >= 1 ? this._filter(value) : [])
  //     );
  // }
  // private _filter(value: string) {
  //   const filterValue = value.toLowerCase();
  //   console.log("filterValue: " + filterValue);
  //   return this.dataSearch.filter((dataSearch: any) => dataSearch.name.toLowerCase().includes(filterValue));
  // }


  getArticles(value: any): Observable<any> {
    console.log("getArticles: " + JSON.stringify(value));
    let filter: any = {}; // pasar a global en el controller o algo asi asi sacamos los filter.brand y enabled
    let result;
    if (!_.isEmpty(value) && value && !_.isUndefined(value) && !_.isNull(value) && value != '') {
      filter = value;
    }

    filter.brand = this.selectedBrand;
    filter.enabled = true;
    console.log("filter: " + JSON.stringify(filter));
   
    result = this.servicesService.getByQuery(filter)
    .subscribe(
      (response) => {
        // console.log("dataSearch: " + JSON.stringify(response[0].resp.docs));
        this.totalDocs = response[0].resp.totalDocs;
        this.limit = response[0].resp.limit;
        this.totalPages = response[0].resp.totalPages;
        this.filteredNameSearch = response[0].resp.docs;
        this.isLoading = false;
        // console.log("this.filteredNameSearch: " + this.filteredNameSearch);
			},
      (error) => {
        console.log("getArticles error: " + error);
        return error;
      }
    );
    return result; 
  }
}
