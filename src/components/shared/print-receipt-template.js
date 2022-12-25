import moment from 'moment';

export const pritnReceiptTemplate = (sales, invoice, tableRef, t)=> {
  let salesToPrint = {};
  const totalSales = sales.reduce((total, sale)=> {total+= sale.value; return total;}, 0.0);
  const paymentDate = moment(Date.now()).format('YYYY-MM-DD hh:mm');
  const paymentMethod = "CARD";
  salesToPrint = {...salesToPrint, totalSales, paymentDate, paymentMethod};
  if(sales.length> 0) salesToPrint.colspan=Object.keys(sales[0]).length;
  salesToPrint.table = tableRef.current.innerHTML;
    return `<html>
    <head>
      <title>Receipt </title>
      <style>
        .root {
            background-color: white;
        }
        .title {
            font-size: 24;
            width: 100%;
            text-align: center;
            min-height: 60px;
        }
        .MuiSvgIcon-root {
            display: none;
        }
        .info {
            width: 300px;
            border: none;
        }
        .info td {
            border: none;
            height: fit-content;
            text-align: left;
            padding: 0;
        }
        .main {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            height: fit-content;
            margin-top: 10px;
        }
        .main td, th {
            border: 1px solid #dddddd;
            padding: 8px;
        }
        .empty-row {
          display: none;
        }
        .total td {
          width: 100%;
          font-size: 16px;
        }
        value: {
          font-weight: bold;
        }
        .total td {
          text-align: left;
        }
        th.action {
          display: none;
        }
        td.action {
          display: none;
        }
        .main th, .main td {
          text-align: center;
        }
        .main tr:nth-child(even) {
          background-color: #dddddd;
        }
      </style>
    </head>
    <body onload="window.print();window.close()"><div class='root'>
      <div class='title'>${t("Sales Receipt")}</div>
         <div class='receipt-body'>
                 <table class="info">
                    <tr><td>${t("Invoice Number")}</td><td>${invoice.invoiceNumber}</td></tr>
                    <tr><td>${t("Date of payment")}</td><td>${salesToPrint.paymentDate}</td></tr>
                    <tr><td>${t("Payment method")}</td><td>${salesToPrint.paymentMethod}</td></tr>
                 </table>
                 <table class="main"> 
                   ${salesToPrint.table}
                 </table>
                 <table class="total">
                    <tr><td class="total">${t("Total Sales")}: <span class="value">${salesToPrint.totalSales}&nbsp; ${t("BDT")}</span> </td><td></td></tr>
                 </table>
         </div>
      </div>
    </body>
  </html>`;
}
