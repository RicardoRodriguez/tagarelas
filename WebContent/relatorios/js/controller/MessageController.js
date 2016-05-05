/**
 * Controller de envio de mensagens de resultado do Relatório
 * ==========================================================
 */

$(function() {

	MessageController = function(){

	};

	MessageController.prototype = {

			messagesModel:       null,
			naoEnviouMensagens:  null,
			naoRecebeuMensagens: null,

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
			 * Compara as entradas com as regras de negocio
			 * @param participante - nome do participante
			 * @param total - totam de mensagens enviadas.
			 */
			verificaEntradas: function(participante,total,isFinal){
				if (total == 0){
					this.naoEnviouMensagens  += participante + ", ";
				}
				if (total < this.cc.inQ1){
					this.entradasAbaixoMinimo += participante + ", ";
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
			 * @param total - total de mensagens recebeidas
			 */
			verificaSaidas: function(participante,total){
				/*
				 * Nao recebeu mensagens
				 */
				if (total == 0){
					this.naoRecebeuMensagens  += participante + ", ";
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

			processaParticipantesEntrada:function (titLinhas, theMatrix){
				var entradas = theMatrix[theMatrix.length -1];
				var myRecords = new Array(); 
				this.naoEnviouMensagens = "";
				for(var i=0; i < titLinhas.length-1; ++i){
					linha = [ titLinhas[i],entradas[i]];
					if (titLinhas[i] !== "Todos"){
						myRecords.push(linha);
						this.verificaEntradas(titLinhas[i],entradas[i]);
					}	 
				}
				this.doShowTable("Mensagens Enviadas","#tableEntradas",myRecords);
			},


			processaParticipantesSaida:function (titLinhas, theMatrix){
				var myRecords = new Array(); 
				this.naoRecebeuMensagens = "";
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

				this.doShowTable("Mensagens Recebidas","#tableSaidas",myRecords);
			},

			doShowTable: function(titMensagem,element,myRecords) {
				window.doClearElement(element);
				var myColumns = [{title:"Nome"},{title:titMensagem}];
				$(element).DataTable( {
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

			monopolioConversas: function(){
				var result="";
				var myMsg ="";
				if (this.totalMensagensMonopolio > 0){
					myMsg  = this.messagesModel.monopolioDeMensagens();
					result = this.changeParameters(myMsg,this.entradaMonopolio,this.totalMensagensMonopolio);
				} else {
					myMsg = this.messagesModel.semMonopolioDeMensagens();
					result = this.changeParameters(myMsg,this.entradaMaisFalante,this.totalMensagensMaisFalante);
				}
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			saidaPrimeiroQuartil: function(){
				var myMsg = this.messagesModel.saidaPrimeiroQuartil();
				result = this.changeParameters(myMsg,this.saidasAbaixoQ1 ,this.cc.outQ1);
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			saidaNaoParticipou: function(){
				var myMsg;	
				if (this.naoRecebeuMensagens.isEmpty()) 
					myMsg = this.messagesModel.saidaComTodosPartiparam();
				else
					myMsg = this.messagesModel.saidaNaoParticipou();
				result = this.changeParameters(myMsg,this.naoRecebeuMensagens);
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			saidaTerceiroQuartil: function(){
				var myMsg;	
				if (this.saidasAcimaQ3.isEmpty() ) 
					return;
				myMsg = this.messagesModel.saidaTerceiroQuartil();
				result = this.changeParameters(myMsg,this.saidasAcimaQ3, this.cc.outQ3);
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			doSaidaMonopolio: function(){
				var result="";
				var myMsg ="";
				if (this.totalMensagensSaidaMonopolio > 0){
					myMsg  = this.messagesModel.saidaMonopolio();
					result = this.changeParameters(
							myMsg,this.saidaMonopolio,this.totalMensagensSaidaMonopolio);
				} else {
					result = this.messagesModel.saidaSemMonopolio();
				}
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			todosParticiparam: function(naoParticiparam){
				if (naoParticiparam) return; 
				var result = this.messagesModel.todosParticiparam();
				this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			},

			participaramAcimaMedia: function(){
				var myMsg = this.messagesModel.acimaDaMedia();
				var result = this.changeParameters(myMsg,this.entradasAcimaMaximo,this.cc.inHigh);
				if (! this.entradasAcimaMaximo.isEmpty()) {
					this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>"; 
				}

			},

			participaramAbaixoMedia: function(){  
				var myMsg = this.messagesModel.abaixoDaMedia();
				var myMsgComplementar = this.messagesModel.abaixoDaMediaComplementar();
				if (this.naoEnviouMensagens.isEmpty()) {
					myMsgComplementar = "";
				} else {
					myMsgComplementar = 
						this.changeParameters(myMsgComplementar,this.naoEnviouMensagens);
				};
				if(! this.entradasAbaixoMinimo.isEmpty()){
					var result = 
						this.changeParameters(myMsg,this.entradasAbaixoMinimo,this.cc.inQ1,myMsgComplementar);
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
				var totalPessoas = titLinhas.length-1;
				var totalMens    = 0;
				for (var i=0; i < entradas.length-1; ++i){
					totalMens += entradas[i];
				}
				//this.media = Math.round(totalMens/(titLinhas.length-1));
				var myMsg = this.messagesModel.totalMensagens();
				var result = this.changeParameters(myMsg,totalPessoas,totalMens,this.cc.inQ2);
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
				this.processaParticipantesEntrada(titLinhas,theMatrix);
				this.processaParticipantesSaida(titLinhas,theMatrix);

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
				this.participaramAbaixoMedia();

				/**
				 * Acima da Media
				 * ==============
				 */
				this.participaramAcimaMedia();

				/**
				 * Monopolio das mensagens
				 * =======================
				 */
				this.monopolioConversas();

				/**
				 * Saida de mensagens
				 * ===================
				 */
				this.allMessages  += 
					'</ul><br/><br/><h5>Análise do endereçamento de mensagens</h5><br/><ul>';

				/**
				 * Conversas abaixo do primeiro quartil
				 */
				this.saidaPrimeiroQuartil();

				/**
				 * Ninguem falou comigo
				 */
				this.saidaNaoParticipou();

				/**
				 * Saidas acima do Q3
				 */
				this.saidaTerceiroQuartil();

				/**
				 * Saidas Monopolio
				 */
				this.doSaidaMonopolio();

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