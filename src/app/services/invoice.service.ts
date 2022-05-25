import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

  constructor(private http: HttpClient) { }

  getInvoiceList() {
    return this.http.get('/api/invoices/');
  }

  getInvoiceById(id: number) {
    return this.http.get('/api/invoices/'+id);
  }
  
  saveInvoice(invoice: any) {
    if(invoice.id){
      return this.http.put('/api/invoices/'+invoice.id, invoice);
    } else {
      invoice.id = (Math.random() * 1000000000).toString();
      return this.http.post('/api/invoices/', invoice);
    }
  }

  deleteInvoice(id: number) {
    return this.http.delete('/api/invoices/'+id);
  }

}
