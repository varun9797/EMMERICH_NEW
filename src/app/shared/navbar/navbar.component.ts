import { Component, OnInit, ElementRef } from '@angular/core';
import { Location} from '@angular/common';

import {LandingComponent} from "./../../examples/landing/landing.component"

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    private LandingComponent: LandingComponent 

    constructor(public location: Location, private element : ElementRef) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        // this.activatedRoute.params.subscribe(params => {
        //     let id = params['id'];
        //     this.getImageDetails(id)
        // });
    }
    // async getImageDetails(id) {
    //     this.imageDetails = await this.http.get('https://cosmo-thoughts.herokuapp.com/api/auth/userlist/getImages?id='+id).toPromise();  
    //     // console.log(this.imageDetails);
    //     // this.images.push({"path":'https://emmerich-images.s3.ap-south-1.amazonaws.com/'+this.imageDetails.fileName})
    //    }
    
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
  
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
}
