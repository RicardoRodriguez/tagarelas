/**
 * 
 */

$(function() {

	drawPieChart= function(titLinha,theMatrix) {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Participantes');
		data.addColumn('number', 'Entradas');
		var myEntr  = theMatrix[theMatrix.length-1];
		var myArray = new Array();
		for (var linha=0; linha < theMatrix.length-1; ++linha){
			var myLinha = [titLinha[linha],myEntr[linha]];
			myArray.push(myLinha);
		}
		data.addRows(myArray);

		var piechart_options = {title:'Total de Entradas',
				width: 600,
				height: 600};
		var piechart = new google.visualization.PieChart(document.getElementById('graficoEntrada'));
		piechart.draw(data, piechart_options);
		
		var data1 = new google.visualization.DataTable();
		data1.addColumn('string', 'Participantes');
		data1.addColumn('number', 'Saidas');

		var saidas = new Array();
		for (var linha=0; linha < theMatrix.length -1; ++linha){
			var myLinha = theMatrix[linha]
			var total = 0;
			for (coluna=0; coluna < myLinha.length; ++coluna){
				total += myLinha[coluna];
			} 
			var myLinha = [titLinha[linha],total];
			saidas.push(myLinha);
		}
		
		data1.addRows(saidas);

		var piechart1_options = {title:'Total de Saidas',
				width: 600,
				height:600};
		var piechart1 = new google.visualization.PieChart(document.getElementById('graficoSaida'));
		piechart1.draw(data1, piechart1_options);
	},
	
	GraficoController = function(){

	};

	GraficoController.prototype = {

            titLinha: null,
            theMatrix: null,
            
			doInit: function(titLinha,matriz){
				
				//this.bubbleChart(titLinha,matriz);
				 this.pieChart(titLinha,matriz);
				//this.candleStick(titLinha,matriz);
				//this.columnBar(titLinha,matriz);
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

			doCreateColumnData: function (titLinha,theMatrix) {
				var entradas = theMatrix[theMatrix.length -1];
				var saidas = new Array();
				for (var linha=0; linha < theMatrix.length -1; ++linha){
					var myLinha = theMatrix[linha]
					var total = 0;
					for (coluna=0; coluna < myLinha.length; ++coluna){
						total += myLinha[coluna];
					} 
					saidas.push(total);
				}
				var result= new Array();
				result.push(['Participante', 'Entradas', 'Saidas']);
				for(var posicao=0;posicao < saidas.length; ++posicao){
					var myLinha = [this.titLinha[posicao],entradas[posicao],saidas[posicao]];
					result.push(myLinha);
				}
				return result;
			},

			/**
			 * Gera Grafico Bolha
			 * @param divGrafico
			 * @param titLinha
			 * @param TheMatrix
			 */		
			bubbleChart: function (titLinha,theMatrix){
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

			
			piechartLoadEntradas: function(titLinha,theMatrix){
				var myEntr = theMatrix[theMatrix.length-1];
				var result = new Array();
				for (var linha=0; linha < theMatrix.length-1; ++linha){
					var myLinha = [titLinha[linha],myEntry[linha]];
					result.push[myLinha];
				}
				return result;
			},
			
			/**
			 * Processa o grafico Pizza
			 * ===========================
			 * @param divGrafico
			 * @param titLinha
			 * @param TheMatrix
			 */  
			
			pieChart: function(titLinha,theMatrix){ 
				this.theMatrix = theMatrix;
				this.titLinha  = titLinha;
				google.charts.setOnLoadCallback(
						function(){ drawPieChart(titLinha,theMatrix)});

			},

			


			drawColumnChart: function(titLinha,theMatrix) {
				//var myData = this.doGenerateDataColumn();

				var myData = this.doCreateColumnData(titLinha,theMatrix);

				var data = google.visualization.arrayToDataTable(myData);

				var options = {
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