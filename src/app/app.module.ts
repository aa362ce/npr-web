import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AlertModule } from 'ngx-bootstrap';

import { RouterModule } from '@angular/router';

import { ImageUploadService } from './image-upload.service';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { HttpModule } from '@angular/http';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'imageUpload',
    pathMatch: 'full'
  },
  {
    path: 'imageUpload',
    component: ImageUploadComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    HttpModule
  ],
  providers: [ImageUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
