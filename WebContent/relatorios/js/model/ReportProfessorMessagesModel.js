$(function() {
	
	ReportProfessorMessagesModel = function(){

	};
	
	ReportProfessorMessagesModel.prototype = {
		 	
			totalMensagens: function() { return "Nesta sessão de bate-papo participaram {$1} pessoas e trocaram {$2} mensagens," +
					                            " resultando em uma <i>mediana</i> de {$3} mensagens por participante.";},
		 	
		 	menorParticipante: function() { return "O(s) aluno(s) {$1} obtiveram baixa participação na aula";},
		 		
		 	semParticipacaoEnviadas:  function() { return "O(s) participante(s) {$1} não enviou(aram) nenhuma mensagem !!!!";},
		 
		 	semParticipacaoRecebidas:  function() { return "O(s) participante(s) {$1} não recebeu(aram) nenhuma mensagem !!!!";},
		 	
		 	todosParticiparam: function() { return "Observamos que nenhum participante deixou de enviar mensagem na sessão." +
		 			           " Todos participaram !!!";},
		 			          
		    atencaoParticipante: function() { return "Alguém (Alguns) precisa(m) de sua atenção! " +
		    		             "O(s) participante(s) {$1} apresenta(m) " +
		 			             "um envio de mensagens muito inferior ao " +
		 			             "da turma, esse valor está discrepante";},
		 	
		 	abaixoDaMedia: function() { return "{$1} foram os que menos falaram (1o.Quartil: {$2}) {$3}" ;},
		 	
		 	abaixoDaMediaComplementar: function() { 
		 		       return ". <b>Atenção:</b> {$1} não enviou(aram) nenhuma mensagem. Não participou(aram) da conversa !!!" ; },
		 			       
		 	acimaDaMedia: function() { return "O grupo que mais enviou mensagens foi {$1} (3o. Quertil: {$2})";},
		 	
		 	/* ponto discrepante acima do valor maximo fora da curva */		      
		 	monopolioDeMensagens: function() { return "Dentre eles, {$1} enviou um número muito maior de  " +
		 						  "mensagens ({$2}) que o restante do grupo, <i>verificamos um monopólio na conversa!</i> ";},
            
		 	semMonopolioDeMensagens: function() { return "Entre os que enviaram mais mensagens {$1}" +
		 											" foi quem enviou mais mensagens ({$2})" ;},
		 											
		 	saidaPrimeiroQuartil: function(){ return "{$1} foram os que menos falaram nesta sessão. (1o. Quartil: {$2})"  
		 								},										
		 	saidaNaoParticipou: function(){
		 		        return "Atenção! Observamos que ninguém se dirigiu à {$1} " +
		 		        		"provavelmente ele(a)(s) não se engajou(aram) na conversa!"; 
		 	},	
		 	saidaComTodosPartiparam: function(){
		 		 return " Observamos que nenhum participante deixou de receber mensagens." +
		 		 		" Excelente! Não houve participantes isolados da turma nesta sessão."
		 	},
		 	saidaTerceiroQuartil: function(){
		 		return "O grupo que mais teve mensagens endereças a si foi: {$1} " +
		 				"(3o. Quartil: {$2}).";
		 	},
		 	saidaMonopolio: function(){
		 		return "Dentre esses, observamos que foi enviado um número discrepante de mensagens para {$1} ({$2} mensagens)," +
		 				" de fato, ele foi o foco de atenção da turma.<br/> " +
		 				"Assim, com base nas análises desse relatório conclui-se  que a conversação foi centrada em {$1}";
		 	},
		 	
		 	saidaSemMonopolio: function(){
		 		return " Entretanto, observamos que ninguém recebeu um número discrepante de mensagens," +
		 			   " o que indica que a atenção da turma não estava focada em uma única pessoa, isto é," +
		 			   " alguém sendo o centro da conversa. Assim, com base nas análises desse relatório" +
		 			   " conclui-se que a conversação não foi centrada no tutor-moderador.";
		 	},
		 	/* Valor maximo que nAo ocorre discrepancia */
		 	peMensagens: function() { return "Apesar de {$1} ter sido o que mais falou na sessão, " +
		 			                   "esta quantidade de mensagens ({$2}) não chega a ser " +
		 			                   "discrepante da produção de mensagens dos demais " +
		 			                   "participantes da Sessão. Assim concluimos que {$1} " +
		 			                   "não monopolizou a conversação";},
		 			                   
		 	participacaoNaoOuvido: function() { return "Apesar de {$1} ser o que mais enviou mensagens, " +
		 			               "ele é o que menos obteve mensagens endereçadas a ele, " +
		 			               "Isso indica que apesar de falar bastante, " +
		 			               "{1} não obteve o foco de atenção da turma";},
		 	
		    participantesPoucoOuvidos: function() { return "Apesar de{$1} estar entre os que mais enviaram " +
		     		                    "mensagens, eles se encontram entre os três que menos " +
		     		                    "tiveram mensagens endereçadas a eles. Isso indica que " +
		     		                    "apesar de falar bastante, {$1} não obtiveram o foco de atenção da turma";},
		     		                    
		    naoParticipou: function() { return "Atencão, observamos que ninguém se dirigiu a {$1}. " +
		    		       "Parece que ele não se engajou na conversa.";},
		    		       
		    todosParticiaram: function() { return "Observamos que nenhum participante deixou de obtr mensagens" +
		    		          " endereçadas a ele. Excelente! Não houve participantes isolados " +
		    		          "da turma nesta sessão";},
		    		          
		    tutorDescrepante: function() { return "Observamos que foi enviado um número discrepante de mensagens " +
		    		          "para o {$1}. De fato, ele foi o foco de atenção da turma. " +
		    		          "Assim, as análises desse relatório concluem que essa conversação " +
		    		          "foi focado em {$1}";},
		    		          
		    agradecimento:  function() { return "Agradecemos!";} ,
		    
		    language: {
    		    "sEmptyTable": "Nenhuma conversa encontrada",
    		    "sInfo": "_TOTAL_ pessoas participaram desta sessão",
    		    "sInfoEmpty": "Ninguém participou desta sessãp",
    		    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
    		    "sInfoPostFix": "",
    		    "sInfoThousands": ".",
    		    "sLengthMenu": "_MENU_ resultados por página",
    		    "sLoadingRecords": "Carregando...",
    		    "sProcessing": "Processando...",
    		    "sZeroRecords": "Nenhum registro encontrado",
    		    "sSearch": "Pesquisar",
    		    "oPaginate": {
    		        "sNext": "Próximo",
    		        "sPrevious": "Anterior",
    		        "sFirst": "Primeiro",
    		        "sLast": "Último"
    		    }, 
    		    "oAria": {
    		        "sSortAscending": ": Ordenar colunas de forma ascendente",
    		        "sSortDescending": ": Ordenar colunas de forma descendente"
    		    },

     }

	};
	
	/** 
	 * Linguagem utilizada nas tabelas
	 */
	tableLanguage = {
	    "sEmptyTable": "Nenhuma conversa encontrada",
	    "sInfo": "_TOTAL_ pessoas participaram desta sessão",
	    "sInfoEmpty": "Ninguém participou desta sessãp",
	    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
	    "sInfoPostFix": "",
	    "sInfoThousands": ".",
	    "sLengthMenu": "_MENU_ resultados por página",
	    "sLoadingRecords": "Carregando...",
	    "sProcessing": "Processando...",
	    "sZeroRecords": "Nenhum registro encontrado",
	    "sSearch": "Pesquisar",
	    "oPaginate": {
	        "sNext": "Próximo",
	        "sPrevious": "Anterior",
	        "sFirst": "Primeiro",
	        "sLast": "Último"
	    }, 
	    "oAria": {
	        "sSortAscending": ": Ordenar colunas de forma ascendente",
	        "sSortDescending": ": Ordenar colunas de forma descendente"
	    },
	};

});
