import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { RestapiService } from '../services/restapi.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  formGroup: FormGroup;
  ngOnInit() {
  }
  constructor(public formBuilder: FormBuilder,
    private _TOAST 		: ToastController,
    public service: RestapiService
  ) {
    this.formGroup = formBuilder.group({
      empNameControl: ["", Validators.compose([Validators.minLength(4), Validators.maxLength(30),
      Validators.pattern("[0-9a-z-A-Z-_]*"), Validators.required])],
      ageControl: ["", Validators.required],
      designationControl: ["", Validators.required],
      departmentControl: ["", Validators.required],
      reportingMngrControl: ["", Validators.required]
    });
  }

  onSubmit(formData: any) {
    let body = {
      name: formData.empNameControl,
      age: formData.ageControl,
      designation: formData.designationControl,
      department: formData.departmentControl,
      reportingManager: formData.reportingMngrControl
    };

    // todo do something with our data like:
    this.service.createEmployee(body).subscribe((res) => {
     console.log("Message: ", res);
    this.displayNotification(res);
    });
    this.formGroup.reset();
  }

  async displayNotification(message : string) : Promise<void>
  {
     let toast = this._TOAST.create({
        message 	: message,
        duration 	: 3000
     });
     (await toast).present();
  }
}
