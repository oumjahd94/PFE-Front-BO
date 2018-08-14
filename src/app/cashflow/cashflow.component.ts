import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Http} from "@angular/http";
import {CashflowModel} from "../Model/CashflowModel";
import {CashflowService} from "../Service/CashflowService";
import {ScenarioRaService} from "../Service/ScenarioRaService";
import {ScenarioDdtService} from "../Service/ScenarioDdtService";

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.css']
})
export class CashflowComponent implements OnInit {

  public allScenarioRa : any;
  public  allScenarioDdt : any;
  _cashflowArray: CashflowModel[];
  selectedFiles: FileList;
  http:Http;
  form: FormGroup;
  name:string;
  file:File;
  currentScenarioRa : any;
  currentScenarioDdt : any;
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;


  constructor(private cashflowService: CashflowService,
              private scenarioRaService :ScenarioRaService,
              private scenarioDDTService :ScenarioDdtService,
              private httpService: HttpClient,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.getCashflow();

    this.scenarioDDTService.getScenarioDdtByFonds(4)
      .subscribe(
        resultArray => {
          this.allScenarioDdt = resultArray;
        }
      )



    this.scenarioRaService.getScenarioRaByFonds(4)
      .subscribe(
        resultArray =>{
          this.allScenarioRa = resultArray ;
        }
      )

  }


  getCashflow(): void {
    this.cashflowService.getCashflowByFonds(4)
      .subscribe(
        resultArray => this._cashflowArray = resultArray,
        error => console.log("Error :: " + error)
      )
  }



  getScenariosRa(): void {
    this.scenarioRaService.getScenarioRaByFonds(4)
      .subscribe(
        resultArray => this.allScenarioRa = resultArray,
        error => console.log("Error :: " + error)
      )
    console.log(this.allScenarioRa);
  }



  getScenariosDdt(): void {
    this.scenarioDDTService.getScenarioDdtByFonds(4)
      .subscribe(
        resultArray => this.allScenarioDdt = resultArray,
        error => console.log("Error :: " + error)
      )
    console.log('qui ce quil affiche labas ==> '+this.allScenarioDdt);
  }



  getFileDetails (e) {
    //console.log (e.target.files);
    this.cashflowService.getFileDetails(e);
  }

  ajouterCashflow () {
    // call ajouterSnapshot() method of snapshotService
    this.cashflowService.ajouterCashflow();
    // select all data
/*    location.reload();
    this.ngOnInit();*/
  }


  //Delete article
  deleteCashflow(cashflowId: string) {
    var result = confirm("Êtes-vous sûr de vouloir supprimer définitivement l'élément:" +cashflowId);
    if (result) {
      console.log("cashflow id:"+ cashflowId)
      this.preProcessConfigurations();
      this.cashflowService.deleteCashflowById(cashflowId)
        .subscribe(successCode => {
            //this.statusCode = successCode
            // Expecting success code 204 from server
            this.ngOnInit();
            this.statusCode = 204;
          },
          errorCode => this.statusCode = errorCode);
    }
  }

  setNewScenarioRa(idScenarioFondsRa: any): void {
    this.getScenariosRa();
    console.log(idScenarioFondsRa);
    // Match the selected ID with the ID's in array
    this.currentScenarioRa = this.allScenarioRa.filter(value => value.idScenarioFondsRa === parseInt(idScenarioFondsRa));
    console.log(this.currentScenarioRa);
  }

  setNewScenarioDdt(idScenarioDdt: any): void {
    this.getScenariosDdt();
    console.log(idScenarioDdt);
    // Match the selected ID with the ID's in array
    this.currentScenarioDdt = this.allScenarioDdt.filter(value => value.idScenarioDdt === parseInt(idScenarioDdt));
    console.log(this.currentScenarioDdt);
  }
  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
}
