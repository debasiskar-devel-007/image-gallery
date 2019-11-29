import { Component, OnInit, Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'projects/image-gallery/src/lib/Service/api.service';
@Component({
  selector: 'lib-add-edit-caegory',
  templateUrl: './add-edit-caegory.component.html',
  styleUrls: ['./add-edit-caegory.component.css']
})
export class AddEditCaegoryComponent implements OnInit {
  public headerText: any = "Add Image";
  public buttonText: any = "Submit";
  imageGalleryAddEditForm: FormGroup;
  public serverUrlData: any;
  public getDataEndpointData: any;
  public addEndpointData: any;
  public videoStatusArr: any = [];
  public listUrl: any;
  public listrouteData: any = '';
  public parameter_id: any;
  public VideolistingArray: any = [];
  public editedListData: any = [];
  public spinnerloader: boolean;
  public allData: any = [];
  public singleDatalist: any = [];

  @Input()          //setting the server url from project
  set serverUrl(serverUrlval: any) {
    this.serverUrlData = (serverUrlval) || '<no name set>';
    this.serverUrlData = serverUrlval;

  }
  @Input()
  set singleData(val: any) {
    this.singleDatalist = (val) || '<no name set>';
    this.singleDatalist = val;
    if (this.activeroute.snapshot.params._id) {
      this.headerText = "Edit Image";
      this.buttonText = "Update";
      this.parameter_id = this.activeroute.snapshot.params._id;
      this.imageGalleryAddEditForm.controls['title'].patchValue(val[0].title);
      this.imageGalleryAddEditForm.controls['priority'].patchValue(val[0].priority);
      this.imageGalleryAddEditForm.controls['status'].patchValue(val[0].status);
      this.imageGalleryAddEditForm.controls['description'].patchValue(val[0].description);
      this.model.editorData = val[0].description;
      this.imageGalleryAddEditForm.controls['parent_category'].patchValue(val[0].parent_category);

    }
  }

  @Input()          //setting the getdat endpoint from project
  set getDataEndpoint(endpointUrlval: any) {
    this.getDataEndpointData = (endpointUrlval) || '<no name set>';
    this.getDataEndpointData = endpointUrlval;

  }
  @Input()          //setting the addendpoint from application
  set addEndpoint(endpointUrlval: any) {
    this.addEndpointData = (endpointUrlval) || '<no name set>';
    this.addEndpointData = endpointUrlval;
  }
  @Input()          //getting the listing url
  set listingUrl(Urlval: any) {
    this.listUrl = (Urlval) || '<no name set>';
    this.listUrl = Urlval;

  }
  @Input()          //getting the listing url
  set dataListViaResolve(val: any) {
    this.VideolistingArray = (val) || '<no name set>';
    this.VideolistingArray = val;
  }
  /**ckeditor start here*/
  public Editor = ClassicEditor;  //for ckeditor
  editorConfig = {
    placeholder: 'Type the content here!',
  };
  public model = {
    editorData: ''
  };
  /**ckeditor end here*/
  constructor(public apiService: ApiService, public fb: FormBuilder, public activeroute: ActivatedRoute,
    public _http: HttpClient, public router: Router) {
    /**formgroup start here**/
    this.imageGalleryAddEditForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: [true,],
      parent_category: ['']
    })
    /**formgroup end here**/
  }

  ngOnInit() {
    /**Observable start here**/
    this.apiService.clearServerUrl();
    setTimeout(() => {
      this.apiService.setServerUrl(this.serverUrlData);
    }, 50);
    this.apiService.cleargetdataEndpoint();
    setTimeout(() => {
      this.apiService.setgetdataEndpoint(this.getDataEndpointData);
    }, 50);
    this.apiService.clearaddEndpoint();
    setTimeout(() => {
      this.apiService.setaddEndpoint(this.addEndpointData);
    }, 50);
    setTimeout(() => {
      this.getData();
    }, 50);
    /**Observable end here**/
  }
  inputUntouch(form: any, val: any) {

    form.controls[val].markAsUntouched();
  }
  resetImageForm() {
    this.imageGalleryAddEditForm.reset();
  }
  getData() {
    let data: any = {
      "source": "video_category"
    }
    this.apiService.getData(data).subscribe(response => {
      let result: any = response;
      this.allData = result.res;
      
    })
  }
  ImageAddEditFormSubmit() {
    console.log(this.imageGalleryAddEditForm.value, "okkkkkk");
    this.imageGalleryAddEditForm.patchValue({
      description: this.model.editorData
    });
    let x: any;
    for (x in this.imageGalleryAddEditForm.controls) {
      this.imageGalleryAddEditForm.controls[x].markAsTouched();
    }
    if (this.imageGalleryAddEditForm.valid) {
      if (this.imageGalleryAddEditForm.value.status)
        this.imageGalleryAddEditForm.value.status = parseInt("1");
      else
        this.imageGalleryAddEditForm.value.status = parseInt("0");

      if (this.activeroute.snapshot.params._id) {
        data = {
          "source": "imageGallery_category",
          'data': {
            "id": this.parameter_id,
            "title": this.imageGalleryAddEditForm.value.title,
            "description": this.imageGalleryAddEditForm.value.description,
            "priority": this.imageGalleryAddEditForm.value.priority,
            "status": this.imageGalleryAddEditForm.value.status,
            "parent_category": this.imageGalleryAddEditForm.value.parent_category
          },
          "sourceobj": ["parent_category"]
        }
      } else {
        var data: any;
        data = {                                         //add part
          "source": "imageGallery_category",
          "data": this.imageGalleryAddEditForm.value,
          "sourceobj": ["parent_category"]
        }
      }
    }
    this.spinnerloader = true;
    this.apiService.addData(data).subscribe(response => {

      console.log(response);
      this.spinnerloader = false;
      this.resetImageForm();
      setTimeout(() => {
        this.router.navigateByUrl('/' + this.listUrl);
      }, 100);
    })

  }

}
