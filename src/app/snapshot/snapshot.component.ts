import {Component, ElementRef, ViewContainerRef, OnInit, ViewChild} from '@angular/core';
import { SnapshotService} from "../Service/SnapshotService";
import {SnapshotModel} from "../Model/Snapshot";
import {FormGroup } from '@angular/forms';
import {Http} from "@angular/http";
import {HttpClient , HttpHandler} from '@angular/common/http';
import {FormBuilder, Validators} from "@angular/forms";
import {} from "";
@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.css']
})
export class SnapshotComponent implements OnInit {

  _snapshotArray: SnapshotModel[];
  selectedFiles: FileList;
  http:Http;
  form: FormGroup;
  name:string;
  file:File;
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;

  constructor(private snapshotService: SnapshotService,private httpService: HttpClient, private fb: FormBuilder) {
  }

  getSnapshot(): void {
    this.snapshotService.getSnapshotByFonds(4)
      .subscribe(
        resultArray => this._snapshotArray = resultArray,
        error => console.log("Error :: " + error)
      )
  }

  ngOnInit(): void {
    this.getSnapshot();
  }

  getFileDetails (e) {
    //console.log (e.target.files);
    this.snapshotService.getFileDetails(e);
  }

  ajouterSnapshot () {
    // call ajouterSnapshot() method of snapshotService
    this.snapshotService.ajouterSnapshot();
    // select all data
    location.reload();
    this.ngOnInit();
  }

  //Delete article
  deleteSnapshot(snapshotId: string) {
    var result = confirm("Êtes-vous sûr de vouloir supprimer définitivement l'élément:" +snapshotId);
    if (result) {
      console.log("snapshot id:"+ snapshotId)
      this.preProcessConfigurations();
      this.snapshotService.deleteSnapshotById(snapshotId)
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
