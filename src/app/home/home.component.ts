import { Component, OnInit } from '@angular/core';
import AOS from 'aos'; //AOS - 1

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AOS.init({disable: 'mobile'});//AOS - 2
    AOS.refresh();
  }

}
