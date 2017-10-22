import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageUploadService {

  constructor(private http: Http) { }

  // Get all posts from the API
  uploadImage(formData) {
    let url = "/fileUpload";
    return this.http.post(url,formData);
  }

}
