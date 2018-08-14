import { Component, OnInit } from '@angular/core';



export interface RouteInfo {
  path: string;
}

export  const theRoutes : RouteInfo[] = [

  {path :'snapshot'},
  {path :'performance'},
  {path :'historique'},
  {path :'pricing'},
  {path :'rapport'},

];

@Component({
  selector: 'app-barre-laterale',
  templateUrl: './barre-laterale.component.html',
  styleUrls: ['./barre-laterale.component.css']
})
export class BarreLateraleComponent implements OnInit {
  public menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = theRoutes.filter(menuItem => menuItem);
  }

}
