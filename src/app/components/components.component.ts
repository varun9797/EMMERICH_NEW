import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
      a { color: white; text-decoration: none; }

.arrow {
  text-align: center;
  margin: 20% 0px 0px 0px
}
.bounce {
  -moz-animation: bounce 2s infinite;
  -webkit-animation: bounce 2s infinite;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
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
    name;
    phoneNum;
    msg;
    email;

    constructor(public router:Router, private renderer : Renderer2, config: NgbAccordionConfig, private activatedRoute:ActivatedRoute, private http: HttpClient) {
        config.closeOthers = true;
        config.type = 'info';
        this.router.events.subscribe(event => {
          if(event instanceof NavigationEnd) {
            this.productType = event.url.split("/")[2];
          }
        });
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
      this.productType = this.activatedRoute.snapshot.params["type"];
      const ua = navigator.userAgent;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
                    navbar.classList.remove('navbar-transparent');
                } else if (/Chrome/i.test(ua)) {
                  var navbar = document.getElementsByTagName('nav')[0];
                  navbar.classList.add('navbar-transparent');
                }
  
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('index-page');
    }
    ngOnDestroy(){
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }

    async submitEnq(){
      try {
        const body = { "name": this.name || "",
        "email": this.email,
        "phoneno": this.phoneNum,
        "description": this.msg,
        "status":1
      }
        let preSignedUrlBody:any = await this.http.post('https://cosmo-thoughts.herokuapp.com/api/auth/userlist/addEmmerichEnq', body).toPromise();  
        alert("Submitted Successfully!")

      } catch(err) {
        console.log(err);
        alert("something went wrong!")
      }
      
    }
}
