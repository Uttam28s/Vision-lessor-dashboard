import { getRoundedUpAmount, wordify } from ".";

import * as React from "react";

export class ComponentToPrint extends React.PureComponent {
  render() {

    return (
      <div className="relativeCSS">
        <div dangerouslySetInnerHTML={{__html: generateHTML(this.props.data)}} />
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  // eslint-disable-line max-len
  return <ComponentToPrint ref={ref} text={props.text} />;
});

function generateHTML(bill) {


  const date = new Date(bill?.invoiceDate?.seconds * 1000); // Convert seconds to milliseconds

  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });


  return `
  <!DOCTYPE html>
<html xml:lang="en" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
        text-indent: 0;
      }
      p {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
        margin: 0pt;
      }
      .s1 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 13pt;
      }
      .s2 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 16pt;
      }
      .s3 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
      }
      .s4 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 11pt;
      }
      .s5 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 10pt;
      }
      .s6 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
        vertical-align: 2pt;
      }
      .s7 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 10pt;
        vertical-align: 1pt;
      }
      .s8 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 12pt;
      }
      .s9 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
        vertical-align: -1pt;
      }
      .s10 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
        vertical-align: -1pt;
      }
      .s11 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
        vertical-align: -2pt;
      }
      .s12 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s13 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 10pt;
        vertical-align: -1pt;
      }
      .s14 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 12pt;
      }
      .s15 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 12pt;
      }
      .s16 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
      }
      .s17 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
        vertical-align: 1pt;
      }
      // table, tbody {vertical-align: top; overflow: visible; } 
      .wrapper {
        width: 97%;
        padding: 20px;
      }
      .border {
        border: 1px solid black;
      }
      .border-top {
        border-top: 1px solid black;
      }
      .border-left {
        border-left: 1px solid black;
      }
      .border-right {
        border-right: 1px solid black;
      }
      .border-bottom {
        border-bottom: 1px solid black;
      }
      .capital {
        text-transform: uppercase;
      }
      .table_value {
        margin-left: 20pt;
      }
      .product_col {
        text-align: right;
        padding: 20pt 4pt;
      }
      .product_header {
        border-collapse: collapse;
        padding: 4pt;
      }
      .vertical_top {
        vertical-align : top;
      }
    </style>
  </head>
  <body class="customBody">
    <div class="wrapper">
      <!-- Header section -->
      <div style="display: flex" class="border">
        <div style="padding: 6pt">
          <img width="150" height="80" src="data:image/png;base64,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" />
        </div>
        <div
          class="border-left"
          style="width: 80%; padding: 6pt; text-align: -webkit-center"
        >
          <p
            class="s1"
            style="
              padding-left: 5pt;
              padding-right: 10pt;
              text-indent: 0pt;
              line-height: 12pt;
              text-align: center;
            "
          >
            TAX INVOICE
          </p>
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 5pt;
              padding-right: 14pt;
              text-indent: 0pt;
              line-height: 18pt;
              text-align: center;
            "
          >
            VISION LESSOR
          </p>
          <p
            class="s3"
            style="
              padding-left: 74pt;
              width: 376pt;
              padding-right: 75pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: center;
            "
          >
            Ground Floor, 94-Ayodhya Row House, NR. Brilliyant School, Dabholi,
            Katargam, Surat, Gujarat-395004. Mo no:+919372587046.
          </p>
          <div
            style="
              display: flex;
              justify-content: space-around;
              margin-top: 6pt;
              width: 100%;
            "
          >
            <p
              class="s1"
              style="
                padding-left: 5pt;
                padding-right: 6pt;
                text-indent: 0pt;
                text-align: center;
              "
            >
              GSTIN No. : 24AAJHN7158R1ZC
            </p>
            <p
              class="s1"
              style="
                padding-left: 5pt;
                padding-right: 6pt;
                text-indent: 0pt;
                text-align: center;
              "
            >
              PANNo. : AAJHN7158R
            </p>
          </div>
        </div>
      </div>
      <!-- Bill Details -->
      <div class="border" style="margin-top: 6pt">
        <!-- Invoice details -->
        <div style="display: flex" class="border-bottom">
          <div style="width: 40%; padding: 6pt">
            <table>
              <tbody>
                <tr class="vertical_top">
                  <td><p>Invoice No.</p></td>
                  <td><p class="s8 table_value">: ${bill?.invoiceNo || '-'}</p></td>
                </tr>
                <tr class="vertical_top">
                  <td><p>Invoice Date</p></td>
                  <td><p class="table_value">: ${formattedDate || '-'}</p></td>
                </tr>
                <tr class="vertical_top">
                  <td><p>State</p></td>
                  <td><p class="table_value">: ${bill?.state?.label || '-'}</p></td>
                </tr>
                <tr class="vertical_top">
                  <td><p>State Code</p></td>
                  <td><p class="table_value">: ${bill?.state?.value || '-'}</p></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="width: 20%; padding: 6pt" class="border-left border-right">
            <table>
              <tbody>
                <tr class="vertical_top">
                  <td><p>KBS</p></td>
                  <td>
                    <p class="s8 capital table_value">: ${bill?.kaneriaBillNo || '-'}</p>
                  </td>
                </tr>
              </tbody>
          </table>
          </div>
          <div style="width: 40%; padding: 6pt">
            <table>
              <tbody>
                <tr class="vertical_top">
                  <td><p>Transport name</p></td>
                  <td>
                    <p class="s8 capital table_value">: ${bill?.transporterName || '-'}</p>
                  </td>
                </tr>
                <tr class="vertical_top">
                  <td><p>Veh no</p></td>
                  <td><p class="table_value">: ${bill?.vehNo || '-'}</p></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Receiver and bank details -->
        <div style="display: flex; width: 100%">
          <!-- Receiver details -->
          <div style="width: 50%" class="border-right">
            <div>
              <p class="s8 border-bottom" style="text-align: center">
                Details of Receiver (Billed to)
              </p>
            </div>
            <div style="padding: 5pt">
              <table>
                <tbody>
                  <tr class="vertical_top">
                    <td><p>Name.</p></td>
                    <td>
                      <p class="s8 table_value capital">
                        : ${bill?.receiverName?.label || '-'}
                      </p>
                    </td>
                  </tr>
                  <tr class="vertical_top">
                    <td><p>Address</p></td>
                    <td style="width: 250pt;">
                      <p class="table_value">
                        : ${bill?.receiverAddress || '-'}
                      </p>
                    </td>
                  </tr>
                  <tr class="vertical_top">
                    <td><p>State</p></td>
                    <td><p class="table_value">: ${bill?.receiverState || '-'}</p></td>

                  </tr>
                  <tr class="vertical_top">
                    <td><p>State Code</p></td>
                    <td><p class="table_value">: ${bill?.receiverStateCode || '-'}</p></td>
                  </tr>
                  <tr class="vertical_top">
                    <td><p class="s8">GSTIN</p></td>
                    <td>
                      <p class="s8 table_value capital">: ${bill?.receiverGSTIN || '-'}</p>
                    </td>
                  </tr>
                  <tr class="vertical_top">
                    <td><p class="s8">PAN No.</p></td>
                    <td><p class="s8 table_value capital">: ${bill?.receiverPan || '-'}</p></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Bank details -->
          <div style="width: 50%" class="">
            <div>
              <p class="s8 border-bottom" style="text-align: center">
                Bank Details
              </p>
            </div>
            <div style="padding: 5pt">
              <table>
                <tbody>
                  <tr style="vertical-align : top;">
                    <td><p class="s8">BankName</p></td>
                    <td>
                      <p class="s8 table_value capital">
                        : THE VARACHHA CO-OPERATIVE BANK LTD. SURAT
                      </p>
                    </td>
                  </tr>
                  <tr class="vertical_top">
                    <td><p class="s8">AccountNo</p></td>
                    <td>
                      <p class="s8 table_value capital">: 00630110681615</p>
                    </td>
                  </tr>
                  <tr class="vertical_top">
                    <td><p class="s8">IFSC Code</p></td>
                    <td><p class="s8 table_value capital">: VARA0289006</p></td>
                  </tr>
                  <tr class="vertical_top">
                    <td><p class="s8">Branch</p></td>
                    <td><p class="s8 table_value capital">: KATARGAM</p></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <table style="border-collapse: collapse; width: 100%">
            <tr class="product_row" style="height: 10%">
              <th class="product_header border" style="border-left: 0">
                <p class="s1">Sr.</p>
              </th>
              <th class="product_header border">
                <p class="s1">Description of Goods</p>
              </th>
              <th class="product_header border"><p class="s1">HSN/SAC</p></th>
              <th class="product_header border">
                <p class="s1">Quantity in No.</p>
              </th>
              <th class="product_header border"><p class="s1">Unit</p></th>
              <th class="product_header border">
                <p class="s1">Quantity in PCS/KG</p>
              </th>
              <th class="product_header border"><p class="s1">Rate</p></th>
              <th class="product_header border">
                <p class="s1">Assble. Value</p>
              </th>
              <th class="product_header border"><p class="s1">GST %</p></th>
              ${bill?.isIGSTIN ? 
              `<th class="product_header border"><p class="s1">IGST</p></th>`
              : `<th class="product_header border"><p class="s1">SGST</p></th>
              <th class="product_header border"><p class="s1">CGST</p></th>`
            }
              <th class="product_header border" style="border-right: 0">
                <p class="s1">Amount In INR</p>
              </th>
            </tr>
            ${bill?.products && bill?.products.length && bill.products.flatMap((product,id) => 
                `<tr class="product_row" style="vertical-align: top">
                  <td class="product_col border-right"><p class="s12">${id + 1}.</p></td>
                  <td class="product_col border-right" style="text-align: left">
                    <p class="s12">${product?.name?.label || '-'}</p>
                  </td>
                  <td class="product_col border-right">
                    <p class="s12">${product?.hsn || '-'}</p>
                  </td>
                  <td class="product_col border-right">
                    <p class="s12">${product?.quantity || '-'}</p>
                  </td>
                  <td class="product_col border-right"><p class="s12">${product?.unit?.label || '-'}</p></td>
                  <td class="product_col border-right">
                    <p class="s12">${product?.pice || '-'}</p>
                  </td>
                  <td class="product_col border-right">
                    <p class="s12">${product?.price || '-'}</p>
                  </td>
                  <td class="product_col border-right">
                    <p class="s12">${product?.assembleValue || '-'}</p>
                  </td>
                  <td class="product_col border-right"><p class="s12">${product?.gst || '-'}</p></td>
                  ${product?.isIGSTIN ? 
                  `<td class="product_col border-right">
                    <p class="s12">${product?.assembleIgst || '-'}</p>
                  </td>` :
                  `<td class="product_col border-right">
                      <p class="s12">${(parseFloat(product?.assembleIgst)/2).toFixed(2) || '-'}</p>
                    </td>
                    <td class="product_col border-right">
                      <p class="s12">${(parseFloat(product?.assembleIgst)/2).toFixed(2) || '-'}</p>
                    </td>`
                  }
                  <td class="product_col border-right" style="border-right: 0">
                    <p class="s12">${product?.totalProductPrice || '-'}</p>
                  </td>
                </tr>`
              ).join('')
            }
            <tr class="product_row">
              <td
                class="border"
                style="text-align: center; border-left: 0; padding: 4pt"
                colspan="2"
              >
                <p class="s1">Sub total</p>
              </td>
              <td class="border"><p class="s12"></p></td>
              <td class="border"><p class="s12"></p></td>
              <td class="border"><p class="s12"></p></td>
              <td class="border"><p class="s12"></p></td>
              <td class="border"><p class="s12"></p></td>
              <td class="border"><p class="s12"></p></td>
              <td class="border"><p class="s12"></p></td>
              ${bill?.isIGSTIN ? `
              <td class="border"><p class="s1">${bill?.totalGstIn || '-'}</p></td>` : `
              <td class="border"><p class="s1">${(bill?.totalGstIn / 2).toFixed(2) || '-'}</p></td>
              <td class="border"><p class="s1">${(bill?.totalGstIn / 2).toFixed(2) || '-'}</p></td>
              `}
              <td class="border" style="border-right: 0; text-align: right">
                <p class="s1">${bill?.totalSum || '-'}</p>
              </td>
            </tr>
            <tr class="product_row">
              <td
                class="border"
                style="border-top: 0; border-left: 0"
                colspan="8"
              >
                <div>
                  <p
                    style="
                      margin-top: 12pt;
                      text-align: center;
                      text-decoration: underline;
                    "
                    class="s1"
                  >
                    
                  </p>
                  <table style="width: 50%">
                    <tr>
                      <th>
                        <p
                          class="s8"
                          style="text-align: center; width: 100pt; padding: 6pt"
                        >
                          
                        </p>
                      </th>
                      <th>
                        <p
                          class="s8"
                          style="text-align: center; width: 100pt; padding: 6pt"
                        >
                          
                        </p>
                      </th>
                      <th>
                        <p
                          class="s8"
                          style="text-align: center; width: 100pt; padding: 6pt"
                        >
                          
                        </p>
                      </th>
                      <th>
                        <p
                          class="s8"
                          style="text-align: center; width: 100pt; padding: 6pt"
                        >
                          
                        </p>
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <p
                          class="s8"
                          style="text-align: center; width: 100pt; padding: 6pt"
                        >
                          
                        </p>
                      </td>
                      <td>
                        <p
                          class="s8"
                          style="text-align: center; width: 100pt; padding: 6pt"
                        >
                          
                        </p>
                      </td>
                      <td>
                        <p
                          class="s8"
                          style="text-align: center; width: 100pt; padding: 6pt"
                        >
                          
                        </p>
                      </td>
                      <td>
                        <p
                          class="s8"
                          style="text-align: center; width: 100pt; padding: 6pt"
                        >
                          
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
              <td
                colspan=${bill.isIGSTIN ? '2' : '3'}
                class="border"
                style="
                  border-top: 0;
                  vertical-align: bottom;
                  padding: 4pt;
                  text-align: right;
                "
              >
                <p class="s12">Round Off</p>
              </td>
              <td
                class="border"
                style="
                  border-right: 0;
                  vertical-align: bottom;
                  padding: 4pt;
                  text-align: right;
                "
              >
                <p class="s12">${getRoundedUpAmount(bill.totalSum) > 0.5 ? '' : '-'}${getRoundedUpAmount(bill.totalSum) || '-'}</p>
              </td>
            </tr>
            <tr class="product_row">
              <td
                class="border"
                style="border-top: 0; border-left: 0"
                colspan="8"
              >
                <div>
                  <table style="width: 76.5%">
                    <tr>
                      <!-- <th><p class="s8" style="text-align: center; width: 1pt;"></p></th> -->
                      <th>
                        <p class="s8" style="text-align: center; width: 100pt">
                          Total
                        </p>
                      </th>
                      <th>
                        <p class="s8" style="text-align: center; width: 100pt">
                          
                        </p>
                      </th>
                      <th>
                        <p class="s8" style="text-align: center; width: 100pt">
                          
                        </p>
                      </th>
                      <th>
                        <p class="s8" style="text-align: center; width: 100pt">
                          
                        </p>
                      </th>
                    </tr>
                  </table>
                </div>
              </td>
              <td
                colspan=${bill.isIGSTIN ? '2' : '3'}
                class="border"
                style="border-top: 0; padding: 4pt; text-align: right"
              >
                <p class="s1">Invoice Total</p>
              </td>
              <td class="border" style="border-right: 0; padding: 4pt">
                <p class="s1" style="text-align: right">${Math.round(bill?.totalSum || 0) || '-'}</p>
              </td>
            </tr>
          </table>
        </div>
        <!-- Amount in Words -->
        <div class="border-bottom" style="display: flex; padding: 6pt">
          <p class="s1">Invoice value (in words):</p>
          <p class="s12" style="margin-left: 8pt">
            ${wordify(Math.round(bill?.totalSum || 0).toString()) || '-'}
          </p>
        </div>
        <!-- Footer -->
        <div>
          <div
            style="
              display: flex;
              width: 98%;
              justify-content: space-between;
              text-align: center;
              padding: 4pt;
            "
          >
            <p class="s1">TERM & CONDITION</p>
            <p class="s1">For, VISION LESSOR</p>
          </div>
          <div style="position: relative; padding-left: 4pt">
            <p>Subject to SURAT jurisdiction.</p>
            <p>
              038Gujarat038GujaratWe declare that invoice shows the actual price
              of
            </p>
            <p>the goods described.Payment within 30 Days from</p>
            <p>
              receipt of material.Interest @ 24% p.a. shall be charged after
            </p>
            <p>
              due date of payment.Duties & Taxes,if other than mentioned above
              shall also be w
            </p>
            <p style="position: absolute; right: -110pt; top: 20pt">.</p>
            <img
              style="position: absolute; right: 30pt; top: 30pt"
              src="data:image/png;base64,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"
              alt="sign"
            />
          </div>
          <div
            style="
              display: flex;
              width: 98%;
              justify-content: space-between;
              text-align: center;
              padding: 4pt;
            "
          >
            <p>E. & O. E.</p>
            <p class="s1">
              Certified that the particulars given above are true and correct.
            </p>
            <p class="s1">Authorized Signatory</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
  `;
}

export default generateHTML;
