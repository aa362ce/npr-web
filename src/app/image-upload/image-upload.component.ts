import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import { ImageUploadService } from '../image-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;

  loaded:boolean;
  analysis:any;
  fileName:string="Choose a file";
  link:string="";

  constructor( private imageUploadService:ImageUploadService,private elem:ElementRef) {
    this.analysis = {
      results:[]
    };
   }

  ngOnInit() {
  }

  selectFile(){
    let el: HTMLElement = this.fileInput.nativeElement as HTMLElement;
    el.click();
  }

  upLoadFile(){
    let fd = new FormData();
    let file = this.fileInput.nativeElement.files[0];
    fd.append('file',file,file.name);
    this.fileName=file.name;
    this.imageUploadService.uploadImage(fd).subscribe(res=>{
      this.analysis=res.json();
      this.link="/"+file.name;
    });
  }

}
