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
          
          saidasAcimaMaximo: "",
          saidasAbaixoMinimo: "",
          
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
			  if (total < this.media){
				  this.entradasAbaixoMinimo += participante + ", ";
			  }
			  if (total > this.media){
				  this.entradasAcimaMaximo += participante + ", ";
			  }
		  },

		  /**
		   * Compara as saidas om as regras de negócio
		   * @param participante - nome do participante
		   * @param total - total de mensagens recebeidas
		   */
		  verificaSaidas: function(participante,total){
			  if (total == 0){
					 this.naoRecebeuMensagens  += participante + " ";
			  }
			  if (total < this.cc.outLow){
				  this.saidasAbaixoMinimo += participante + " ";
			  }
			  if (total > this.cc.outHigh){
				  this.saidasAcimaMaximo += participante + " ";
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
				  if (titLinhas[linha] !== "Todos") {
					  var l = [ titLinhas[linha],totalColuna];
					  this.verificaSaidas(titLinhas[linha],totalColuna);
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
			                        { className: "dt-body-center dt-body-center" }
			                      ],
			         destroy: true,   
			         paging: false,
			         sorting:false,
			         columns:myColumns
			     } );
		  },
		  
		  naoEnviaramMensagem: function(){
			  var myMsg = this.messagesModel.semParticipacaoEnviadas();
			  console.log("MenssageController >> naoReceberamMensagem >> naoEnviaramMensagem >> "+ this.naoEnviouMensagens);
			  if (this.naoEnviouMensagens.isEmpty()) return false;
			  result = this.changeParameters(myMsg,this.naoEnviouMensagens);
			  this.allMessages += result.isEmpty()  ? "": "<li><p><em>"+result+"</em></p></li>";
			  return true;
		  },
		  
		  naoReceberamMensagem: function(){
			  var myMsg = this.messagesModel.semParticipacaoRecebidas();
			  console.log("MenssageController >> naoReceberamMensagem >> naoReceberamMensagem >> "+ this.naoRecebeuMensagens);
			  if (this.naoRecebeuMensagens.isEmpty()) {
				  return false;
			  }
			  var result = this.changeParameters(myMsg,this.naoRecebeuMensagens);
			  this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
			  return true;
		  },
		  
		  todosParticiparam: function(naoParticiparam){
			  if (naoParticiparam) return; 
			  var result = this.messagesModel.todosParticiparam();
			  this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>";
		  },
		  
		  participaramAcimaAbaixoMedia: function(){
			  var myMsg = this.messagesModel.acimaDaMedia();
		      var result = this.changeParameters(myMsg,this.entradasAcimaMaximo,this.media);
			  if (! this.entradasAcimaMaximo.isEmpty()) {
			      this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>"; 
		      }
			  myMsg = this.messagesModel.abaixoDaMedia();
			  result = this.changeParameters(myMsg,this.entradasAbaixoMinimo,this.media);
			  if(! this.entradasAbaixoMinimo.isEmpty()){
				  this.allMessages += result.isEmpty() ? "": "<li><p><em>"+result+"</em></p></li>"; 
			  }
		  },
		  
		  
		  /**
		   * Total de mensagens enviadas.
		   * @param titLinhas
		   * @param theMatrix
		   */
		  totalMensagensEnviadas: function(titLinhas,theMatrix){
			  var entradas = theMatrix[theMatrix.length -1];
			  var total = 0;
			  for (var i=0; i < entradas.length-1; ++i){
				  total += entradas[i];
			  }
			  var myMsg = this.messagesModel.totalMensagens();
			  var result = this.changeParameters(myMsg,total);
			  this.allMessages += "<li><p><em>"+result+"</em></p></li>";
			  
			  this.media = Math.round(total/(titLinhas.length-1));
			  result = this.changeParameters(this.messagesModel.media(),this.media);
			  this.allMessages += "<li><p><em>"+result+"</em></p></li>";
		  },
		
		  doProcessAllMessages: function(titLinhas,theMatrix,theCalculoController){
			    this.messagesModel = new ReportProfessorMessagesModel();
			    this.cc = theCalculoController;
			    this.allMessages   = '<div id="listAnalise"><ol>';
			    
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
			    this.todosParticiparam(naoEnviaram || naoReceberam);

			    /**
			     * Acima e abaico da Media
			     */
			    this.participaramAcimaAbaixoMedia();
			    
			    /**
			     * Fim das mensagens
			     * =================
			     */
			    this.allMessages +='</ol></div><p>'+ this.messagesModel.agradecimento()+'</p>';
			    $("#mensagensAnalise").empty();
			    $("#mensagensAnalise").append(this.allMessages);
			    
		  }
		  
	}
});