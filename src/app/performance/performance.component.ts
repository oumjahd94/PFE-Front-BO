import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PerformanceService} from "../Service/PerformanceService";
import {PerformanceModel} from "../Model/Performance";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Http} from "@angular/http";

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})

export class PerformanceComponent implements OnInit {

  _performanceArray: PerformanceModel[];
  selectedFiles: FileList;
  http:Http;
  form: FormGroup;
  name:string;
  file:File;
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;

  constructor(private performanceService: PerformanceService,private httpService: HttpClient,
              private fb: FormBuilder) {
  }


  getPerformance(): void {
    this.performanceService.getPerformanceByFonds(4)
      .subscribe(
        resultArray => this._performanceArray = resultArray,
        error => console.log("Error :: " + error)
      )
  }

  ngOnInit(): void {
    this.getPerformance();
  }
  getFileDetails (e) {
    //console.log (e.target.files);
    this.performanceService.getFileDetails(e);
  }
  ajouterPerformance () {
    // call ajouterSnapshot() method of performanceService
    this.performanceService.ajouterPerformance();
    // select all data
    /*location.reload();
    this.ngOnInit();*/
  }

  //Delete article
  deletePerformance(performanceId: string) {
    var result = confirm("Êtes-vous sûr de vouloir supprimer définitivement l'élément:" +performanceId);
    if (result) {
      console.log("performance id:"+ performanceId)
      this.preProcessConfigurations();
      this.performanceService.deletePerformanceById(performanceId)
        .subscribe(successCode => {
            //this.statusCode = successCode
            // Expecting success code 204 from server
            this.ngOnInit();
            this.statusCode = 204;
          },
          errorCode => this.statusCode = errorCode);
    }
  }
  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
}
