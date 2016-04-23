$(function() {
	
	ReportProfessorMessagesModel = function(){

	};
	
	ReportProfessorMessagesModel.prototype = {
		 	
			totalMensagens: function() { return "Os participantes da sessão de bate-papo trocaram um total de {$1} mensagens";},

		 	enviadasParticipante: function() { return "{$1} enviou {$2} mensagens";},
		 	
		 	recebidasParticipante: function() { return "{$1} recebeu {$2} mensagens";},
		 	
		 	media: function() { return "A média de mensagens foi de {$1} mensagens";},
		 	
		 	menorParticipante: function() { return "O(s) aluno(s) {$1} obtiveram baixa participação na aula";},
		 		
		 	semParticipacao:  function() { return "O(s) participante(s) {$1} não enviou(aram) nenhuma mensagem !!!!";},
		 	
		 	todosParticiparam: function() { return "Observamos que nenhum participante deixo de enviar mensagem na sessão." +
		 			           " Todos participaram !!!";},
		 			          
		    atencaoParticipante: function() { return "Alguém (Alguns) precisa(m) de sua atenção! " +
		    		             "O(s) participante(s) {$1} apresenta(m) " +
		 			             "um envio de mensagens muito inferior ao " +
		 			             "da turma, esse valor está discrepante";},
		 			      
		 	abaixoDaMedia: function() { return "Apesar de {$1} ter(em) sido o(s) que menos falou (aram) na sessão, " +
		 			       "ele(s) não é (são) um ponto isolado no grupo, pois sua(s) produção " +
		 			       "de mensagem não é discrepante dos demais";},
		 			       
		 	acimaDaMedia: function() { return "O(s) participante(s) {$1} foram os que mais falaram nessa sessão." +
		 			      " Encontram-se acima da média ({$2})";},
		 			      
		 	monopolioDeMensagens: function() { return "Verificamos um monopólio na conversa! " +
		 						  "O {$1} dominou a conversa enviando muito mais " +
		 						  "mensagens que o restante da turma.";},

		 	quaseMonopoliodeMensagens: function() { return "Apesar de {$1} ter sido o que mais falou na sessão, " +
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

	}
});
