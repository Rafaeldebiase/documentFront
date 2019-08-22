import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';

import {CdkStepperModule} from '@angular/cdk/stepper';
import { MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        MatSelectModule,
        MatTableModule,
        MatSnackBarModule
        } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AplicationErrorHandler } from './appErrorHandler';
import { ErrorModelComponent } from './snackBarModels/error-model/error-model.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    SearchComponent,
    ErrorModelComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    CdkStepperModule,
    MatSelectModule,
    FileUploadModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: AplicationErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
