import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    .grid-container-fourth{
        display: grid;
        grid-template-columns: auto auto auto ;
        background-color: #8fb3ca;
        
      }
      .grid-item-fourth {
        background-color: rgba(255, 255, 255, 0.8);
        //border: 0px solid rgba(255, 255, 255, 0.8);
        padding: 5px;
        font-size: 20px;
        text-align: center;
        font-size: 22px;
      }
      .grid-item {
        background-color: rgba(255, 255, 255, 0.8);
        //border: 0px solid rgba(255, 255, 255, 0.8);
        padding: 5px;
        font-size: 20px;
        text-align: center;
      }
      @media only screen and (max-width: 600px) {
        .grid-container-fourth{
            display: grid;
            grid-template-columns: auto ;
            background-color: #8fb3ca;
            
          }
      }

    `]
})

export class ComponentsComponent implements OnInit, OnDestroy {
    data : Date = new Date();
    productType: string;

    page = 4;
    page1 = 5;
    page2 = 3;
    focus;
    focus1;
    focus2;

    date: {year: number, month: number};
    model: NgbDateStruct;

    public isCollapsed = true;
    public isCollapsed1 = true;
    public isCollapsed2 = true;

    state_icon_primary = true;

    constructor( private renderer : Renderer2, config: NgbAccordionConfig, private activatedRoute:ActivatedRoute) {
        config.closeOthers = true;
        config.type = 'info';
    }
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
      var rellaxHeader = new Rellax('.rellax-header');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('index-page');

        this.activatedRoute.params.subscribe(params => {
            this.productType = params['type'];
        });
    }
    ngOnDestroy(){
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }
}
