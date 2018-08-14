import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Http} from "@angular/http";
import {EcheancerPrevisionnelService} from "../Service/EcheancerPrevisionnelService";
import {EcheancerPrevisionnel} from "../Model/EcheancerPrevisionnel";
import {ScenarioDdtService} from "../Service/ScenarioDdtService";
import {ScenarioRaService} from "../Service/ScenarioRaService";
@Component({
  selector: 'app-echeancier',
  templateUrl: './echeancier.component.html',
  styleUrls: ['./echeancier.component.css']
})
export class EcheancierComponent implements OnInit {

  allScenarioRa : any;
  allScenarioDdt : any;
  currentScenarioRa : any;
  currentScenarioDdt : any;
  _echeancerArray: EcheancerPrevisionnel[];
  selectedFiles: FileList;
  http:Http;
  form: FormGroup;
  name:string;
  file:File;
  statusCode: number;
  requestProcessing = false;
  constructor(private echeancerService: EcheancerPrevisionnelService,private scenarioRaService :ScenarioRaService,private scenarioDDTService :ScenarioDdtService, private httpService: HttpClient, private fb: FormBuilder) {
  }


  getScenariosRa(): void {
    this.scenarioRaService.getScenarioRaByFonds(4)
      .subscribe(
        resultArray =>{
          this.allScenarioRa = resultArray;

        }
      )
  }

  getScenariosDdt(): void {
    this.scenarioDDTService.getScenarioDdtByFonds(4)
      .subscribe(
        resultArray => {
          this.allScenarioDdt = resultArray;

        }
      )
  }

  getEcheancer(): void {
    this.echeancerService.getEcheancerByFonds(4)
      .subscribe(
        resultArray => this._echeancerArray = resultArray,
        error => console.log("Error :: " + error)
      )
  }

  ngOnInit(): void {
    this.getEcheancer();
    this.getScenariosRa();
    this.getScenariosDdt();
  }


  getFileDetailsA (e) {
    //console.log (e.target.files);
    this.echeancerService.getFileDetailsP1(e);
  }

  getFileDetailsB (e) {
    //console.log (e.target.files);
    this.echeancerService.getFileDetailsP2(e);
  }


  getFileDetailsS (e) {
    //console.log (e.target.files);
    this.echeancerService.getFileDetailsPS(e);
  }



  ajouterEcheancer () {
    // call ajouterSnapshot() method of snapshotService
    this.echeancerService.ajouterEcheancer();
    this.ngOnInit();
  }

  //Delete article
  deleteEcheancer(echeancerId: string) {
    var result = confirm("Êtes-vous sûr de vouloir supprimer définitivement l'élément:" +echeancerId);
    if (result) {
      console.log("echeancer id:"+ echeancerId)
      this.preProcessConfigurations();
      this.echeancerService.deleteEcheancerById(echeancerId)
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
