import { InMemoryDbService } from 'angular-in-memory-web-api';
import { InvoiceDB } from './invoices';

export class DataBaseService implements InMemoryDbService {
  createDb() {
    return { 
      'invoices': InvoiceDB.invoices,
    }
  }
}