import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { PricingModel } from '../Model/Pricing';
import {HistoriqueModel} from "../Model/Historique";
import {HttpErrorResponse} from "@angular/common/http/src/response";

@Injectable()
export class PricingService {

    private message : any;
    private _pricingArray = "http://localhost:8888/api/fondsDataPricings/";
    myFiles:string [] = [];
    sMsg:string = '';
    fondsId:"4";
    datePublication : any;
    dateExpiration : any;


    constructor(private http: Http) {
    }

    getPricingByFonds(idTypeCredilog): Observable<PricingModel[]> {
        return this.http
            .get(`${this._pricingArray}/${idTypeCredilog}`)
            .map((response: Response) => {
                return <PricingModel[]>response.json();
            })
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
    getFileDetails (e) {
        //console.log (e.target.files);
        for (var i = 0; i < e.target.files.length; i++) {
            this.myFiles.push(e.target.files[i]);
        }
    }

    ajouterPricing () {

        const frmData = new FormData();
        this.datePublication = ((document.getElementById("datePublication") as HTMLInputElement).value);
        this.dateExpiration = ((document.getElementById("dateExpiration") as HTMLInputElement).value);
        frmData.append("datePublication", this.datePublication);
        frmData.append("dateExpiration", this.dateExpiration);

        for (var i = 0; i < this.myFiles.length; i++) {
            frmData.append("file", this.myFiles[i]);
            console.log("file:"+this.myFiles[i])
        }

        console.log(frmData);
        this.http.post('http://localhost:8888/api/fondsDataPricings/pricing', frmData).subscribe(
            data => {
                // SHOW A MESSAGE RECEIVED FROM THE WEB API.
                this.sMsg = data.toString();
                console.log (this.sMsg);
            },
            (err: HttpErrorResponse) => {
                console.log (err.message);    // SHOW ERRORS IF ANY.
            }
        );
    }

    //Delete article
    deletePricingById(pricingId: string): Observable<number> {
        return this.http.delete(this._pricingArray +"/"+ pricingId)
            .map(success => success.status)
            .catch(this.handleError);
    }
}
