/**
 * Controller do Report Professor
 * ==============================
 */

var ReportProfessorController = 
	( function ($){

		/**
		 *  Limpa o elemento de tela informado no parametro element.
		 *  element - elemento que será removido da tela.
		 */
		var doClearElement = function(element){
			$(element).empty();
		};
		/**
		 * Carrega elementos do relatório e cria um paragrafo no local informado
		 */
		var doRelatarMatrizAdjacencia = function(element){
			var relatorio = $(element);
			var paragrafo = $(document.createElement("p"));
			var node = $(document.createTextNode("Matriz de Adjacência:"));
			paragrafo.appendChild(node);
			relatorio.appendChild(paragrafo);
			
			/*
			 * Manual do dynatable: 
			 *     https://www.dynatable.com/?sorts%5Byear%5D=-1#existing-json
			 */
			var $records = $('#json-records'),
		    myRecords = JSON.parse($records.text());
		    $('#my-final-table').dynatable({
		        dataset: {
		             records: myRecords,
		        }
		    });
			
            /*
			var table = document.createElement("table");
			var header = table.createTHead();
			var row = header.insertRow();     
			
			row.insertCell();
			for (j=0; j<vertices.length; j++) {
				var cell = row.insertCell();
				cell.innerHTML = vertices[j];
			}
			
			for (i=0; i<vertices.length; i++) {
				//var header = table.createTHead();
				var row = table.insertRow();     
				var cell = row.insertCell();
				cell.innerHTML = vertices[i];
				for (j=0; j<vertices.length; j++) {
					var cell = row.insertCell();
					cell.innerHTML = MatrizAdjacencia[i][j];
				}
			}


			relatorio.appendChild(table); */	
			
		};
	
		/**
		 * Cria o cabecalho do relatório
		 */
		var doCarregarCabecalho = function (element){
			/*
			 * Titulo do Relatorio
			 */
			var relatorio = $element;
			var h = $(document.createElement("H1"))
			h.appendChild($(document.createTextNode("Relatório de Análise")));
		    relatorio.appendChild(h);
			/*
			 * Aviso fornecido para informar qur o programa começa aqui
			 */
			var p = $(document.createElement("p"))
			p.appendChild(document.createTextNode("Aqui temos que produzir informações compreensíveis para tutores e alunos do ensino superior."));
		    relatorio.appendChild(p);
		}
		/**
		 * Mostra o resumo após de montado a tabela
		 * rpm = ReportProfessorModel
		 */
		var doMostrarResumo =function(element,rpm){
			var relatorio = $(element);
			//-- Outlier values
		    var lnSep = $(document.createElement("BR"));
		    var oPara = $(document.createElement("p"));
		    var inOutlierNode = 
		    	$(document.
		    			createTextNode("Grau de Entrada: Valor fora da curva - " + "Mínimo:" + 
		    			rpm.getInLow() + "; " + "Máximo:" + rpm.getInHigh()));
		 	var outOutlierNode = 
		 		$(document.
		 				createTextNode("Grau de Saída: Valor fora da curva - " + "Mínimo:" + 
		 				rpm.getOutLow() + "; " + "Máximo:" + getOutHigh()));
		    oPara.appendChild(inOutlierNode);
		    oPara.appendChild(lnSep);
		    oPara.appendChild(outOutlierNode);
		    relatorio.appendChild(oPara);	
		};
		
		/**
		 * Monta descricao do resuno
		 */
		var doShowMensagens= function(element,rpm){
			
		}
		
		/**
		 * Executa a rotina principal do projeto
		 */
		var doRelatarAction= function(element) {
			var relatorio = $(element);
			var rpm  = new ReportPorfessorModel();
			this.doClearElement(element);
			/* Carrega o cabecalho */
			this.doCarregarCabecalho(elemento)
			/* Gerar matriz Adjacencia */
			rpm = this.doRelatarMatrizAdjacencia(element);
			/* Apresenta resumo da MAtriz */
			this.doMostrarResumo (element,rpm);
			this.doShowMensagens(element,rpm);
		}
		
		
});
	