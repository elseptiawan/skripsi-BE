module.exports = (data) => {
    var restoran = ``;
    data.forEach(element => {
        restoran += `
        <tr>
            <td>${element.nama}</td>
            <td>${element.alamat}</td>
            <td>${element.category.nama}</td>
        </tr>
        `;
    })
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
            .container{
                margin: 5px;
                border: 1px solid black;
            }
            h3{
                text-align: center;
            }
            th, td {
                border: 1px solid black;
                padding: 5px;
            }
            table {
                margin: 5px;
                width: 98%;
                border-collapse: collapse;
            }
          </style>
       </head>
       <body>
       <div class="container">
          <h3>Data Restoran dan Rumah Makan Tersertifikasi Halal Oleh MUI di Kota Bandung</h3>
          <table>
            <tr>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Kategori</th>
            </tr>
            ${restoran}
          </table>
        </div>
       </body>
    </html>
    `;
};