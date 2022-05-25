import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { MatTable } from "@angular/material/table";
import { InvoiceService } from "../../../services/invoice.service";
import { AppConfirmService } from "../../../../shared/app-confirm/app-confirm.service";
import { Invoice } from "../../../../shared/models/invoice.model";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.scss"]
})
export class InvoiceListComponent implements OnInit {
  @ViewChild(MatTable) itemTable!: MatTable<any>;
  invoiceList!: Invoice[];

  itemTableColumn: string[] = [
    "Order No.",
    "Bill From",
    "Bill To",
    "Status",
    "Actions"
  ];

  constructor(
    private invoiceService: InvoiceService,
    private confirmService: AppConfirmService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getInvoiceList();
  }

  getInvoiceList() {
    this.invoiceService.getInvoiceList()
    .subscribe((res: any) => {
      this.invoiceList = res;
      this.cdr.detectChanges();
    });
  }

  deleteInvoiceById(id: number) {
    this.confirmService
      .confirm({ title: "Confirm", message: "Are you sure to delete?" })
      .subscribe(res => {
        if (res) {
          this.invoiceService.deleteInvoice(id).subscribe(e => {
            this.getInvoiceList();
          });
          this.itemTable.renderRows();
        } else return;
      });
  }
}
