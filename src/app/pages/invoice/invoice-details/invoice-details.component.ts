import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { InvoiceService } from './../../../services/invoice.service';
import { Invoice, InvoiceItem } from './../../../../shared/models/invoice.model';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class InvoiceDetailsComponent implements OnInit, OnDestroy {
  cost = 0;
  vat = 0;
  currency: string = '$';
  showEditOption = false;
  invoiceForm: FormGroup;
  invoiceFormSub: Subscription;
  invocieId: number = 0;
  invoice: Invoice = {item: []};
  emptyFormObject: InvoiceItem = {
    name: '',
    price: 0,
    unit: 0
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.invocieId = this.route.snapshot.params['id'];
    if (this.invocieId) {
      this.getInvoice();
      this.showEditOption = false;
    } else {
      this.buildInvoiceForm();
      this.showEditOption = true;
    }

    this.document.body.classList.add('print-body-content');
  }
  ngOnDestroy() {
    this.document.body.classList.remove('print-body-content');
  }

  getInvoice() {
    this.invoiceService.getInvoiceById(this.invocieId).subscribe((invoice: Invoice) => {
      this.invoice = invoice;
      this.calculateCost(this.invoice);
      this.buildInvoiceForm(this.invoice);
      this.cdr.markForCheck();
    });
  }

  buildInvoiceForm(invoice?: any) {
    this.invoiceForm = this.fb.group({
      id: [invoice ? invoice.id : ''],
      orderNo: [invoice ? invoice.orderNo : ''],
      status: invoice ? invoice.status : 'pending',
      date: invoice ? new Date(invoice.date) : '',
      vat: invoice ? invoice.vat : 0,
      currency: invoice ? invoice.currency : '$',
      seller: this.fb.group({
        name: [invoice ? invoice.seller.name : ''],
        address: [invoice ? invoice.seller.address : ''],
      }),
      buyer: this.fb.group({
        name: [invoice ? invoice.buyer.name : ''],
        address: [invoice ? invoice.buyer.address : ''],
      }),
      item: this.fb.array([])
    });
    console.log(this.invoice.item);

    this.invoice.item?.forEach((i:any) => {
      this.addNewItem(i);
    });

    if (this.invoiceFormSub){
      this.invoiceFormSub.unsubscribe();
    }

    this.invoiceFormSub = this.invoiceForm.valueChanges.subscribe(res => {
      this.calculateCost(res);
    });

  }

  calculateCost(invoice: any) {
    this.cost = 0;
    invoice.item.forEach((element: any) => {
      this.cost += element.unit * element.price;
    });
    this.vat = (invoice.vat * this.cost) / 100;
    this.currency = invoice.currency;
  }

  addNewItem(item: InvoiceItem) {
    this.invoiceItemFormArray.push(
      this.fb.group({
        name: [item ? item.name : ''],
        price: [item ? item.price : ''],
        unit: [item ? item.unit : '']
      })
    );
  }

  deleteItemFromInvoice(i: number) {
    this.invoiceItemFormArray.removeAt(i);
  }

  saveInvoice() {
    if (this.invoiceForm.invalid) {
      return;
    }
    this.invoiceService.saveInvoice(this.invoiceForm.value)
    .subscribe( (res: Invoice) => {
      this.invoice = this.invoiceForm.value;
      this.showEditOption = false;

      this.cdr.markForCheck();

      if (res) {
        this.router.navigateByUrl('/invoice/' + res.id);
      }
    });
  }

  get invoiceItemFormArray(): FormArray {
    return this.invoiceForm.get('item') as FormArray;
  }
}
