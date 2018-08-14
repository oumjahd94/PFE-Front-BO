import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {EcheancerPrevisionnel} from "../Model/EcheancerPrevisionnel";
import {HttpErrorResponse} from "@angular/common/http/src/response";

@Injectable()
export class EcheancerPrevisionnelService {




    private message : any;
    private _echeancerArray = "http://localhost:8888/api/EcheanciersPrevisionnels";

    myFilesPart1:string [] = [];
    myFilesPart2:string [] = [];
    myFilesPart3:string [] = [];

    sMsg:string = '';
    fondsId:"4";
    datePublication : any;
    dateExpiration : any;
    scenariora : any;
    scenarioddt : any;


    constructor(private http: Http) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    }

    getEcheancerByFonds(idTypeCredilog): Observable<EcheancerPrevisionnel[]> {
        return this.http
            .get(`${this._echeancerArray}/${idTypeCredilog}`)
            .map((response: Response) => {
                return <EcheancerPrevisionnel[]>response.json();
            })
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }


    getFileDetailsP1 (e) {
        console.log('===upload de fichier P1 ===')
        for (var i = 0; i < e.target.files.length; i++) {
            this.myFilesPart1.push(e.target.files[i]);
            console.log(e.target.files)
        }
    }


  getFileDetailsP2 (e) {
    console.log('===upload de fichier P2 ===')
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFilesPart2.push(e.target.files[i]);
      console.log(e.target.files)

    }
  }


  getFileDetailsPS (e) {
    console.log('===upload de fichier S ===')
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFilesPart3.push(e.target.files[i]);
      console.log(e.target.files)

    }
  }

    ajouterEcheancer () {

        console.log('est ce que je suis la d abord !!') ;
        const frmData = new FormData();
        this.datePublication = ((document.getElementById("datePublication") as HTMLInputElement).value);
        this.dateExpiration = ((document.getElementById("dateExpiration") as HTMLInputElement).value);
        this.scenariora = ((document.getElementById("scenariora") as HTMLInputElement).value);
        this.scenarioddt = ((document.getElementById("scenarioddt") as HTMLInputElement).value);


        console.log('date de pub ==> '+ this.datePublication) ;
        console.log('date d expiration ==> '+ this.dateExpiration) ;
        console.log('les  valuers des scenarios RA ==>'+ this.scenariora+ '  DDT ==>'+ this.scenarioddt) ;

        frmData.append("datePublication", this.datePublication);
        frmData.append("dateExpiration", this.dateExpiration);
        frmData.append("scenariora", this.scenariora);
        frmData.append("scenarioddt", this.scenarioddt);


            for (var i = 0; i < this.myFilesPart1.length; i++) {
                frmData.append("file1", this.myFilesPart1[i]);
            }

           for (var i = 0; i < this.myFilesPart2.length; i++) {
                 frmData.append("file2", this.myFilesPart2[i]);
            }

            for (var i = 0; i < this.myFilesPart3.length; i++) {
                frmData.append("file3", this.myFilesPart3[i]);
            }


            console.log('part A ===>'+ this.myFilesPart1)
            console.log('part B ===>'+ this.myFilesPart2)
            console.log('part S ===>'+ this.myFilesPart3)


          this.http.post('http://localhost:8888/api/EcheanciersPrevisionnels/echeancer', frmData)
                .subscribe(
                data => {
                    // SHOW A MESSAGE RECEIVED FROM THE WEB API.
                    this.sMsg = data.toString();
                    console.log (this.sMsg);
                },
                (err: HttpErrorResponse) => {
                    console.log (err.message);    // SHOW ERRORS IF ANY.
                }
            );
            // select all data
            location.reload();


    }

    //Delete echeancer
    deleteEcheancerById(echeancerId: string): Observable<number> {
        return this.http.delete(this._echeancerArray +"/"+ echeancerId)
            .map(success => success.status)
            .catch(this.handleError);
    }

}
