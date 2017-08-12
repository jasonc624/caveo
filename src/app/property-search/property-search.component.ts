import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.sass']
})
export class PropertySearchComponent implements OnInit {
  address;
  city;
  state;
  zip;
  constructor( private router: Router ){ }

  ngOnInit() {
  }

  searchAddress(address, city, state, zip) {
    const addrUC = this.titleCase(address);
    const cityUC = this.titleCase(city);
    const entireAddress = addrUC + ' ' + cityUC + ' ' + state + ' ' + zip;
    const addr = entireAddress.split(' ').join('_');
    this.router.navigate(['listings', addr]);
  }

  titleCase(str) {
    console.log('str to title case', str);
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
}
