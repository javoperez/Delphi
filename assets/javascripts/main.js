//= require jquery
//= require socket.io.min
//= require highcharts
//= require exporting
//= require canvasjs.min

var socket = io.connect();
var oko = 0;
var chart = 0;
var puntos = [];
$(document).ready(function() {
	window.onload = function () {
		chart = new CanvasJS.Chart("chartContainer",
		{
		      zoomEnabled: true,
			title:{
				text: "Spline Area Chart"
			},    
			axisY: {
				title: "Cardio",
				valueFormatString: "#0,,.",
			},
			data: [
			{        
				toolTipContent: "{y} units",
				type: "line",
				showInLegend: true,
				legendText: "source: Nielsen SoundScan",
				markerSize: 5,
				color: "#7DA9E3",
				dataPoints: puntos
			}             
			]
		});
		chart.render();
	}

        socket.on('voltaje', function (data) {
            console.log(data);
           var datas = data['valor'].split(',');
                 //var x = (new Date()).getTime();
     	     console.log(datas);
                 for (var i = 0; i < datas.length; i++) {
                 	if (datas[i] != "") {
		 		var yi = parseInt(datas[i]);
		 	           //    oko.series[0].addPoint([x,y],true,true);
		 	           oko++;
		 	           console.log(yi);
                                  if (puntos.length == 150) {
                                  	puntos = [];
	                                   chart.options.data[0].dataPoints = [];
	                                   chart.render();
	                                   chart.options.data[0].dataPoints = puntos;
	                                   oko = 0;
                                  } 

		 	           puntos.push({x:oko,y:yi});
		 	           chart.render();
                 	} 
               };
        });

      //   Highcharts.setOptions({
      //      global: {
      //           useUTC: false
      //       }
      //   });

      //   try{
      //           $('.graficacardio').highcharts({
      //               chart: {
      //                   type: 'spline',
      //                   marginRight: 10,
      //                   events: {
      //                       load: function() {
      //                               oko = this;
      //                       }
      //                   }
      //               },
      //               title: {
      //                   text: 'Electrocardiograma'
      //               },plotOptions: {
		    //         series: {
		    //             marker: {
		    //                 enabled: false
		    //             }
		    //         }
		    // },
      //               xAxis: {
      //                   type: 'datetime',
      //                   tickPixelInterval: 150
      //               },
      //               yAxis: {
      //                   title: {
      //                       text: 'Pulso'
      //                   },
      //                   plotLines: [{
      //                       value: 0,
      //                       width: 1,
      //                       color: '#808080'
      //                   }]
      //               },
      //               tooltip: {
      //                   formatter: function() {
      //                           return '<b>'+ this.series.name +'</b><br/>'+
      //                           Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
      //                           Highcharts.numberFormat(this.y, 2);
      //                   }
      //               },
      //               legend: {
      //                   enabled: false
      //               },
      //               exporting: {
      //                   enabled: false
      //               },
      //               series: [{
      //                   name: 'Pulso',
      //                   data: (function() {
      //                       // generate an array of random data
      //                       var data = [],
      //                           time = (new Date()).getTime(),
      //                           i;
            
      //                       for (i = -19; i <= 0; i++) {
      //                           data.push({
      //                               x: time + i * 1000,
      //                               y: 5
      //                           });
      //                       }
      //                       return data;
      //                   })()
      //               }]
      //           });
      //   }catch(e){
      //           console.log(e);
      //   }
});