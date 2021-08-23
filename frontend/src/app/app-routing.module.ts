import { RecoveryComponent } from './components/recovery/recovery.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormUserComponent } from './components/form-user/form-user.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {EmpresaComponent} from './components/empresa/empresa.component';
import {FpdualComponent} from './components/fpdual/fpdual.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ModuloComponent } from './components/modulo/modulo.component';
import { ResultadoAprendizajeComponent } from './components/resultado-aprendizaje/resultado-aprendizaje.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { LogComponent } from './components/log/log.component';
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { ResetContrasenaComponent } from './components/reset-contrasena/reset-contrasena.component';
import { AuthGuardService as AuthGuard } from './guards/auth-guards.service';
const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "navigation", component: NavigationComponent},
  {path: "adminpage", component: AdminpageComponent, canActivate: [AuthGuard] },
  {path: "login", component: LoginComponent},
  {path: "formuser", component: FormUserComponent, canActivate: [AuthGuard]},
  {path: "editprofile", component: EditProfileComponent, canActivate: [AuthGuard] },
  {path: "fpdual", component: FpdualComponent, canActivate: [AuthGuard]},
  {path: "empresa", component: EmpresaComponent, canActivate: [AuthGuard]},
  {path: "usuario", component: UsuarioComponent, canActivate: [AuthGuard]},
  {path: "modulo", component: ModuloComponent, canActivate: [AuthGuard]},
  {path: "resultadoaprendizaje", component: ResultadoAprendizajeComponent, canActivate: [AuthGuard]},
  {path: "encuesta", component: EncuestaComponent, canActivate: [AuthGuard]},
  {path: "log", component: LogComponent, canActivate: [AuthGuard]},
  {path: "calificacion", component: CalificacionComponent, canActivate: [AuthGuard]},
  {path: "reset", component: ResetContrasenaComponent},
  {path: "recovery", component: RecoveryComponent},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  declarations: [],
  
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
