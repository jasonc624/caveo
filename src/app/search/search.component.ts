import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {PropertyService} from "../_services/property.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  searchVal = '';
  timer = null;
  addrMatch;
  suggestionsOpen;
  constructor(private http: HttpClient,
              private propertyService: PropertyService,
              private router: Router) {
  }

  ngOnInit() {
  }
  filters() {

  }
  queryAddresses(val) {
    clearTimeout(this.timer);
    this.suggestionsOpen = true;
    this.timer = setTimeout( () => {this.placeMatch(val)}, 1500);
  }

  placeMatch(val) {
    const string = val.split(/[ ,]+/).join('+');
    console.log('value being typed', string);
    this.http.get(environment.node.url+ 'places?' + 'address=' + string ).subscribe((res:any) => {
      console.log('response from places api', res);
      if (res.results) {
        this.addrMatch = res.results;
      } else {
        this.addrMatch = false;
      }
    });
  }

  searchAddress(place) {
    console.log('searching place', place);
    this.propertyService.propertyExists(place).then(bool => {
      if (bool) {
        //Nothing
      } else {
        this.propertyService.createProperty(place);
      }
      this.suggestionsOpen = false;
      this.searchVal = place.formatted_address;
      this.router.navigate(['app','search', place.place_id]);
    });
  }
}
