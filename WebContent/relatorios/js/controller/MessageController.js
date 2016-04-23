/**
 * Controller de envio de mensagens de resultado do Relatório
 * ==========================================================
 */

$(function() {

	/**
	 * Cria o metodo replaceAll dentro de String
	 * @param search - o que quer se trocar
	 * @param replacement Para o que se deseja trocar
	 * @returns string substituido
	 * 
	 */
	String.prototype.replaceAll = function(search, replacement) {
	    var target = this;
	    return target.split(search).join(replacement);
	};
	
	MessageController = function(){

	};

	MessageController.prototype = {
			
		  messagesModel: null,

		  doClearElement: function(element){
				console.log("executando doClearElement...");
				$(element).empty();
		  },
		  
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
		  
		  processaParticipantesEntrada:function (titLinhas, theMatrix){
			     var entradas = theMatrix[theMatrix.length -1];
                 var myRecords = new Array(); 
				 for(var i=0; i < titLinhas.length-1; ++i){
					 linha = [ titLinhas[i],entradas[i]];
					 if (titLinhas[i] !== "Todos") 
						 myRecords.push(linha);
				 }
				 this.doShowTable("Mensagens Enviadas","#tableEntradas",myRecords);
		  },
		  
		  processaParticipantesSaida:function (titLinhas, theMatrix){
			  var myRecords = new Array(); 
			  for (var linha=0; linha < theMatrix.length-1; ++linha){
				  var myLinha = theMatrix[linha]
				  var totalColuna = 0;
				  for (coluna=0; coluna < myLinha.length-1; ++coluna){
					  totalColuna += myLinha[coluna];
				  } 
				  if (titLinhas[linha] !== "Todos") {
					  var l = [ titLinhas[linha],totalColuna];
					  myRecords.push(l);
				  }
			  }
			  this.doShowTable("Mensagens Recebidas","#tableSaidas",myRecords);
		  },

		  doShowTable: function(titMensagem,element,myRecords) {
			     this.doClearElement(element);
			     var myColumns = [{title:"Nome"},{title:titMensagem}];
				 this.doClearElement(element);
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
		  
		  
		  totalMensagensEnviadas: function(titLinhas,theMatrix){
			  var entradas = theMatrix[theMatrix.length -1];
			  var total = 0;
			  for (var i=0; i < entradas.length-1; ++i){
				  total += entradas[i];
			  }
			  var myMsg = this.messagesModel.totalMensagens();
			  result = this.changeParameters(myMsg,total);
			  return result;
		  },
		
		  doProcessAllMessages: function(titLinhas,theMatrix){
			    this.messagesModel = new ReportProfessorMessagesModel();
			    var allMessages = '<ul>'
			    allMessages += "<li>"+this.totalMensagensEnviadas(titLinhas,theMatrix)+"</li>"; 
			    
			    allMessages +='<ul>';	
			    $("#mensagensAnalise").empty();
			    $("#mensagensAnalise").append(allMessages);
			    
			    /**
			     * Processa a matriz de total de Entradas e Saidas
			     * ===============================================
			     */
			    this. processaParticipantesEntrada(titLinhas,theMatrix);
			    this.processaParticipantesSaida(titLinhas,theMatrix);
		  }
		  
	};
});