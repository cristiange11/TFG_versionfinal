import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from '../components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AppRoutingModule } from '../app-routing.module'
import { RoleGuardService } from '../guards/role-guard-service.service';
import { AuthorizationService } from 'src/app/guards/authorization.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitButton: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, RouterTestingModule, NgbModule, AppRoutingModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule],
      providers: [RoleGuardService, AuthService, AuthorizationService, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    submitButton = fixture.debugElement.query(By.css('boton-envio'));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get the data', fakeAsync(() => {
    fixture.componentInstance.login();
    tick();
    fixture.detectChanges();    
    expect(component.login).toEqual(true);
  }));

  

  /*it('Form should be invalid', async(() => {
  component.loginForm.controls['dni'].setValue('234A');
  component.loginForm.controls['password'].setValue('');
  expect(component.loginForm.valid).toBeFalsy();
}));

it('Form should be valid', async(() => {
  component.loginForm.controls['dni'].setValue('12345678A');
  component.loginForm.controls['password'].setValue('Olacmtas12');
  expect(component.loginForm.valid).toBeTruthy();
}));*/
});
