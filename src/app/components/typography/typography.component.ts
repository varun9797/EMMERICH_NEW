import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';



@Component({
    selector: 'app-typography',
    templateUrl: './typography.component.html',
    styleUrls: ['./typography.component.scss']
})
export class TypographyComponent implements OnInit {
  allImages: any;
  productType:string;


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productType = params['type'];
      this.getAllS3Files(this.productType)
  });
  }

  selectedFile: File = null;  
  constructor(private http: HttpClient, private router: Router, private activatedRoute:ActivatedRoute ) {}
 
  onFileSelected(event:any){
    this.selectedFile = <File> event.target.files[0]; 
  }

  async getAllS3Files(productType){
    this.allImages = await this.http.get('https://cosmo-thoughts.herokuapp.com/api/auth/userlist/getImages?productType='+productType).toPromise();  
  }
 
  async onUpload() {   
    console.log('1. SelectedFile: ', this.selectedFile); 
    const body = { fileName: this.selectedFile.name, type: this.selectedFile.type}
    let preSignedUrlBody:any = await this.http.post('https://cosmo-thoughts.herokuapp.com/api/auth/userlist/getPresignedUrl', body).toPromise();  
    console.log('2. PreSignedURL: ', preSignedUrlBody.preSignedUrl)
    console.log('3. Upoloading File (binary) to S3')

 
    const upload = this.http.put(preSignedUrlBody.preSignedUrl, this.selectedFile).toPromise();    
    upload.then(data => {
      console.log('=> ', data )
    }).catch(err => console.log('error: ', err))
  }

  showDetails(fileName){
    this.router.navigate(['details', fileName]);
  }

}
