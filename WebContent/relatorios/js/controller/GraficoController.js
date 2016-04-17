/**
 * 
 */

$(function() {

	GraficoController = function(){

	};

	GraficoController.prototype = {
		
			titLinha : null,
			theMatrix: null,
			
			doInit: function(titLinha,matriz){
				
				if ((typeof google === 'undefined') || (typeof google.visualization === 'undefined')) {
					 google.charts.load('41', {'packages':['corechart','bar']});			 
			    }
				 this.theMatrix = matriz;
				 this.titLinha = titLinha;
				 this.bubbleChart();
				 this.pieChart();
				 this.candleStick();
				 this.columnBar();
			},
			
			doShowGraficoSelecionado: function (opcao){
				$("#graficoBolha").hide();
				$("#graficoColuna").hide();
				$("#graficoCandelabro").hide();
				$("#graficoEntradaSaida").hide();
				
				if (opcao == 1) { // Bolha
					$("#graficoBolha").show();
					
				} else if (opcao == 2){ //Colunas
					$("#graficoColuna").show();
					
				} else if (opcao == 3){ //Candelabro
					 $("#graficoCandelabro").show();
					 
				} else if (opcao == 4){ // Grafico Pizza
					$("#graficoEntradaSaida").show();
				}
				
			},
			/**
			 * Gera Grafico Bolha
			 * @param divGrafico
			 * @param titLinha
			 * @param TheMatrix
			 */		
			bubbleChart: function (){
			    google.charts.setOnLoadCallback(this.drawSeriesChart);
			},
			
			drawSeriesChart: function () {

			      var data = google.visualization.arrayToDataTable([
			        ['ID', 'Life Expectancy', 'Fertility Rate', 'Region',     'Population'],
			        ['CAN',    80.66,              1.67,      'North America',  33739900],
			        ['DEU',    79.84,              1.36,      'Europe',         81902307],
			        ['DNK',    78.6,               1.84,      'Europe',         5523095],
			        ['EGY',    72.73,              2.78,      'Middle East',    79716203],
			        ['GBR',    80.05,              2,         'Europe',         61801570],
			        ['IRN',    72.49,              1.7,       'Middle East',    73137148],
			        ['IRQ',    68.09,              4.77,      'Middle East',    31090763],
			        ['ISR',    81.55,              2.96,      'Middle East',    7485600],
			        ['RUS',    68.6,               1.54,      'Europe',         141850000],
			        ['USA',    78.09,              2.05,      'North America',  307007000]
			      ]);

			      var options = {
			        title: 'Correlation between life expectancy, fertility rate ' +
			               'and population of some world countries (2010)',
			        hAxis: {title: 'Life Expectancy'},
			        vAxis: {title: 'Fertility Rate'},
		            width:900,
		            height:400,
			        bubble: {textStyle: {fontSize: 11}}
			      };
			      
			      var chartBubble = 
			    	  new google.visualization.BubbleChart(document.getElementById("graficoBolha"));
			      chartBubble.draw(data, options);
			    },
			    
			  /**
			   * Processa o grafico Pizza
			   * ===========================
			   * @param divGrafico
			   * @param titLinha
			   * @param TheMatrix
			   */  
			  pieChart: function(divGrafico,titLinha,TheMatrix){ 
			      google.charts.setOnLoadCallback(this.drawPieChart);
			  },
			  
			  drawPieChart: function() {
			        var data = new google.visualization.DataTable();
			        data.addColumn('string', 'Topping');
			        data.addColumn('number', 'Slices');
			        data.addRows([
			          ['k1s', 3],
			          ['k2', 1],
			          ['Olives', 1],
			          ['Zucchini', 1],
			          ['Pepperoni', 2]
			        ]);

			        var piechart_options = {title:'Total de Entradas',
			                       width:450,
			                       height:400};
			        var piechart = new google.visualization.PieChart(document.getElementById('graficoEntrada'));
			        piechart.draw(data, piechart_options);
			    
			        var data1 = new google.visualization.DataTable();
			        data1.addColumn('string', 'Topping');
			        data1.addColumn('number', 'Slices');
			        data1.addRows([
			          ['S1', 3],
			          ['S2', 1],
			          ['Olives', 1],
			          ['Zucchini', 1],
			          ['Pepperoni', 2]
			        ]);

			        var piechart1_options = {title:'Total de Saidas',
			                       width:450,
			                       height:400};
			        var piechart1 = new google.visualization.PieChart(document.getElementById('graficoSaida'));
			        piechart1.draw(data1, piechart1_options);
			  },
			  
			  columnBar: function(){
				  google.charts.setOnLoadCallback(this.drawColumnChart);
			  },
			  
			  drawColumnChart: function() {
			        var data = google.visualization.arrayToDataTable([
			          ['Year', 'Sales', 'Expenses', 'Profit'],
			          ['2014', 1000, 400, 200],
			          ['2015', 1170, 460, 250],
			          ['2016', 660, 1120, 300],
			          ['2017', 1030, 540, 350]
			        ]);

			        var options = {
			         // chart: {
			         //   title: 'Company Performance',
			         //   subtitle: 'Sales, Expenses, and Profit: 2014-2017',
			         // },
			        	title:'Entradas e Saidas',
		                width:900,
		                height:400   
			        };

			        var chart = new google.charts.Bar(document.getElementById('graficoColuna'));

			        chart.draw(data, options);  
			  },
			  
			  candleStick: function(){
			      google.charts.setOnLoadCallback(this.drawCandleStick);
			  },
			  
			  drawCandleStick: function() {
				    var data = google.visualization.arrayToDataTable([
				      ['Mon', 20, 28, 38, 45],
				      ['Tue', 31, 38, 55, 66],
				      ['Wed', 50, 55, 77, 80],
				      ['Thu', 77, 77, 66, 50],
				      ['Fri', 68, 66, 22, 15]
				      // Treat first row as data as well.
				    ], true);

				    var options = {
		              width:900,
		              height:400,
				      legend:'none'
				    };

				    var chart = new google.visualization.CandlestickChart(document.getElementById('graficoCandelabro'));

				    chart.draw(data, options);
			 },
			 
			 

			  
			  
	}
});