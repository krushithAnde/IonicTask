import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistrationPage } from '../registration/registration.page';
import { EmployeedetailsPage } from '../employeedetails/employeedetails.page';
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCrtl: NavController, public router: Router) {

   }
  goRegisterEmpPage() {
    this.router.navigate(['registration']);
  }
  viewEmployeeDetails() {
    this.router.navigate(['employeedetails']);
  }
}
