import { Component, OnInit } from '@angular/core';
import { HistoriqueService} from "../Service/HistoriqueService";
import {HistoriqueModel} from "../Model/Historique";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Http} from "@angular/http";
import {} from "";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  _historiqueArray: HistoriqueModel[];
  selectedFiles: FileList;
  http:Http;
  form: FormGroup;
  name:string;
  file:File;
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;

  constructor(private historiqueService: HistoriqueService,
              private httpService: HttpClient,
              private fb: FormBuilder) {
  }

  getHistorique(): void {
    this.historiqueService.getHistoriqueByFonds(4)
      .subscribe(
        resultArray => this._historiqueArray = resultArray,
        error => console.log("Error :: " + error)
      )
  }


  ngOnInit(): void {
    this.getHistorique();
  }


  getFileDetails (e) {
    //console.log (e.target.files);
    this.historiqueService.getFileDetails(e);
  }

  ajouterHistorique () {
    // call ajouterSnapshot() method of snapshotService
    this.historiqueService.ajouterHistorique();
    // select all data
    location.reload();
    this.ngOnInit();
  }

  //Delete article
  deleteHistorique(historiqueId: string) {
    var result = confirm("Êtes-vous sûr de vouloir supprimer définitivement l'élément:" +historiqueId);
    if (result) {
      console.log("historique id:"+ historiqueId)
      this.preProcessConfigurations();
      this.historiqueService.deleteHistoriqueById(historiqueId)
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
