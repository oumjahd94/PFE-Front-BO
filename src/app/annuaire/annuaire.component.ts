import { Component, OnInit } from '@angular/core';
import {AnnuaireModel} from '../Model/Annuaire';
import {AnnuaireService} from '../Service/AnnuaireService';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.css']
})
export class AnnuaireComponent implements OnInit {

  _annuaires : AnnuaireModel[] ;
   statusCode: number;
   requestProcessing = false;


  constructor(private annauireService: AnnuaireService ) {

  }

  getAnnuaires(): void {

    this.annauireService.getUsers()
      .subscribe(
        resultArray => {
          this._annuaires = resultArray;
          console.log(this._annuaires)
        },
        error => console.log("Error :: " + error)
      )

  }


  ngOnInit() {
    this.getAnnuaires() ;
  }


  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }


  //Delete article
  deleteUserById(UserId: number){
    var result = confirm("Êtes-vous sûr de vouloir supprimer définitivement l'élément:" +UserId);
    if (result) {
      this.preProcessConfigurations();
      this.annauireService.deleteAnnuaireById(UserId)
        .subscribe(successCode => {
            this.ngOnInit();
            this.statusCode = 204;
          },
          errorCode => this.statusCode = errorCode);
    }
  }


 // add method
  addUser () {
    this.annauireService.addAnnuaire();
    // select all data
      location.reload();
      this.ngOnInit();
  }



}
