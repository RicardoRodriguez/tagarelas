/**
 * 
 */

$(function() {

	/**
	 * Funcao para gravar dados para o grafico
	 * @param titLinha - Titulo da Linha
	 * @param theMatrix - Matriz resultado
	 */
	drawPieChart= function(titLinha,theMatrix) {

	};

	/**
	 * Desenha o grafico bolha.
	 * @param titLinha
	 * @param theMatrix
	 */

	GraficoController = function(){

	};

	GraficoController.prototype = {

			titLinha: null,
			theMatrix: null,

			/**
			 * Carrega todos os graficos para apresentação
			 * @param titLinha
			 * @param matriz
			 */
			doInit: function(titLinha,matriz){
				this.doBarChart(titLinha,matriz);
			},

			doBarChart: function (titLinha,theMatrix) {
				var data = new google.visualization.DataTable();
				data.addColumn('string', 'Participantes');
				data.addColumn('number', 'Enviadas');
				data.addColumn('number', 'Recebidas');
				//-------------------------------
				// MyEntry é minha linha de total 
				//-------------------------------
				var myEntr  = theMatrix[theMatrix.length-1];

				var myArray = new Array();
				data.addRows(theMatrix.length-2);
				for (var linha=0; linha < theMatrix.length-2; ++linha){
					var participante = titLinha[linha];
					var entrada      = myEntr[linha]-0;
					var saida= 0;
					var myLinha = theMatrix[linha]
					for (var col=0; col < myLinha.length; ++col){
						saida += myLinha[col]-0;
					} 
					data.setCell(linha,0,participante);
					data.setCell(linha,1,entrada);
					data.setCell(linha,2,saida);
				}

				 var options = {
					        title: "Mensagens Enviadas e Recebidas por participante",
					        width: 600,
					        height: 800,
					        bar: {groupWidth: "95%"},
					        //legend: { position: "none" },
					      };
				 
				var view = new google.visualization.DataView(data);
				view.setColumns([0, 1, 2]);
				var chart = new google.visualization.BarChart(document.getElementById('graficoColuna'));
				chart.draw(view, options);
			}
	}
});