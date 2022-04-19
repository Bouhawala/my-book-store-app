import { Component, OnInit } from '@angular/core';
import { RoutesPaths } from 'src/app/modules/routing/routing.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  routesPaths = RoutesPaths;

  constructor() { }

  ngOnInit(): void {
  }

}
