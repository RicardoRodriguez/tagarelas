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

			/**
			 *  Limpa o elemento de tela informado no parametro element.
			 *  element - elemento que será removido da tela.
			 */
			doClearElement: function(element){
				$(element).empty();
			},

			/**
			 * Cria a matriz para montar o json.
			 * ---------------------------------
			 */
			doCreateMatrizAdjacencia: function(){
				var mockDataModel = new MockDataModel();
				var conversas = mockDataModel.doPreparaConversas();
				var turma = mockDataModel.getTurma();
				var titColuna = new Array();
				var titLinha  = new Array();
				this.carregarLinhaColuna(turma);
				this.doCreateMatrizResultado;
				for (conversa in conversas){
					var pessoas =  conversa.split("|");
					this.doSomaElementos(pessoas);
				}
			},

			/**
			 * Soma os elementos do vetor
			 */
			doSomaElementos: function(pessoas){
				var myX = doCheckPosicaoVetor(titLinha,pessoas[0]);
				var myY = doCheckPosicaoVetor(titiColuna,pessoas[1]);
				this.matrix[myX][myY] = this.matrix[myX][myY] + 1;
			},

			/**
			 * Encontra o elemento na linha ou coluna
			 */
			doCheckPosicaoVetor: function(vetor,pessoa){
				for (var pos = 0; vetor.lenght; ++pos ){
					if (vetor[pos]==pessoa){
						return pos;
					}
				}	
				return -1;
			},

			/**
			 * Cria a matriz zerada
			 * ---------------------
			 */
			doCreateMatrizResultado: function(){
				var tamLinha  = this.titLinha.lenght;
				var tamColuna = this.titColuna.lenght; 
				this.matrix = new Array(tamLinha)(tamColuna);
				for (var l = 0; l < tamLinha; ++ l ){
					for (var c = 0; c< tamColuna; ++c){
						matrix[l][c] = 0;
					}
				}
			},

			/**
			 * Monta o Vetor de Linhas e Colunas
			 * ---------------------------------
			 */
			carregarVetorLinhaColuna: function(){
				this.titColuna = new Array();
				this.titLinha  = new Array();
				for (participante in turma){
					this.titLinha.push(participante);
					this.titColuna.push(participante);
				}
				this.titLinha.push("Total");
				this.titColuna.push("Total");
			},

			/**
			 * Cria o cabecalho do relatório
			 */
			doCarregarCabecalho: function (element){
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
			},

			/**
			 * Mostra o resumo após de montado a tabela
			 * rpm = ReportProfessorModel
			 */
			doMostrarResumo: function(element,rpm){
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
			},

			/**
			 * Monta descricao do resuno
			 */
			doShowMensagens: function(element,rpm){

			},

			/**
			 * Executa a rotina principal do projeto
			 */
			doMainAction: function(element) {
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


	}});

