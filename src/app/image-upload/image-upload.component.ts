import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  selectFile(){
    let el: HTMLElement = this.fileInput.nativeElement as HTMLElement;
    el.click();
  }

}
