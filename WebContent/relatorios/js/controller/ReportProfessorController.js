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
			logData: null,
			turma: null,
			conversas: null,
			
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
				
				
				var conversas = this.conversas;
				var turma = this.turma;
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
				var myX = this.doCheckPosicaoVetor(this.titLinha,pessoas[0]);
				var myY = this.doCheckPosicaoVetor(this.titColuna,pessoas[1]);
			    var myEndLine = this.titLinha.length-1;
				this.matrix[myX][myY] = this.matrix[myX][myY] + 1;
				this.matrix[myEndLine][myY] = this.matrix[myEndLine][myY] + 1;
				
			},

			/**
			 * Encontra o elemento na linha ou coluna
			 */
			doCheckPosicaoVetor: function(tituloVetor,pessoa){
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
			         paging: false,
			         sorting:false,
			         columns: myColumns
			     } );
			},

			/**
			 * Monta o resumo após de montado a tabela
			 */
			doPrepareResumo: function(element){
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
				this.gc.doInit(this.titLinha,this.matrix);
			},
			
			doShowGrafico: function(opcao){
				opcao = opcao - 0;
				this.gc.doShowGraficoSelecionado(opcao);
			},
			
			/**
			 * Monta Analise de Mensagens
			 */
			doPrepareAnaliseMensagens: function(){
				console.log("executando ReportProfessorController >> doProcessaAnaliseMensagens...");
				var msg = new MessageController();
				msg.doProcessAllMessages(this.titLinha,this.matrix);
			},

			/**
			 * Executa a rotina principal do projeto
			 */
			doMainAction: function() {
				console.log("ReportProfessorController>>doMainAction" );
				
				/* Carrega o arquivo de Log */
				console.log("ReportProfessorController>>doMainAction>>Carregando arquivo de log...." );
				
				logConversaModel = new LogConversaModel();
				var arquivoLog = "logConversaModel."+$( "#selectLog :selected" ).val();
				this.logData = eval(arquivoLog);
				
				/* Prepara as turmas  */
				logConversaModel.doPrepareTurma(this.logData);
				this.turma =logConversaModel.getTurma();	
				
				/* Prepara as conversas */
	
				logConversaModel.doPrepareConversas(this.logData);
				this.conversas = logConversaModel.getConversas();
				
				
				/* Gerar matriz Adjacencia */
				this.doCreateMatrizAdjacencia("#tableResultado");
				
				/* Gerar Analise de Mensagens */
			    this.doPrepareAnaliseMensagens();
			    
				this.doShowMatrixAdjacente();
			
				/* Gerar resumo da Matriz */
				this.doPrepareResumo("#resumo");
				
				
				
				/* Gerar Grafico da Matrix */
			    this.doPrepareGrafico();
				/*this.doShowMensagens(relatorio,rpm);*/
			}	


	}});