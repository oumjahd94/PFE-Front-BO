import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Http} from '@angular/http';
import {RapportModel} from '../Model/Rapport';
import {RapportService} from '../Service/RapportService';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {


  public listOfRapports : RapportModel[] ;
  public  selectedFiles: FileList;
  public http:Http;
  public form: FormGroup;
  public name:string;
  public file:File;
  public statusCode: number;
  public requestProcessing = false;

  constructor(
    private rapportService : RapportService,
    private  httpClient : HttpClient,
    private formeBuilder : FormBuilder
  ) { }

// récupérer les rapports de fonds 4
  public getRapport() :void {
    this.rapportService.ListeRapportByFonds(4).subscribe(
      data => this.listOfRapports = data,
      error => console.log("erreur de requête" + error)
    )
  }


  ngOnInit(): void {
    this.getRapport() ;
  }

  //une fois l'ulpload est fait on fait appelle à ctt fct pour stocker le fichier
  public getFileDetails (e) {
      //console.log (e.target.files);
      this.rapportService.getFileDetails(e);
  }

  // Ajouter un rapport
  public addRapport(){
    this.rapportService.AddRapport() ;
    location.reload() ;
    this.ngOnInit() ;
  }

  public deleteRapport(rapportId){

    var result = confirm("Êtes-vous sûr de vouloir supprimer définitivement l'élément:" +rapportId);

    if (result) {
      console.log("snapshot id:"+ rapportId)
      this.preProcessConfigurations();
      this.rapportService.deleteRapportById(rapportId)
        .subscribe(successCode => {
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
