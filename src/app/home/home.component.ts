import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, CanDeactivate } from '@angular/router';

import { HomeService } from './home.service';
import { HOME } from './home';
import { BasicValidators } from '../shared/basicValidators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService, BasicValidators]
})
export class HomeComponent implements OnInit {
  public applicantForm: FormGroup;
  public submitted: boolean;
  responseStatus:Object= [];
  public applicants: HOME[]= [];
  public data: string;
  public _id: 0;
  public title: string;

  applicant: HOME = new HOME();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private _hService: HomeService,
  ) { }

  private sub:any;

  ngOnInit() {
    this.getAll();
    this.initForm();  
    var _id = this.route.params.subscribe(params => {
        var _id = params['_id'];
        this.title = _id ? 'Edit Applicant' : 'New Applicant';

        if(!_id)
        return;

        this._hService.getApplicant(_id).subscribe(
            applicant => this.applicant = applicant,
            // response => {
            //   if(response.status == 400){
            //     this.router.navigate(['Not Found'])
            //   }
            // }
        )
    });
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = params["id"];
    // })
    // if (this.id > 0) { 
    //         this.title = "Edit Material"
    //     } else {
    //         this.title = "Add Material"
    //     }

    //     if (!this.id) {
    //         return;
    //     }

    //     this._hService.getAllApplicants().subscribe(
    //       applicants => {
    //         this.applicants = applicants

    //         let Form = (this.applicantForm)
    //         if (this.id > 0) {
    //           (<FormGroup>this.applicantForm).setValue(applicants, { onlySelf: false});
    //         }
    //       }
    //   );
     
  }

  initForm() {
   this.applicantForm = this.formBuilder.group({
     workbefore: ['',  Validators.required],
     payrange: ['', Validators.required]
   })

  
  }

  getAll(){
     this._hService.getAllApplicants().subscribe(
        applicants => {
          this.applicants = applicants
          console.log(applicants)
        }
     )
  }

  submit() {
    this._hService.addApplicants(this.applicant).subscribe(
      data => console.log(this.responseStatus = data),
      err => console.log(err),
      () => console.log('Applicacion Enviada Exitorsamente!!! ...')
    )
  }

  // addApplicant(model: HOME, isValid: boolean) {
  //   let result;
  //     this._hService.addApplicants(model).subscribe(
  //       data => {
  //         if(data === 0) {
  //           this.data = data;
  //         }
  //       }
  //     )
  //   console.log('Applicacion Enviada Exitorsamente!!! ...');
  // }

}
