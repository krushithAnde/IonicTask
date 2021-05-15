import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.page.html',
  styleUrls: ['./employeedetails.page.scss'],
})
export class EmployeedetailsPage implements OnInit {
  allEmployees; //Store all data from provider
  filterEmployeeData;//Store filtered data
  employeeByID: any;//single employeedata

  hide: boolean = true;
  constructor(public navCtrl: NavController, public service: RestapiService) { }

  ngOnInit() {
    this.initializeEmployees();
  }

  //static data befr connecting to database
  initializeEmployees() {
    this.service.getEmployees().subscribe(res => {
      this.allEmployees = res;
      this.filterEmployeeData = this.allEmployees;
    })
  }

  getEmployees(searchEmployee) {
    // set val to the value of the ev target
    var val = searchEmployee.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterEmployeeData = this.allEmployees.filter((res) => {
        return (res.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    else {
      this.initializeEmployees();
    }
  }
  viewEmpDetails(employee) {
    this.hide = !this.hide;
    this.service.getEmployee(employee._id)
      .subscribe((res) => {
        this.employeeByID = res;
        this.employeeByID = Array.of(this.employeeByID);
      });
  }
  hidepanel(){
    this.hide=!this.hide;
  }
  // deleteEmpDetails(id){
  //   this.service.deleteEmployee(id)
  //   .subscribe((res)=>{
  //     console.log(res)
  //     this.initializeEmployees()
  //   })
  //}
}
