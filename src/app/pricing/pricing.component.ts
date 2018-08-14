import {Component, OnInit} from '@angular/core';
import {PricingService} from "../Service/PricingService";
import {PricingModel} from "../Model/Pricing";
import {HistoriqueModel} from "../Model/Historique";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Http} from "@angular/http";
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  _pricingArray: PricingModel[];
  selectedFiles: FileList;
  http:Http;
  form: FormGroup;
  name:string;
  file:File;
  statusCode: number;
  requestProcessing = false;
  constructor(private pricingService: PricingService,private httpService: HttpClient, private fb: FormBuilder) {
  }
  getPricing(): void {
    this.pricingService.getPricingByFonds(4)
      .subscribe(
        resultArray => this._pricingArray = resultArray,
        error => console.log("Error :: " + error)
      )
  }
  ngOnInit(): void {
    this.getPricing();
  }
  getFileDetails (e) {
    //console.log (e.target.files);
    this.pricingService.getFileDetails(e);
  }


  ajouterPricing () {
    // call ajouterSnapshot() method of snapshotService
    this.pricingService.ajouterPricing();
    // select all data
    location.reload();
    this.ngOnInit();
  }




  //Delete article
  deletePricing(pricingId: string) {
    var result = confirm("Êtes-vous sûr de vouloir supprimer définitivement l'élément:" +pricingId);
    if (result) {
      console.log("pricing id:"+ pricingId)
      this.preProcessConfigurations();
      this.pricingService.deletePricingById(pricingId)
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

