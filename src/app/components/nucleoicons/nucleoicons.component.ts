import { Component, OnInit, Inject, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-nucleoicons',
    templateUrl: './nucleoicons.component.html',
    styleUrls: ['./nucleoicons.component.scss']
})
export class NucleoiconsComponent implements OnInit, OnDestroy {
    imglink=null;
    imagName=null

    constructor( private element : ElementRef, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

    //   navbar.classList.remove('navbar-transparent');

      this.activatedRoute.params.subscribe(params => {
          console.log(params);
          this.imagName=params['imageName']
        this.imglink= "https://emmerich-images.s3.ap-south-1.amazonaws.com/" +params['imageName'];
    });

    }

    ngOnDestroy(){
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

    }
}
