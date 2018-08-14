import {Routes} from '@angular/router';
import {SnapshotComponent} from './snapshot/snapshot.component';
import {PerformanceComponent} from './performance/performance.component';
import {HistoriqueComponent} from './historique/historique.component';
import {PricingComponent} from './pricing/pricing.component';
import {RapportComponent} from './rapport/rapport.component';
import {CashflowComponent} from './cashflow/cashflow.component';
import {EcheancierComponent} from './echeancier/echeancier.component';
import {ScenarioComponent} from './scenario/scenario.component';
import {AnnuaireComponent} from './annuaire/annuaire.component';
import {LoginComponent} from './login/login.component';

export const AppRoutes: Routes = [

  {
    path : '', redirectTo: '/login', pathMatch:'full'

  },
  {
    path : 'snapshot',
    component : SnapshotComponent,
  },

  {
    path : 'performance',
    component : PerformanceComponent,
  },
  {
    path : 'historique',
    component : HistoriqueComponent,
  },
  {
    path : 'pricing',
    component : PricingComponent,
  },
  {
    path : 'rapport',
    component : RapportComponent,
  },

  {
    path : 'scenario',
    component : ScenarioComponent,
  },
  {
    path : 'cashflow',
    component : CashflowComponent,
  },

  {
    path : 'echeancier',
    component : EcheancierComponent,
  },
  {
    path : 'annuaire',
    component : AnnuaireComponent,
  },
  {
    path :'login',
    component : LoginComponent,
  }

] ;
