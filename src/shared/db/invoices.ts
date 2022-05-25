export class InvoiceDB {
  static invoices = [
        {
            id: '234efds5dvvdsfg',
            orderNo: '232',
            status: 'pending',
            date: (new Date()),
            currency: '$',
            vat: 10,
            buyer: {
                name: 'Name one',
                address: 'nameOne@gmail.com \n istanbul,turkey \n \n +905487348764',
            },
            seller: {
                name: 'seller one',
                address: 'seller@gmail.com \n Adena, Turkey. \n \n +90284038532',
            },
            item: [{
                name: 'Item 1',
                unit: 9,
                price: 200
            }, {
                name: 'Item 2',
                unit: 15,
                price: 300
            }]
         },
        {
            id: '234efds5dwerdsgd',
            orderNo: '233',
            status: 'processing',
            date: (new Date()),
            currency: '$',
            vat: 10,
            buyer: {
                name: 'Name two',
                address: 'nametwo@gmail.com \n istanbul,turkey \n \n +905487348764',
            },
            seller: {
                name: 'seller two',
                address: 'seller@gmail.com \n Adena, Turkey. \n \n +90284038532',
            },
            item: [{
                name: 'Item 1',
                unit: 3,
                price: 2000
            }, {
                name: 'Item 2',
                unit: 2,
                price: 4000
            }]
         },
         {
            id: 'be4tdsa46fdgfgs',
            orderNo: '234',
            status: 'delivered',
            date: (new Date()),
            currency: '$',
            vat: 10,
            buyer: {
                name: 'Name three',
                address: 'nameThree@gmail.com \n istanbul,turkey \n \n +905487348764',
            },
            seller: {
                name: 'seller three',
                address: 'seller@gmail.com \n Adena, Turkey. \n \n +90284038532',
            },
            item: [{
                name: 'Item 1',
                unit: 5,
                price: 1000
            }, {
                name: 'Item 2',
                unit: 2,
                price: 4000
            }]
         },
        {
            id: '463fgfdhjtregdsryt',
            orderNo: '235',
            status: 'delivered',
            date: (new Date()),
            currency: '$',
            vat: 10,
            buyer: {
                name: 'Name four',
                address: 'nameFour@gmail.com \n istanbul,turkey \n \n +905487348764',
            },
            seller: {
                name: 'seller four',
                address: 'seller@gmail.com \n Adena, Turkey. \n \n +90284038532',
            },
            item: [{
                name: 'Item 1',
                unit: 3,
                price: 4000
            }, {
                name: 'Item 2',
                unit: 1,
                price: 5000
            }]
        }
  ]
}