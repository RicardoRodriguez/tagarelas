/**
 * Controller do Report Professor
 * ==============================
 */

$(function() {

	ReportProfessorController = function(){

	};

	ReportProfessorController.prototype = {

			titLinha: null,
			titColuna:null,
			matrix:null,
			gc: null,

			/**
			 *  Limpa o elemento de tela informado no parametro element.
			 *  element - elemento que será removido da tela.
			 */
			doClearElement: function(element){
				console.log("executando doClearElement...");
				$(element).empty();
			},

			/**
			 * Cria a matriz para montar o json.
			 * ---------------------------------
			 */
			doCreateMatrizAdjacencia: function(){
				console.log("executando doCreateMatrizAdjacencia...");
				var mockDataModel = new MockDataModel();
				
				var conversas = 
					["@Felipe|Vania", "@Felipe|Valeria","Ana|@Felipe",
					 "Vania|Valeria", "Valeria|Paulo","Paulo|@Felipe"];
					//mockDataModel.doPreparaConversas();
				
				var turma = ["@Felipe","Vania", "Valeria", 
				             "Ana","Paulo","Carlos","Pedro","Mauro" ];//mockDataModel.getTurma();
				
				this.titColuna = new Array();
				this.titLinha  = new Array();
				this.doLaadVetorLinhaColuna(turma);
				this.doCreateMatrizResultado();
				for (var i=0; i < conversas.length ; ++i){
					var pessoas =  conversas[i].split("|");
					this.doAddElementos(pessoas);
				}
			},

			/**
			 * Soma os elementos do vetor
			 */
			doAddElementos: function(pessoas){
				console.log("executando doAddElementos...");
				var myX = this.doCheckPosicaoVetor(this.titLinha,pessoas[0]);
				var myY = this.doCheckPosicaoVetor(this.titColuna,pessoas[1]);
			    var myEndLine = this.titLinha.length-1;
				console.log("executando doAddElementos...Posicao XY=("+myX+","+myY+")");
				console.log("executando myEndLine.."+myEndLine);
				this.matrix[myX][myY] = this.matrix[myX][myY] + 1;
				this.matrix[myEndLine][myY] = this.matrix[myEndLine][myY] + 1;
				
			},

			/**
			 * Encontra o elemento na linha ou coluna
			 */
			doCheckPosicaoVetor: function(tituloVetor,pessoa){
				console.log("executando doCheckPosicaoVetor..."+tituloVetor+"..."+pessoa);
				for (var pos = 0; pos < tituloVetor.length; ++pos ){
					if (tituloVetor[pos]==pessoa){
						return pos;
					}
				}	
				return -1;
			},

			/**
			 * Cria a matrix...
			 * @param rows
			 * @param columns
			 * @returns {Array}
			 */
			doCreateMatrizArray: function(rows,columns) {
				   this.matrix = new Array(rows);
				   for (var i = 0; i < rows; i++) {
				       this.matrix[i] = new Array(columns);
				   }
			},
			
			/**
			 * Cria a matriz zerada
			 * ---------------------
			 */
			doCreateMatrizResultado: function(){
				console.log("executando doCreateMatrizResultado...");
				var tamLinha  = this.titLinha.length;
				var tamColuna = this.titColuna.length; 
				console.log("executando doCreateMatrizResultado...Tamanho da Matrix.."+tamLinha+".."+tamColuna);
				this.doCreateMatrizArray(tamLinha,tamColuna);
				for (var l = 0; l < tamLinha; ++ l ){
					for (var c = 0; c< tamColuna; ++c){
						this.matrix[l][c] = 0;
					}
				}
				console.log("executando doCreateMatrizResultado... Matrix Criada.."+this.matrix);
			},
			
			
			/**
			 * Monta o Vetor de Linhas e Colunas
			 * ---------------------------------
			 */
			doLaadVetorLinhaColuna: function(turma){
				console.log("executando doLaadVetorLinhaColuna..."+turma);
				this.titColuna = new Array();
				this.titLinha  = new Array();
				for (var i = 0; i < turma.length; ++i){
					this.titLinha.push(turma[i]);
					this.titColuna.push(turma[i]);
				}
				this.titLinha.push("<b>Total</b>");
				console.log("doLaadVetorLinhaColuna>>titLinha >> "+this.titLinha);
				console.log("doLaadVetorLinhaColuna>>titColuna >> "+this.titColuna);
			},

			/**
			 * Mostra o vetor de resultado da Matrix
			 */
			doShowMatrixAdjacente:function(){
				/*
				 * Manual do dynatable: 
				 *     https://www.dynatable.com/?sorts%5Byear%5D=-1#existing-json
				 */
				var atj = new PrepareArrayDataModel();
				
			     var myRecords =atj.doProcessArray(this.titLinha,this.titColuna,this.matrix);
				 var myColumns = atj.doPrepareArrayColumnName(this.titColuna);
				 this.doClearElement("#example");
			     $('#example').DataTable( {
			         data: myRecords,
			         columnDefs: [
			                        { className: "dt-body-center dt-body-center" }
			                      ],
			         destroy: true,   
			         paging: true,
			         sorting:false,
			         columns: myColumns
			     } );
			},

			/**
			 * Mostra o resumo após de montado a tabela
			 * rpm = ReportProfessorModel
			 */
			doShowResumo: function(element){
				console.log("executando doShowResumo... element:"+element);
				this.doClearElement(element);
                var cc = new CalculoController();
                cc.doInit(this.matrix);
                var txt = "<p>Grau de Entrada: Valor fora da curva - " + "Mínimo:" + 
					cc.inLow + "; " + "Máximo:" + cc.inHigh +"</p>\n" + 
					"<p>Grau de Saída: Valor fora da curva - " + "Mínimo:" + 
					cc.outLow + "; " + "Máximo:" + cc.outHigh + "</p>\n";
				console.log("Resultado do Calculo:\n"+txt);
				$(element).append(txt);
				cc=null;
			},

			/**
			 * Monta Grafico
			 */
			doPrepareGrafico: function(){
				console.log("executando doPrepareGrafico...");
				this.gc = new GraficoController();
				this.gc.doInit(this.matrix,this.titLinha);
			},
			
			doShowGrafico: function(opcao){
				opcao = opcao - 0;
				this.gc.doShowGraficoSelecionado(opcao);
			},
			
			/**
			 * Monta descricao do resuno
			 */
			doShowMensagens: function(element){
				console.log("executando doShowMensagens...");
			},

			/**
			 * Cria o cabecalho do relatório
			 */
			doLoadCabecalho: function (element){
				this.doClearElement(element);
				console.log("executando doLoadCabecalho..."+element);
				/*
				 * Titulo do Relatorio
				 */
				var h = "<H1>Relatório de Análise</H1>";
				/*
				 * Aviso fornecido para informar qur o programa começa aqui
				 */
				var p = "<p>Aqui temos que produzir informações compreensíveis " +
				"para tutores e alunos do ensino superior</p>";
				
				$(element).append( h +p );
			},


			/**
			 * Executa a rotina principal do projeto
			 */
			doMainAction: function() {
				console.log("ReportProfessorController>>doMainAction" );
				
				/* Carrega o cabecalho */
				this.doLoadCabecalho("#divMain")
				
				/* Gerar matriz Adjacencia */
				this.doCreateMatrizAdjacencia("#tableResultado");
				this.doShowMatrixAdjacente();
			
				/* Apresenta resumo da Matriz */
				this.doShowResumo("#resumo");
				
				/* Apresenta Grafico da Matrix */
				 $("#selectGrafico").show();
			    this.doPrepareGrafico();
				/*this.doShowMensagens(relatorio,rpm);*/
			}	


	}});