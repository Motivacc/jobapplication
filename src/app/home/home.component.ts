import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, CanDeactivate } from '@angular/router';

import { HomeService } from './home.service';
import { HOME } from './home';
import { BasicValidators } from '../shared/basicValidators';

// Sweet Alert
import { SweetAlertService } from 'ng2-sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService, BasicValidators, SweetAlertService]
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
            applicant => this.applicants = applicant,
            response => {
              if(response.status == 400){
                this.router.navigate(['Not Found'])
              }
            }
        )
    });

    // this.sub = this.route.params.subscribe(params => {
    //   this._id = params["id"];
    // })
    // if (this._id > 0) { 
    //         this.title = "Edit Material"
    //     } else {
    //         this.title = "Add Material"
    //     }

    //     if (!this._id) {
    //         return;
    //     }

    //     this._hService.getAllApplicants().subscribe(
    //       applicant => {
    //         this.applicant = applicant

    //         let Form = (this.applicantForm)
    //         if (this._id > 0) {
    //           (<FormGroup>this.applicantForm).setValue(applicant, { onlySelf: false});
    //         }
    //       }
    //   );
     
  }

  initForm() {
   this.applicantForm = this.formBuilder.group({
     workbefore: ['',  Validators.required],
     payrange: ['', Validators.required],
     desposition: ['', Validators.required],
     name: ['', Validators.required],
     psourname: ['', Validators.required],
     msourname: ['', Validators.required],
     dob: ['', Validators.required],
     age:  ['', Validators.required],
     gender:  ['', Validators.required],
     pofbirth:  ['', Validators.required],
     nationality: ['', Validators.required],
     city:  ['', Validators.required],
     state:  ['', Validators.required],
     zipcode:  ['', Validators.required],
     street:  ['', Validators.required],
     streetNumber:  ['', Validators.required],
     appartNumber:  ['', Validators.required],
     homePhone:  ['', Validators.required],
     mobilePhone: ['', Validators.required],
     radio:  ['', Validators.required],
     email: ['', Validators.required],
     relation:  ['', Validators.required],
     spouseName:  ['', Validators.required],
     childrens:  ['', Validators.required],
     fatherName:  ['', Validators.required],
     motherName:  ['', Validators.required],
     emergencyContact:  ['', Validators.required],
     relationshipContact:  ['', Validators.required],
     relcontactPhone:  ['', Validators.required],
     dependantYou:  ['', Validators.required],
     timeResident:  ['', Validators.required],
     education:  ['', Validators.required],
     school:  ['', Validators.required],
     graduationDate:  ['', Validators.required],
     degree:  ['', Validators.required],
     englishProficiency:  ['', Validators.required],
     englishWriteLevel:  ['', Validators.required],
     computerProficency: ['', Validators.required],
     validVisa: ['', Validators.required],
     bodyTattos: ['', Validators.required],
     memberClub:  ['', Validators.required],
     criminalRecord: ['', Validators.required],
     prisionMexico:  ['', Validators.required],
     shift:  ['', Validators.required],
     callWork:  ['', Validators.required],
     nightShift:  ['', Validators.required],
     refName:  ['', Validators.required],
     refOccupation:  ['', Validators.required],
     refPhone:  ['', Validators.required],
     refKnow:  ['', Validators.required],
     refEmail:  ['', Validators.required],
     workExperince:  ['', Validators.required],
     companyName:  ['', Validators.required],
     companyCountry:  ['', Validators.required],
     companyDate:  ['', Validators.required],
     leaveJob:  ['', Validators.required],
     jobTitle:  ['', Validators.required],
     supervisorName:  ['', Validators.required], 

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

  submit(model: HOME) {
    this._hService.addApplicants(this.applicant).subscribe(
      (data:any) => {
        console.log(data);      
      },
      
      err => console.log(err),
      () => {
        console.log('Applicacion Enviada Exitorsamente!!! ...');
        console.log(this.responseStatus = this.data)
        console.log(this.applicant)
      }
    )
  }

  
 
}
