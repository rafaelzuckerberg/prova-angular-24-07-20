import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; 
import { CepService } from './shared/services/cep.service';


import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, MatFormFieldModule } from '@angular/material'; 


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatInputModule,
		HttpClientModule,
		MatFormFieldModule
	],
	exports: [
		MatTableModule,
		FormsModule,
		MatSortModule,
		MatPaginatorModule,
		MatInputModule,
		MatFormFieldModule
	],
	providers: [
		CepService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
