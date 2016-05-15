/**
 * Controller de envio de mensagens de resultado do Relatório
 * ==========================================================
 */

$(function() {

	MessageController = function(){

	};

	MessageController.prototype = {

			messagesModel:       null,
			naoEnviouMensagens:  "",
			naoRecebeuMensagens: "",

			entradasAcimaMaximo: "",
			entradasAbaixoMinimo: "",
			entradasAcimaQ3: "",
			entradaMonopolio:"",
			totalMensagensMonopolio:0,
			entradaMaisFalante:"",
			totalMensagensMaisFalante:0,

			saidasAcimaMaximo: "",
			saidasAbaixoQ1: "",
			saidasAcimaQ3: "",
			saidaMonopolio:"",
			totalMensagensSaidaMonopolio: 0,
			saidaMaisOuvinte:"",
			totalMensagensMaisOuvinte:0,



			allMessages: null,
			cc: null,
			media: 0,


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
			 * Processa a entrada de mensagens.
			 * @param titLinhas
			 * @param theMatrix
			 * @returns {Array}
			 */
			processaParticipantesEntrada:function (titLinhas, theMatrix){
				var entradas = theMatrix[theMatrix.length -1];
				var myRecords = new Array(); 
				this.naoEnvouMensagens = "";
				for(var i=0; i < titLinhas.length-1; ++i){
					linha = [ titLinhas[i],entradas[i]];
					if (titLinhas[i] !== "Todos"){
						myRecords.push(linha);
						this.verificaEntradas(titLinhas[i],entradas[i]);
					}	 
				}
				return myRecords;
			},

			/**
			 * Compara as entradas com as regras de negocio
			 * @param participante - nome do participante
			 * @param total - totam de mensagens recebidas.
			 */
			verificaEntradas: function(participante,total,isFinal){
				if (total == 0){
					this.naoRecebeuMensagens  += participante + ", ";
				}
				if (total < this.cc.inQ1){
					this.entradasAbaixoMinimo          
					+= participante + ", ";
				}

				if (total > this.cc.inQ3){
					this.entradasAcimaQ3 += participante + ", ";
				}

				if (total > this.cc.inHigh){
					this.entradasAcimaMaximo += participante + ", ";
				}
				// Mais Falante
				//----------------------
				if (total > this.totalMensagensMaisFalante){
					this.totalMensagensMaisFalante= total;
					this.entradaMaisFalante = participante;
				}

				// Monopolio da conversa
				//----------------------
				if (total > this.cc.inHigh && 
						total > this.totalMensagensMonopolio){
					this.totalMensagensMonopolio = total;
					this.entradaMonopolio = participante;
				}

			},

			/**
			 * Compara as saidas om as regras de negócio
			 * @param participante - nome do participante
			 * @param total - total de mensagens eniadas
			 */
			verificaSaidas: function(participante,total){
				/*
				 * Nao recebeu mensagens
				 */
				if (total == 0){
					this.naoEnviouMensagens  += participante + ", ";
				}
				/*
				 * Menor que primeiro quartil
				 */
				if (total < (this.cc.outQ1-0)){
					this.saidasAbaixoQ1 += participante + ", ";
				}
				/*
				 * saida maior que o terceiro quartil
				 */
				if (total > this.cc.outQ3){
					this.saidasAcimaQ3 += participante + ", ";
				}
				// Monopolio da conversa saida
				//----------------------------
				if (total > this.cc.outHigh && 
						total > this.totalMensagensSaidaMonopolio){
					this.totalMensagensSaidaMonopolio = total;
					this.saidaMonopolio = participante;
				}
				// Mais Ouvinte
				//----------------------
				if (total > this.totalMensagensMaisOuvinte){
					this.totalMensagensMaisOuvinte= total;
					this.saidaMaisOuvinte = participante;
				}

			},


			processaParticipantesSaida:function (titLinhas, theMatrix){
				var myRecords = new Array(); 
				for (var linha=0; linha < theMatrix.length-1; ++linha){
					var myLinha = theMatrix[linha]
					var totalColuna = 0;
					for (coluna=0; coluna < myLinha.length-1; ++coluna){
						totalColuna += myLinha[coluna];
					} 
					if (titLinhas[linha] != 'Todos') {
					   var l = [ titLinhas[linha],totalColuna];
						this.verificaSaidas(l[0],l[1]);
						myRecords.push(l);
					}

				}
				return myRecords;
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

			naoEnviaramMensagem: function(){
				if (this.naoEnviouMensagens.isEmpty()) return false;
				return true;
			},

			naoReceberamMensagem: function(){
				if (this.naoRecebeuMensagens.isEmpty()) {
					return false;
				}
				return true;
			},

			saidaMonopolioConversas: function(){
				var result="";
				var myMsg ="";
				if (this.totalMensagensSaidaMonopolio > 0){
					myMsg  = this.messagesModel.monopolioDeMensagens();
					result = this.changeParameters(myMsg,this.saidaMonopolio,
							this.totalMensagensSaidaMonopolio,this.cc.outHigh);
				} else {
					myMsg = this.messagesModel.semMonopolioDeMensagens();
					result = this.changeParameters(myMsg,this.saidaMonopolio,this.totalMensagensSaidaMonopolio);
				}
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			entradaPrimeiroQuartil: function(){
				var myMsg = this.messagesModel.entradaPrimeiroQuartil();
				result = this.changeParameters(myMsg,this.entradasAbaixoMinimo ,this.cc.inQ1);
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			entradaNaoParticipou: function(){
				var myMsg;	
				if (this.naoRecebeuMensagens.isEmpty()) 
					myMsg = this.messagesModel.entradaComTodosPartiparam();
				else
					myMsg = this.messagesModel.entradaNaoParticipou();
				result = this.changeParameters(myMsg,this.naoRecebeuMensagens);
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			entradaTerceiroQuartil: function(){
				var myMsg;	
				if (this.entradasAcimaQ3.isEmpty() ) 
					return;
				myMsg = this.messagesModel.entradaTerceiroQuartil();
				result = this.changeParameters(myMsg,this.entradasAcimaQ3, this.cc.inQ3);
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			doEntradaMonopolio: function(){
				var result="";
				var myMsg ="";
				if (this.totalMensagensMonopolio > 0){
					myMsg  = this.messagesModel.entradaMonopolio();
					result = this.changeParameters(
							myMsg,this.entradaMonopolio,this.totalMensagensMonopolio);
				} else {
					result = this.messagesModel.entradaSemMonopolio();
				}
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			todosParticiparam: function(naoParticiparam){
				if (naoParticiparam) return; 
				var result = this.messagesModel.todosParticiparam();
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			saidaParticiparamAcimaMedia: function(){
				var myMsg = this.messagesModel.acimaDaMedia();
				var result = this.changeParameters(myMsg,this.entradasAcimaMaximo,this.cc.outQ3);
				if (! this.entradasAcimaMaximo.isEmpty()) {
					this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>"; 
				}

			},

			saidaParticiparamAbaixoMedia: function(){  
				var myMsg = this.messagesModel.abaixoDaMedia();
				var myMsgComplementar = this.messagesModel.abaixoDaMediaComplementar();
				if (this.naoEnviouMensagens.isEmpty()) {
					myMsgComplementar = "";
				} else {
					myMsgComplementar = 
						this.changeParameters(myMsgComplementar,this.naoEnviouMensagens);
				};
				if(! this.saidasAbaixoQ1.isEmpty()){
					var result = 
						this.changeParameters(myMsg,this.saidasAbaixoQ1,this.cc.outQ1,myMsgComplementar);
					this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>"; 
				}
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
				var myMsg = this.messagesModel.totalMensagens();
				var result = this.changeParameters(myMsg,totalPessoas,totalMens,this.cc.outQ2);
				this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			},

			doProcessAllMessages: function(titLinhas,theMatrix,theCalculoController){
				this.messagesModel = new ReportProfessorMessagesModel();
				this.cc = theCalculoController;
				this.allMessages   = '<div id="listAnalise"><h5>Análise de produção de mensagens</h5><br/><ul>';

				this.totalMensagensEnviadas(titLinhas,theMatrix);

				/**
				 * Processa a matriz de total de Entradas e Saidas
				 * ===============================================
				 */
				var entradas  = this.processaParticipantesEntrada(titLinhas,theMatrix);
				var saidas = this.processaParticipantesSaida(titLinhas,theMatrix);
				this.doShowTable(entradas, saidas)
				/**
				 * Todos enviaram ou receberam mensagens na aula
				 * =============================================
				 */
				var naoEnviaram    = this.naoEnviaramMensagem() ;
				var naoReceberam   = this.naoReceberamMensagem()

				/**
				 * Abaixo da Media
				 * ===============
				 */
				this.saidaParticiparamAbaixoMedia();

				/**
				 * Acima da Media
				 * ==============
				 */
				this.saidaParticiparamAcimaMedia();

				/**
				 * Monopolio das mensagens
				 * =======================
				 */
				this.saidaMonopolioConversas();

				/**
				 * Saida de mensagens
				 * ===================
				 */
				this.allMessages  += 
					'</ul><br/><br/><h5>Análise do endereçamento de mensagens</h5><br/><ul>';

				/**
				 * Entradas abaixo do primeiro quartil
				 */
				this.entradaPrimeiroQuartil();

				/**
				 * Ninguem falou comigo
				 */
				this.entradaNaoParticipou();

				/**
				 * Entrada acima do Q3
				 */
				this.entradaTerceiroQuartil();

				/**
				 * Saidas Monopolio
				 */
				this.doEntradaMonopolio();

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