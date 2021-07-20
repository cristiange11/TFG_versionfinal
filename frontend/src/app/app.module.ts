import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DatePipe } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ModalComponent } from './components/modals/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CookieService } from 'ngx-cookie-service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';
import { DeleteComponent } from './components/modals/delete/delete.component';
import { CentroUpdateComponent } from './components/modals/centro/centro-update/centro-update.component';
import { CentroDeleteConfirmationComponent } from './components/modals/centro/centro-delete-confirmation/centro-delete-confirmation.component';
import { CentroCreateComponent } from './components/modals/centro/centro-create/centro-create.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTableFilterModule } from 'mat-table-filter';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { EmpresaCreateComponent } from './components/modals/empresa/empresa-create/empresa-create.component';
import { EmpresaUpdateComponent } from './components/modals/empresa/empresa-update/empresa-update.component';
import { EmpresaDeleteConfirmationComponent } from './components/modals/empresa/empresa-delete-confirmation/empresa-delete-confirmation.component';
import { FpdualComponent } from './components/fpdual/fpdual.component';
import { FpdualUpdateComponent } from './components/modals/fpdual/fpdual-update/fpdual-update.component';
import { FpdualCreateComponent } from './components/modals/fpdual/fpdual-create/fpdual-create.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioUpdateComponent } from './components/modals/usuario/usuario-update/usuario-update.component';
import { FpdualDeleteConfirmationComponent } from './components/modals/fpdual/fpdual-delete-confirmation/fpdual-delete-confirmation.component';
import { ModuloComponent } from './components/modulo/modulo.component';
import { ModuloCreateComponent } from './components/modals/modulo/modulo-create/modulo-create.component';
import { ModuloUpdateComponent } from './components/modals/modulo/modulo-update/modulo-update.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    CommonModule,
    NgbModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatMenuModule,
    MatDividerModule,
    TabViewModule,
    FontAwesomeModule,
    HttpClientModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    MatPaginatorModule,
    MatTableModule,
    CdkTableModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableFilterModule,
    MatInputModule ,
    MDBBootstrapModule.forRoot() 
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    FormUserComponent,
    LoginComponent,
    HomeComponent,
    AdminpageComponent,
    ModalComponent,
    DeleteComponent,
    CentroUpdateComponent,
    CentroDeleteConfirmationComponent,
    CentroCreateComponent,
    EditProfileComponent,
    EmpresaComponent,
    EmpresaCreateComponent,
    EmpresaUpdateComponent,
    EmpresaDeleteConfirmationComponent,
    FpdualComponent,
    FpdualUpdateComponent,
    FpdualCreateComponent,
    UsuarioComponent,
    UsuarioUpdateComponent,
    FpdualDeleteConfirmationComponent,
    ModuloComponent,
    ModuloCreateComponent,
    ModuloUpdateComponent,
    
  ],

  providers: [ConfirmationService, MessageService, CookieService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
