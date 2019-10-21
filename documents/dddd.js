module.exports = ({ consignor, receiver }) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <style>
  .address-box {
    background-color: #fff;
    width: 395px;
    height: auto;
    margin: -1px;
    border: 1px solid black;
    padding: 2px;
  }
  
  .address-box-horizontal {
    background-color: #fff;
    width: 300px;
    height: 98%;
    margin: -1px;
    border: 1px solid black;
    padding: 2px;
  }
  
  .address-box p {
    margin: 4px;
  }
  
  .flex-container {
    display: flex;
    flex-wrap: nowrap;
  }
  
  .goods-box {
    background-color: #fff;
    width: 99.4%;
    height: 100%;
    margin: -1px;
    border: 1px solid black;
    padding: 2px;
    min-height: 180px;
  }
  
  .goods-column {
    width: 25%;
  }
  
  .goods-description {
    margin: 7px;
  }
  
  .goods-row {
    width: 100%;
    height: 20px;
    background: grey;
  }
  
  .goods-title {
    font-size: 12px;
    margin: 2px;
    line-height: 10px;
  }

  .flex-horizontal {
    display: flex;
    flex-direction: column
  }
  
  .inner-wrap {
    padding: 40px;
    height: 1040px;
    max-width: 800px;
  }
  
  .section {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .signature-box {
    background-color: #fff;
    width: 99.4%;
    height: 100%;
    margin: -1px;
    border: 1px solid black;
    padding: 2px;
    min-height: 340px;
  }
  
  </style>
  <body>
    <div class="inner-wrap">
      <!--Top section-->
      <div class="section">
        <div class="flex-horizontal">
          <div class="flex-container">
            <div class="address-box">
              <small>Lähettäjä Consignor</small>
              <p>${consignor}</p>
              <p>Torbackavägen 65</p>
              <p>10160 Degerby</p>
            </div>
            <div class="address-box"></div>
          </div>
          <div class="flex-container">
            <div class="address-box">
              <small>Lähettäjä Consignor</small>
              <p>Walter Wolff</p>
              <p>Torbackavägen 65</p>
              <p>10160 Degerby</p>
            </div>
            <div class="address-box"></div>
          </div>
          <div class="flex-container">
            <div class="address-box">
              <small>Lähettäjä Consignor</small>
              <p>Walter Wolff</p>
              <p>Torbackavägen 65</p>
              <p>10160 Degerby</p>
            </div>
            <div class="address-box"></div>
          </div>
          <div class="flex-container">
            <div class="flex-horizontal">
              <div class="address-box">
                <small>Lähettäjä Consignor</small>
                <p>Walter Wolff</p>
                <p>Torbackavägen 65</p>
                <p>10160 Degerby</p>
              </div>
              <div class="address-box">
                <small>Lähettäjä Consignor</small>
                <p>Walter Wolff</p>
                <p>Torbackavägen 65</p>
                <p>10160 Degerby</p>
              </div>
            </div>
            <div class="flex-horizontal">
              <div class="address-box-horizontal">
                <small
                  >Rahdinkuljettajan varaukset ja huomautukset Carrier's
                  reserves and remarks</small
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--Middle section-->
      <div class="section">
        <div class="goods-box flex-horizontal">
          <div class="flex-container">
            <div class="goods-column">
              <p class="goods-title">Merkit ja numerot</p>
              <p class="goods-title">Marks and numbers</p>
            </div>
            <div class="goods-column">
              <p class="goods-title">
                Kollien lukumäärä ja laatu sekä tavaralaji
              </p>
              <p class="goods-title">
                Number and kind of packages, description of goods
              </p>
            </div>
            <div class="goods-column">
              <p class="goods-title">Bruttopaino (kg)</p>
              <p class="goods-title">Gross weight in kg</p>
            </div>
            <div class="goods-column">
              <p class="goods-title">Tilavuus (m3)</p>
              <p class="goods-title">Volume in (m3)</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="goods-column">
              <p class="goods-description">1</p>
            </div>
            <div class="goods-column">
              <p class="goods-description">
                Parti flyttgods
              </p>
            </div>
            <div class="goods-column">
              <p class="goods-description">2000</p>
            </div>
            <div class="goods-column">
              <p class="goods-description">20</p>
            </div>
          </div>
          <div class="flex-container">
            <div class="goods-column">
              <p class="goods-description">1</p>
            </div>
            <div class="goods-column">
              <p class="goods-description">
                Parti flyttgods
              </p>
            </div>
            <div class="goods-column">
              <p class="goods-description">2000</p>
            </div>
            <div class="goods-column">
              <p class="goods-description">20</p>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="signature-box flex-container"></div>
      </div>
    </div>
  </body>
</html>
`;
};
