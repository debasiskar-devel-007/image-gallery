import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImageGalleryComponent } from './image-gallery.component';
import { AddEditCaegoryComponent } from './component/categoryManagement/add-edit-caegory/add-edit-caegory.component';
import { ListCategoryComponent } from './component/categoryManagement/list-category/list-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './Service/api.service';
import { ListingModule } from 'lib-listing';

import { DemoMaterialModule } from './modules/material-module';
import { AddEditImageComponent } from './component/imageGallery-management/add-edit-image/add-edit-image.component';
import { FileUploadModule } from 'file-upload';     //file upload library
import { ImagelistingComponent } from './component/imageGallery-management/imagelisting/imagelisting.component';    

@NgModule({
  imports: [
    DemoMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    ListingModule,
    FileUploadModule
  ],
  declarations: [ImageGalleryComponent, AddEditCaegoryComponent, ListCategoryComponent, AddEditImageComponent, ImagelistingComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ApiService],
  exports: [ImageGalleryComponent, AddEditCaegoryComponent, ListCategoryComponent,AddEditImageComponent,ImagelistingComponent]
})
export class ImageGalleryModule { }
