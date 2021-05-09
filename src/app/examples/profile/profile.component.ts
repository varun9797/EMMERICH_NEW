import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;

  styles: any[] = [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }];
  data: Date = new Date();

  allImages: any;

  type: any;
  name: any;
  description: any;
  size: any;
  suction: any;
  color: any;
  height: any;
  housing: any;
  switch: any;
  motorpower: any;
  productdimension: any;
  warranty: any;
  isEditable: any;
  company: any;
  id: any;
  specialfeature: any;
  filter: any;
  finish: any;
  light: any;
  otherImages = [];


  constructor(private http: HttpClient) { }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.getAllImages();
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  async getAllImages() {
    this.allImages = await this.http.get('https://cosmo-thoughts.herokuapp.com/api/auth/userlist/getImages').toPromise();
    //console.log("*******",allImages)

  }

  onFileSelected(event: any, index) {
    this.allImages.selectedFile = <File>event.target.files[0];
  }
  onOtherFileSelected(event: any, index) {
    console.log("*********", this.otherImages);
    this.otherImages[index] = {}
    this.otherImages[index].selectedFile = <File>event.target.files[0];
  }
  async onUpload(index) {

    console.log('1. SelectedFile: ', this.allImages.selectedFile);
    const body = {
      id: this.id,
      fileName: this.allImages.selectedFile.name,
      type: this.allImages.selectedFile.type,
      name: this.name,
      description: this.description,
      size: this.size,
      suction: this.suction,
      height: this.height,
      color: this.color,
      housing: this.housing,
      switch: this.switch,
      motorpower: this.motorpower,
      productdimension: this.productdimension,
      warranty: this.warranty,
      company: this.company,
      specialfeature: this.specialfeature,
      filter: this.filter,
      finish: this.finish,
      light: this.light,
      otherImages: []
    }
    if (this.otherImages[0] && this.otherImages[0].selectedFile) {
      body.otherImages[0] = { fileName: this.otherImages[0].selectedFile.name, fileType: this.otherImages[0].selectedFile.type }
      await this.getImageUrl("https://cosmo-thoughts.herokuapp.com/api/auth/userlist/getPreSignedURLforImages",
        this.otherImages[0], { fileName: this.otherImages[0].selectedFile.name, fileType: this.otherImages[0].selectedFile.type })
    }

    if (this.otherImages[1] && this.otherImages[1].selectedFile) {
      body.otherImages[1] = { fileName: this.otherImages[1].selectedFile.name, fileType: this.otherImages[1].selectedFile.type }
      await this.getImageUrl("https://cosmo-thoughts.herokuapp.com/api/auth/userlist/getPreSignedURLforImages",
        this.otherImages[1], { fileName: this.otherImages[1].selectedFile.name, fileType: this.otherImages[1].selectedFile.type })
    }

    const upload = this.getImageUrl("https://cosmo-thoughts.herokuapp.com/api/auth/userlist/getPresignedUrl", this.allImages, body)
    upload.then(data => {
      console.log('=> ', data)
      this.isEditable = !this.isEditable
      this.getAllImages();
    }).catch(err => console.log('error: ', err))
  }

  deleteEmployee(index) {

    this.allImages.splice(index, 1);
  }

  async getImageUrl(url, images, body) {
    let preSignedUrlBody: any = await this.http.post(url, body).toPromise();
    const upload = await this.http.put(preSignedUrlBody.preSignedUrl, images.selectedFile).toPromise();
    return upload;
  }

  async showForm(data) {
    console.log("****&&&(((", data);
    this.id = data._id
    this.name = data && data.name,
      this.type = data && data.type,
      this.description = data && data.description,
      this.size = data && data.specification && data.specification.size,

      this.suction = data && data.specification && data.specification.suction,
      this.height = data && data.specification && data.specification.height,
      this.color = data && data.specification && data.specification.color,
      this.housing = data && data.specification && data.specification.housing,
      this.switch = data && data.specification && data.specification.switch,
      this.motorpower = data && data.specification && data.specification.motorpower,
      this.productdimension = data && data.specification && data.specification.productdimension,
      this.warranty = data && data.specification && data.specification.warranty
      this.company = data && data.specification && data.specification.company,
      this.specialfeature = data && data.specification && data.specification.specialfeature,
      this.filter = data && data.specification && data.specification.filter
    this.finish = data && data.specification && data.specification.finish
    this.light = data && data.specification && data.specification.light
    this.otherImages = [];

    if (data && data.specification && data.specification.otherImages && data.specification.otherImages[0] && (data.specification.otherImages[0].fileName)) {
      this.otherImages[0] = {}
      this.otherImages[0].selectedFile = {}
      this.otherImages[0].selectedFile.name = data && data.specification && (data.specification.otherImages[0].fileName)
    }
    if (data && data.specification && data.specification.otherImages && data.specification.otherImages[1] && (data.specification.otherImages[1].fileName)) {
      this.otherImages[1] = {}
      this.otherImages[1].selectedFile = {}
      this.otherImages[1].selectedFile.name = data && data.specification && (data.specification.otherImages[1].fileName)
    }

    this.allImages.selectedFile = {}
    this.allImages.selectedFile.name = data.fileName

    this.isEditable = !this.isEditable
  }
  addNew() {
    this.id = "";
    this.name = "",
      this.type = "",
      this.description = "",
      this.size = "",

      this.suction = "",
      this.height = "",
      this.color = "",
      this.housing = "",
      this.switch = "",
      this.motorpower = "",
      this.productdimension = "",
      this.warranty = ""
    this.company = ""
    this.specialfeature = ""
    this.filter = ""
    this.finish = ""
    this.light = "";
    this.otherImages = [],

      this.isEditable = !this.isEditable
  }

  editEmployee(index) {

    //code for editing

  }
}
