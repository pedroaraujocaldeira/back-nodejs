const html = () => {
  return `<!DOCTYPE html>

  <html>

  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>Backend Noje.js</title>
    <link rel="shortcut icon" href="./favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap" rel="stylesheet">

    <body>
      <body bgcolor="#3CB371" />
      <center>
        <style>
          body {
            left: 0;
            line-height: 200px;
            margin: auto;
            margin-top: -100px;
            position: absolute;
            top: 50%;
            width: 100%;
            color: #ffffff;
            font-family: 'Montserrat', sans-serif;
            font-size: 56px;
          }
          #frase {
            left: 0;
            line-height: 200px;
            margin: auto;
            margin-top: -100px;
            position: absolute;
            top: 65%;
            width: 87%;
            ;
            font-family: 'Montserrat', sans-serif;
            font-size: 8px;
          }
        </style>
  </head>

  <body>

    <div id="texto">
      <font face="Pacifico">Api Working</font>
    </div>

  </body>

  </html>
  `;
};

module.exports = {
  html,
};
