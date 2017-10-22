import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageUploadService {

  constructor(private http: Http) { }

  // Get all posts from the API
  uploadImage() {
    return this.http.post('/fileupload',null)
      .map(res => res.json());
  }

}
