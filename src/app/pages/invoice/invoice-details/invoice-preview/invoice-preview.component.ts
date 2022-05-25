import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Invoice } from 'shared/models/invoice.model';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent implements OnInit {

  @Input() invoice: Invoice;
  @Input() currency: string;
  @Input() cost: number;
  @Input() vat: number;
  @Output() showEditOption = new EventEmitter<boolean>();

  itemTableColumn: string[] = [
    'Number',
    'Item Name',
    'Unit Price',
    'Unit',
    'Cost'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  print() {
    window.print();
  }

  showEdit(){
    this.showEditOption.emit(true);
  }
}
