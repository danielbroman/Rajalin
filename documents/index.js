module.exports = ({
  consignor,
  receiver,
  startDate,
  startAddress,
  endAddress,
  additionalInfo,
  goods,
  signature
}) => {
  const theSignature = signature
    ? "data:image/png;base64," +
      Buffer.from(signature, "binary").toString("base64")
    : null;

  const theGoods = goods.map(g => {
    return `<div style="width: 20%;" class="goods-item-column">
              <p>${g.amount}</p>
            </div>
            <div style="width: 35%;" class="goods-item-column">
              <p>${g.description}</p>
            </div>
            <div style="width: 19%;" class="goods-item-column">
              <p>${g.weight}</p>
            </div>
            <div style="width: 18%;" class="goods-item-column">
              <p>${g.volume}</p>
            </div>`;
  });

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      href="https://fonts.googleapis.com/css?family=Oswald"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./css/pdf.css" />
    <title>Document</title>
  </head>
  <style>
  .above-logo {
    font-size: 12px;
    margin: 2px;
  }

  .additional-info {
    min-height: 200px;
    margin: 10px 5px 0px 5px;
  }

  .address-box {
    background: white;
    width: 355px;
    display: inline-block;
    border: 1px solid black;
    height: 100%;
    display: table-cell;
  }

  .signatures {
    margin-top: -10px;
  }

  .signature-column {
    height: 120px;
    width: 342px;
    display: inline-block;
    border-right: 1px solid black;
    margin-top: -10px;
    display: table-cell;
  }

  .signature-date {
    height: 30px;
    width: 342px;
    border-right: 1px solid black;
    
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    display: table-cell;
  }

  .signature-right {
    height: 120px;
    width: 345px;
    display: table-cell;
  }

  .signature-date-right {
    height: 30px;
    width: 345px;
    display: table-cell;
    
    
    border-bottom: 1px solid black;
    border-top: 1px solid black;
  }

  .address-box p {
    margin: 0px;
  }

  .address-text {
    margin: 5px;
  }

  .company-brand {
    position: fixed;
    font-family: "Oswald", sans-serif;
    font-weight: 900;
    font-size: 32px;
    right: 110px;
    top: 225px;
  }

  .goods {
    margin-top: 10px;
  }

  .goods-box {
    width: 100%;
    min-height: 200px;
    border: 1px solid black;
    margin-top: 15px;
  }

  .goods-column {
    display: inline-block;
    margin-left: 10px;
    margin-top: 1px;
  }
  .goods-item-column {
    display: inline-block;
    margin-left: 10px;
    margin-top: 1px;
  }

  .goods-item-column p {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 12px;
  }

  .goods-column p {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 12px;
  }

  .inner-wrap {
    margin: 30px;
  }

  .left-box {
    border-right: none;
    border-bottom: none;
  }
  .bottom-left-box {
    border-right: none;
  }

  .right-box {
    border-bottom: none;
  }
  .bottom-left-box {
    border-right: none;
  }

  .signature {
    width: 100%;
    min-height: 310px;
    border: 1px solid black;
    margin-top: 15px;
  }

  table {
    border-collapse: collapse;
  }

  .row {
    display: table; /* Make the container element behave like a table */
    width: 100%; /* Set full-width to expand the whole page */
    min-height: 80px;
  }
  .signature-row {
    display: table; /* Make the container element behave like a table */
    width: 100%; /* Set full-width to expand the whole page */
    min-height: 30px;
  }

  .small-heading {
    font-size: 12px;
  }
  </style>
  <body>
    <div class="inner-wrap">
      <div class="section">
        <div class="row">
          <div class="address-box left-box">
            <div class="address-text">
              <p class="small-heading">Lähettäjä Consignor</p>
              <p>${consignor}</p>
              <p>${startAddress}</p>
            </div>
          </div>
          <div class="address-box right-box">
            <p
              style="margin-top: 30px; position: fixed; vertical-align: center; margin-left: 140px;"
            >
              ${startDate.split("T")[0]}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="address-box left-box">
            <div class="address-text">
              <p class="small-heading">Vastaanottaja Consignee</p>
              <p>${consignor}</p>
              <p>${endAddress}</p>
            </div>
          </div>
          <div class="address-box right-box"></div>
        </div>
        <div class="row">
          <div class="address-box left-box">
            <div class="address-text">
              <p class="small-heading">Toimitusosoite Delivery address</p>
              <p>${consignor}</p>
              <p>${startAddress}</p>
            </div>
          </div>
          <div class="address-box right-box">
            <p class="above-logo">
              Rahdinkuljettaja (nimi,osoite,maa) Carrier (name,address,country)
            </p>
            <p class="company-brand">Raseborg Express</p>
          </div>
        </div>
        <div class="row">
          <div class="address-box left-box">
            <div class="address-text">
              <p class="small-heading">Lähtöpaikka Place of departure</p>
              <p>${consignor}</p>
              <p>${startAddress}</p>
            </div>
          </div>
          <div class="address-box right-box"></div>
        </div>
        <div class="row">
          <div class="address-box bottom-left-box">
            <div class="address-text">
              <p class="small-heading">Määräpaikka Final Destination</p>
              <p>${consignor}</p>
              <p>${endAddress}</p>
            </div>
          </div>
          <div class="address-box"></div>
        </div>
      </div>

      <div class="section">
        <div class="row">
          <div class="goods-box">
            <div style="width: 20%;" class="goods-column">
              <p>Merkit ja numerot</p>
              <p>Marks and numbers</p>
            </div>
            <div style="width: 35%;" class="goods-column">
              <p>Kollien lukumäärä ja laatu sekä tavaralaji</p>
              <p>Number and kind of packages, description of goods</p>
            </div>
            <div style="width: 19%;" class="goods-column">
              <p>Bruttopaino (kg)</p>
              <p>Gross weight in kg</p>
            </div>
            <div style="width: 18%;" class="goods-column">
              <p>Tilavuus (m3)</p>
              <p>Volume in (m3)</p>
            </div>
            <div class="goods">
              ${theGoods}
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="row">
          <div class="signature">
            <div class="additional-info">
              ${additionalInfo}
            </div>
            <div class="signature-row">
              <div class="signatures">
                <div class="signature-date">${
                  startDate.split("T")[0]
                }asddasd</div>
                <div class="signature-date"></div>
                <div class="signature-date-right"></div>
              </div>
            </div>
            <div class="row" style="margin-right: -10">
              <div class="signatures">
              <div class="signature-column"><img style="width: 100%;" src="${theSignature}" /></div>
              <div class="signature-column"><img style="width: 100%;" src="${theSignature}" /></div>
              <div class="signature-right"><img style="width: 100%;" src="${theSignature}" /></div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

`;
};
