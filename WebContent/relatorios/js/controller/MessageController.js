/**
 * Controller de envio de mensagens de resultado do Relatório
 * ==========================================================
 */

$(function() {

	MessageController = function(){

	};

	MessageController.prototype = {

			messagesModel:       null,
			
			/**
			 * Enderacamento de Mensagens
			 */
			
			naoReceberam: "",
			menosReceberam: "", 
			maisReceberam: "",
			discrepantesReceberam: "",

			/**
			 * Producao de mensagens
			 */
			
			naoFalaram:  "",
			menosFalaram: "",
			maisFalaram: "",
			discrepantesFalaram: "", 

			allMessages: null,
			cc: null,
			media: 0,

			/**
			 * Preenche os dados de mensagem. Altera {$n} na mensagem fornecida
			 * ----------------------------------------------------------------
			 */	
			changeParameters: function (msg, p0,p1,p2,p3,p4,p5,p6,p7,p8,p9){
				var result = msg; 
				for (var i=0; i < 10; ++i){
					var conteudo = eval("p"+i);
					var param = "{$"+(i+1)+"}";
					if (typeof(conteudo) !== 'undefined'){
						result = result.replaceAll(param,conteudo);
					}
				}
				return result;
			},
			
			/**
			 * Processa a Enderecamento de mensagens.
			 * @param titLinhas
			 * @param theMatrix
			 * @returns {Array}
			 */
			processaParticipantesEnderecamento:function (titLinhas, theMatrix){
				var entradas = theMatrix[theMatrix.length -1];
				var myRecords = new Array(); 
				this.naoEnvouMensagens = "";
				for(var i=0; i < titLinhas.length-1; ++i){
					linha = [ titLinhas[i],entradas[i]];
					if (titLinhas[i] !== "Todos"){
						myRecords.push(linha);
						this.verificaEnderecamento(titLinhas[i],entradas[i]);
					}	 
				}
				return myRecords;
			},

			/**
			 * Compara as entradas com as regras de negocio
			 * @param participante - nome do participante
			 * @param total - totam de mensagens recebidas.
			 */
			verificaEnderecamento: function(participante,total,isFinal){
				/*
				 * Não receberam mensagens
				 * -----------------------
				 */
				if (total == 0){
					this.naoReceberam  += participante + ", ";
				}
				/*
				 * Menos receberam
				 * ----------------
				 */
				if (total < this.cc.inQ1){
					this.menosReceberam += 
						participante + "(" + total + " mensagens) , ";
				}

				/*
				 * Mais receberam
				 * --------------
				 */
				if (total > this.cc.inQ3){
					this.maisReceberam += 
						participante + "(" + total + " mensagens) , ";
				}

				/*
				 * Discrepantes
				 * ------------
				 */
				if (total > this.cc.inHigh){
					this.discrepantesReceberam += 
						participante + "(" + total + " mensagens) , ";
				}
			},

			/**
			 * Processa a producao de mensagens
			 */
			processaParticipantesProducao:function (titLinhas, theMatrix){
				var myRecords = new Array(); 
				for (var linha=0; linha < theMatrix.length-1; ++linha){
					var myLinha = theMatrix[linha]
					var totalColuna = 0;
					for (coluna=0; coluna < myLinha.length-1; ++coluna){
						totalColuna += myLinha[coluna];
					} 
					if (titLinhas[linha] != 'Todos') {
					   var l = [ titLinhas[linha],totalColuna];
						this.verificaProducao(l[0],l[1]);
						myRecords.push(l);
					}

				}
				return myRecords;
			},

			
			/**
			 * Compara a produção om as regras de negócio
			 * @param participante - nome do participante
			 * @param total - total de mensagens eniadas
			 */
			verificaProducao: function(participante,total){
				/*
				 * Nao falaram
				 */
				if (total == 0){
					this.naoFalaram  += participante + ", ";
				}
				/*
				 * Menor que primeiro quartil
				 */
				if (total < (this.cc.outQ1-0)){
					this.menosFalaram += participante + "(" + total + " mensagens) , ";
				}
				/*
				 * Saida maior que o terceiro quartil
				 */
				if (total > this.cc.outQ3){
					this.maisFalaram += participante + "(" + total + " mensagens) , ";
				}
				// Monopolio da conversa saida
				//----------------------------
				if (total > this.cc.outHigh && 
						total > this.totalMensagensSaidaMonopolio){
					this.discrepantesFalaram += participante + "(" + total + " mensagens) , ";
				}
				// Mais Ouvinte
				//----------------------
				if (total > this.totalMensagensMaisOuvinte){
					this.totalMensagensMaisOuvinte= total;
					this.saidaMaisOuvinte = participante;
				}

			},

			/**
			 * Produção de mensagens - Relatório.
			 * ==================================
			 */
			
			producaoMenosFalaram: function(){
				var myMsg = this.messagesModel.producao.menosFalaram();
				var result = this.changeParameters(myMsg,this.menosFalaram);
				if (! this.menosFalaram.isEmpty())
				    this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},
			
			producaoNaoFalaram: function(){
				var myMsg = this.messagesModel.producao.naoFalaram();
				var result = this.changeParameters(myMsg,this.naoFalaram);
				if (! this.naoFalaram.isEmpty())
				    this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},

			producaoMaisFalaram: function(){
				var myMsg = this.messagesModel.producao.maisFalaram();
				var result = this.changeParameters(myMsg,this.maisFalaram);
				if (! this.maisFalaram.isEmpty())
				    this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},
			
			producaoDiscrepantes: function(){
				var myMsg = this.messagesModel.producao.discrepantes();
				var result = this.changeParameters(myMsg,this.discrepantesFalaram);
				if (! this.discrepantesFalaram.isEmpty())
				    this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},
			
			producaoNaoDiscrepante: function(){
				var myMsg = this.messagesModel.producao.naoDiscrepantes();
				var result = this.changeParameters(myMsg,this.maisFalaram);
				if (this.discrepantesFalaram.isEmpty())
				    this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},
				
			/**
			 * Endereçamento de mensagens - Relatório.
			 * =======================================
			 */
			enderecamentoMenosReceberam: function(){
				var myMsg = this.messagesModel.enderecamento.menosReceberam();
				var result = this.changeParameters(myMsg,this.menosReceberam);
				if (! this.menosReceberam.isEmpty())
				    this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},
			
			enderecamentoNaoReceberam: function(){
				var myMsg = this.messagesModel.enderecamento.naoReceberam();
				var result = this.changeParameters(myMsg,this.naoReceberam);
				if (! this.naoReceberam.isEmpty())
				    this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},
			
			enderecamentoMaisReceberam: function(){
				var myMsg = this.messagesModel.enderecamento.maisReceberam();
				var result = this.changeParameters(myMsg,this.maisReceberam);
				if (! this.maisReceberam.isEmpty())
				    this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},
			
			enderecamentoDiscrepantes: function(){
				var myMsg = this.messagesModel.enderecamento.discrepantes();
				var result = this.changeParameters(myMsg,this.discrepantesReceberam);
				if (! this.discrepantesReceberam.isEmpty())
				    this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},
			
			enderecamentoNaoDiscrepante: function(){
				var myMsg = this.messagesModel.enderecamento.naoDiscrepantes();
				var result = this.changeParameters(myMsg,this.maisReceberam);
				if (this.discrepantesReceberam.isEmpty())
				    this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},
			
			
			doShowTable: function(entradas, saidas) {
				window.doClearElement("#tableEntradas");
				var myRecords = new Array();
				for (var i=0; i < entradas.length; ++i){
					myRecords.push ([entradas[i][0],saidas[i][1],entradas[i][1]]);
				}
				var myColumns = [{title:"Nome"},{title:"Mensagens Enviadas"},{title: "Mensagens Recebidas"}];
				$("#tableEntradas").DataTable( {
					data: myRecords,
					columnDefs: [
					             { className: "dt-body-center dt-body-center" },
					             ],
					             paging: false,
					             sorting: true,
					             bFilter: false,
					             destroy: true,
					             language: tableLanguage,
					             columns:myColumns
				} ); 
			},


			/**
			 * Total de mensagens enviadas.
			 * @param titLinhas
			 * @param theMatrix
			 */
			totalMensagensEnviadas: function(titLinhas,theMatrix){
				var entradas     = theMatrix[theMatrix.length -1];
				var totalPessoas = titLinhas.length-2;
				var totalMens    = 0;
				for (var i=0; i < entradas.length-1; ++i){
					totalMens += entradas[i];
				}
				//this.media = Math.round(totalMens/(titLinhas.length-1));
				var myMsg = this.messagesModel.producao.totalParticipantes();
				var result = this.changeParameters(myMsg,totalPessoas,totalMens,this.cc.outQ2);
				this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},

			doProcessAllMessages: function(titLinhas,theMatrix,theCalculoController){
				this.messagesModel = new ReportProfessorMessagesModel();
				this.cc = theCalculoController;
				this.allMessages   = '<div id="listAnalise"><h5>Análise de produção de mensagens</h5><br/><ul>';

				

				/**
				 * Processa a matriz de total de Entradas e Saidas
				 * ===============================================
				 */
				var entradas  = this.processaParticipantesEnderecamento(titLinhas,theMatrix);
				var saidas    = this.processaParticipantesProducao(titLinhas,theMatrix);
				
				this.doShowTable(entradas, saidas);

				/**
				 *  Produção de Mensagens.
				 */ 

				/**
			     * Total de mensagens
			     */
				this.totalMensagensEnviadas(titLinhas,theMatrix);
				
				/**
				 * Menos Falaram
				 * ===============
				 */
				this.producaoMenosFalaram();

				/**
				 * Não Falaram
				 * ===============
				 */
				this.producaoNaoFalaram();
				
				/**
				 * Mais Falaram
				 * ==============
				 */
				this.producaoMaisFalaram();

				/**
				 * Falaram de forma Discrepante
				 * =======================
				 */
				this.producaoDiscrepantes();

				/**
				 * Falaram de forma nao Discrepante
				 * ================================
				 */
				this.producaoNaoDiscrepante();

				
				/**
				 *Enderecamento de mensagens
				 * =========================
				 */
				this.allMessages  += 
					'</ul><br/><br/><h5>Análise do endereçamento de mensagens</h5><br/><ul>';

				/**
				 * Menos Receberam Mensagens
				 */
				this.enderecamentoMenosReceberam();

				/**
				 * Nao Receberam Mensagens
				 */
				this.enderecamentoNaoReceberam();

				/**
				 * Mais receberam Mensagens
				 */
				this.enderecamentoMaisReceberam();

				/**
				 * Receberam de forma discrepante
				 */
				this.enderecamentoDiscrepantes();
				
				/**
				 * Receberam de forma não discrepante
				 */
				this.enderecamentoNaoDiscrepante();
				

				/**
				 * Fim das mensagens
				 * =================
				 */
				this.allMessages +='</ul></div><br/><br/><p>'+ this.messagesModel.agradecimento()+'</p>';
				$("#mensagensAnalise").empty();
				$("#mensagensAnalise").append(this.allMessages);

			}

	}
});