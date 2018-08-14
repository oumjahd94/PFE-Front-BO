import { Component, OnInit } from '@angular/core';
import { ScenarioDdtModel } from "../Model/ScenarioDDT";
import { ScenarioRaModel } from "../Model/ScenarioRa";
import { ScenarioDdtService } from "../Service/ScenarioDdtService";
import { ScenarioRaService } from "../Service/ScenarioRaService";
@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {

  _scenarioRaArray: ScenarioRaModel[];
  _scenarioDdtArray: ScenarioDdtModel[];
  statusCode: number;
  requestProcessing = false;

  constructor(private scenarioRaService: ScenarioRaService, private ScenarioDdtService: ScenarioDdtService) {

  }

  getScenarioRaByFonds(): void {
    this.scenarioRaService.getScenarioRaByFonds(4)
      .subscribe(
        resultArray => this._scenarioRaArray = resultArray,
        error => console.log("Error :: " + error)
      )
  }

  getScenarioDdtByFonds(): void {
    this.ScenarioDdtService.getScenarioDdtByFonds(4)
      .subscribe(
        resultArray => this._scenarioDdtArray = resultArray,
        error => console.log("Error :: " + error)
      )
  }

  deleteScenarioDdt(idScenarioDdt){
    var result = confirm("Êtes-vous sûr de vouloir supprimer définitivement l'élément:" +idScenarioDdt);
    if (result) {
      console.log("Scenario Fonds Ddt id:"+ idScenarioDdt)
      this.preProcessConfigurations();
      this.ScenarioDdtService.deleteScenarioDdtById(idScenarioDdt)
        .subscribe(successCode => {
            //this.statusCode = successCode
            // Expecting success code 204 from server
            this.ngOnInit();
            this.statusCode = 204;
          },
          errorCode => this.statusCode = errorCode);
    }

  }

  deleteScenarioRa(idScenarioFondsRa){

    var result = confirm("Êtes-vous sûr de vouloir supprimer définitivement l'élément:" +idScenarioFondsRa);
    if (result) {
      console.log("ScenarioFonds Ra id:"+ idScenarioFondsRa)
      this.preProcessConfigurations();
      this.scenarioRaService.deleteScenarioRaById(idScenarioFondsRa)
        .subscribe(successCode => {
            //this.statusCode = successCode
            // Expecting success code 204 from server
            this.ngOnInit();
            this.statusCode = 204;
          },
          errorCode => this.statusCode = errorCode);
    }
  }


  ngOnInit(): void {
    this.getScenarioRaByFonds();
    this.getScenarioDdtByFonds();
  }

  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }


  ajouterScenariosRa () {
    // call ajouterSnapshot() method of snapshotService
    this.scenarioRaService.ajouterScenariosRa();
    this.ngOnInit();
  }

  ajouterScenariosDdt () {
    // call ajouterSnapshot() method of snapshotService
    this.ScenarioDdtService.ajouterScenariosDdt();
    this.ngOnInit();
  }

}
