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
  public applicants: HOME[]= [];
  public data: string;
  public id: string;
  public title: string;

  applicant = new HOME();
  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private _hService: HomeService,
  ) { }

  private sub:any;

  ngOnInit() {
    this.getAll();
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    })
    if (this.id > '') { 
            this.title = "Edit Material"
        } else {
            this.title = "Add Material"
        }

        if (!this.id) {
            return;
        }
     
  }

  initForm() {
   this.applicantForm = this._fb.group({
     workbefore: ['', Validators.required]
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

  addApplicant(model: HOME, isValid: boolean) {
    let result;
      this._hService.addApplicants(model).subscribe(
        data => {
          if(data === '') {
            this.data = data;
          }
        }
      )
    console.log('post de aplicantes ...');
  }

}
