import { AdminAnnoncesComponent } from './components/admin-annonces/admin-annonces.component';
import { InformationComponent } from './pages/information/information.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthSideBarGuardsService } from './services/auth-sidebar-guards.service';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminMessageComponent } from './components/admin-message/admin-message.component';
import { AdminDoctorantsComponent } from './components/admin-doctorants/admin-doctorants.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardsService } from './services/auth-guards.service';
import { StagesComponent } from './stages/stages.component';
import { ProjectComponent } from './project/project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { NewProjectComponent } from './new-project/new-project.component';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu',  component: AdminLayoutComponent, children: [
      { path: 'doctorants', canActivate: [AuthSideBarGuardsService], component: AdminDoctorantsComponent },
      { path: 'message', component: AdminMessageComponent },
      { path: 'profile', component: AdminProfileComponent },
      { path: 'annonce', component: AdminAnnoncesComponent },
      {path:"projects",component:ProjectComponent},
  {path:"editProj/:id",component:EditProjectComponent},
  {path:"newProj",component:NewProjectComponent}
    ]
  },
  { path: 'contact', component: ContactComponent },
  { path: 'annonce', component: InformationComponent },
  { path: 'notfound', component: NotfoundComponent },
  {path:"stages",component:StagesComponent},
  //{path:"projects",component:ProjectComponent},
  //{path:"editProj/:id",component:EditProjectComponent},
  //{path:"newProj",component:NewProjectComponent},
  { path: '**', redirectTo: 'notfound' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
