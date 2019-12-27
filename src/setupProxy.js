const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(  
    proxy('/weather', { 
      target: 'https://api.darksky.net/forecast/4efc8d5b0cfed4ce1296ad6e84063e11/',
      secure: true,
      changeOrigin: true,
      pathRewrite: {
        "^/weather": "/"        //将‘/weather’换成'/'
       },
    }),
    proxy('/loc', { 
        target: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB6zRgVNUzHY_LaA6NcY_fp1AP-j9Ry2FE',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          "^/loc": ""        //将‘/weather’换成'/'
         },
      }),
    );

}