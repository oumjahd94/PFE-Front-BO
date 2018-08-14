import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SnapshotComponent } from './snapshot/snapshot.component';
import { PerformanceComponent } from './performance/performance.component';
import { HistoriqueComponent } from './historique/historique.component';
import { PricingComponent } from './pricing/pricing.component';
import { RapportComponent } from './rapport/rapport.component';
import { PiedPageComponent } from './pied-page/pied-page.component';
import { EntetePageComponent } from './entete-page/entete-page.component';
import { BarreLateraleComponent } from './barre-laterale/barre-laterale.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app.routing';
import { NavDashboardComponent } from './nav-dashboard/nav-dashboard.component';
import { TabModule } from 'angular-tabs-component';
import { ScenarioComponent } from './scenario/scenario.component';
import { CashflowComponent } from './cashflow/cashflow.component';
import { EcheancierComponent } from './echeancier/echeancier.component';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SnapshotService} from './Service/SnapshotService';
import {ScenarioRaService} from './Service/ScenarioRaService';
import {ScenarioDdtService} from './Service/ScenarioDdtService';
import {CashflowService} from './Service/CashflowService';
import {EcheancerPrevisionnelService} from './Service/EcheancerPrevisionnelService';
import {PerformanceService} from './Service/PerformanceService';
import {HistoriqueService} from './Service/HistoriqueService';
import {RapportService} from './Service/RapportService';
import {PricingService} from './Service/PricingService';
import { AnnuaireComponent } from './annuaire/annuaire.component';
import {AnnuaireService} from './Service/AnnuaireService';
import { LoginComponent } from './login/login.component';
import {AuthenticationServcie} from './Service/authentication-servcie';
@NgModule({
  declarations: [
    AppComponent,
    SnapshotComponent,
    PerformanceComponent,
    HistoriqueComponent,
    PricingComponent,
    RapportComponent,
    PiedPageComponent,
    EntetePageComponent,
    BarreLateraleComponent,
    NavDashboardComponent,
    ScenarioComponent,
    CashflowComponent,
    EcheancierComponent,
    AnnuaireComponent,
    LoginComponent
  ],
  imports: [
    TabModule,
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule, FormsModule, ReactiveFormsModule, FormsModule
  ],
  providers: [SnapshotService, ScenarioRaService,ScenarioDdtService,
    CashflowService, EcheancerPrevisionnelService, PerformanceService,
    HistoriqueService, RapportService, PricingService, AnnuaireService, AuthenticationServcie],
  bootstrap: [AppComponent]
})
export class AppModule { }
