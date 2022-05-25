import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceService } from './../../services/invoice.service';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataBaseService } from './../../../shared/db/db.service';
import { InvoicePreviewComponent } from './invoice-details/invoice-preview/invoice-preview.component';

@NgModule({
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(DataBaseService, { passThruUnknownUrl: true}),
  ],
  declarations: [InvoiceListComponent, InvoiceDetailsComponent, InvoicePreviewComponent],
  providers: [InvoiceService]
})

export class InvoiceModule { }
