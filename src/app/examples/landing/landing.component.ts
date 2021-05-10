// import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, QueryList, ViewChildren, OnInit, AfterViewInit} from '@angular/core';
import { gsap, Sine } from 'gsap';

enum Direction {
  Left = '-=',
  Right = '+='
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  data : Date = new Date();
  focus;
  focus1;
  // Sine: gsap.Ease
  imageDetails:any;

  @ViewChildren('carouselItem')
  private carouselItems : QueryList<ElementRef>;

  public currentAvatarIndex = 1;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) { 
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.getImageDetails(id)
  });
   }

   async getImageDetails(id) {
    this.imageDetails = await this.http.get('https://cosmo-thoughts.herokuapp.com/api/auth/userlist/getImages?id='+id).toPromise();  
    // console.log(this.imageDetails);
    // this.images.push({"path":'https://emmerich-images.s3.ap-south-1.amazonaws.com/'+this.imageDetails.fileName})
   }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
  public enableCarouselButtons = true;


  
    // public right(): void {
    //   this.slide(Direction.Right);
    // }
  
    // public left(): void {
    //   this.slide(Direction.Right);
    // }
  
    // private readonly inactiveProperties = {
    //   filter: 'grayscale(100%)',
    //   scale: 0.5,
    //   opacity: 0.3
    // }
  

  
    // ngAfterViewInit(): void {
    //     this.manupulateImages()
    // }

    // manupulateImages(cuurentIndex?){
    //   const carouselNativeElements = this.getCarouselElements();
    //   // let avatar=[];
    //   // carouselNativeElements.forEach((el, i)=>{
    //   //   if(i!=0){
    //   //     if(i==1 || i==2)avatar.push(el)
    //   //   }
        
    //   // })
    //   this.activatedRoute.params.subscribe(async params => {
    //     let id = params['id'];
    //     await this.getImageDetails(id)
    //     console.log(this.imageDetails?.specification?.otherImages)
    //   if(this.imageDetails?.specification?.otherImages?.length>=2){
    //     const currentLeftAvatar = carouselNativeElements[0];
    //     const currentRightAvatar = carouselNativeElements[2];
    //     gsap.set([currentLeftAvatar, currentRightAvatar], this.inactiveProperties);
    //   } else{
    //     gsap.set([], this.inactiveProperties);
    //   }
    //   })
      
      
    // }

  
    // private slide(direction: Direction): void {
    //   this.enableCarouselButtons = false;
  
    //   const carouselNativeElements = this.getCarouselElements();
    //   const currentLeftAvatarIndex = this.getPreviousIndex(this.currentAvatarIndex);
    //   const currentRightAvatarIndex = this.getNextIndex(this.currentAvatarIndex);
  
    //   const currentLeftAvatar = carouselNativeElements[currentLeftAvatarIndex];
    //   const currentCentralAvatar = carouselNativeElements[this.currentAvatarIndex];
    //   const currentRightAvatar = carouselNativeElements[currentRightAvatarIndex];
  
    //   let moveAcrossBackAvatar;
    //   let moveAcrossBackDirection;
    //   let moveToSideDirection;
    //   let moveToCenterAvatar;
    //   let moveToCenterDirection;
    //   const moveToSideAvatar = currentCentralAvatar;
  
    //   let nextAvatarIndex;
  
    //   if (direction === Direction.Right) {
    //     moveAcrossBackAvatar = currentLeftAvatar;
    //     moveAcrossBackDirection = Direction.Right;
    //     moveToSideDirection = Direction.Left;
    //     moveToCenterAvatar = currentRightAvatar;
    //     moveToCenterDirection = Direction.Left;
    //     nextAvatarIndex = currentRightAvatarIndex;
    //   } else {
    //     moveAcrossBackAvatar = currentRightAvatar;
    //     moveAcrossBackDirection = Direction.Left;
    //     moveToSideDirection = Direction.Right;
    //     moveToCenterAvatar = currentLeftAvatar;
    //     moveToCenterDirection = Direction.Right;
    //     nextAvatarIndex = currentLeftAvatarIndex;
    //   }

      
    //     gsap.timeline({ repeat: 0})
    //     .to([moveToSideAvatar], {
    //       ...this.inactiveProperties,
    //       duration: 1,
    //       ease: Sine.easeInOut,
        
    //       x: moveToSideDirection + '100%'
    //     }).to([moveAcrossBackAvatar], {
    //       ...this.inactiveProperties,
    //       delay: -1,
    //       duration: 1,
    //       ease: Sine.easeInOut,
    //       x: moveAcrossBackDirection + '200%'
    //     }).to([moveToCenterAvatar], {
    //       filter: 'none',
    //       scale: 1.0,
    //       opacity: 1.0,
    //       delay: -1,
    //       duration: 1,
    //       ease: Sine.easeInOut,
    //       x: moveToCenterDirection + '100%'
    //     }).eventCallback('onComplete', () => {
    //       this.enableCarouselButtons = true;
    //       this.currentAvatarIndex = nextAvatarIndex;
    //     });
    // }
  

  
  //   private getCarouselElements(): any[] {
  //     return this.carouselItems.toArray().map(el => el.nativeElement)
  //   }

  // private getNextIndex(index: number): number {
  //   return ((index + 1) % this.carouselItems.length);
  // }

  // private getPreviousIndex(index: number) {
  //   return ((index + this.carouselItems.length - 1)
  //     % this.carouselItems.length);
  // }


}
