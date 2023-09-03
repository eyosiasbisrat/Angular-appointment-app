import { Component } from '@angular/core';
import { Appointment} from '../models/appointment';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-appointement-list',
  templateUrl: './appointement-list.component.html',
  styleUrls: ['./appointement-list.component.css']
})
export class AppointementListComponent implements OnInit{
    ngOnInit(): void {
     
      let savedAppointements = localStorage.getItem("appointements");
      this.appointments = savedAppointements ? JSON.parse(savedAppointements): [];
    }

    newAppointementTitle:string = "";
    newAppointementDate:Date = new Date();
    appointments: Appointment[] = []

    addAppointemnet(){

      if(this.newAppointementTitle.trim().length && this.newAppointementDate){

          let newAppointement: Appointment ={
            id:Date.now(),
            title:this.newAppointementTitle,
            date:this.newAppointementDate
          }
          this.appointments.push(newAppointement);
          this.newAppointementTitle = "";//since we are using a Two way data binding this will reflect on the html page
          this.newAppointementDate = new Date();
          localStorage.setItem("appointements",JSON.stringify(this.appointments));
      }
    }

    deleteAppointement(index: number){
        this.appointments.splice(index,1);//slice specifices the index and the amount of elements to remove
        localStorage.setItem("appointements",JSON.stringify(this.appointments));//we replace the localStoge saved arry with this new one
        
    }
}
