import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  searchVal = '';
  timer = null;
  addrMatch;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }
  filters() {

  }
  queryAddresses(val) {
    clearTimeout(this.timer);
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
        this.addrMatch = 'Address Not Found';
      }
    });
  }

}
