$(function() {

	ReportProfessorMessagesModel = function(){

	};

	ReportProfessorMessagesModel.prototype = {


			agradecimento:  function() { return "Agradecemos!";} ,
			
			producao: {
				
			    totalParticipantes: function(){
					return "Nesta sessão de bate-papo participaram {$1} pessoas " +
					"e trocaram {$2} mensagens";
				},

				menosFalaram: function(){
					return "{$1} foram os que menos falaram.";
				},

				naoFalaram: function(){
					return "Atenção: {$1}, não enviou(aram) nenhuma mensagem. " +
						   "Não participou(aram) da conversa !!!";
				},

				maisFalaram: function(){
					return "O grupo que mais enviou mensagens foi {$1}.";
				},

				discrepantes: function(){
					return "Dentre eles, {$1} enviou(aram) um número muito maior de mensagens " +
					"(acima do máximo calculado {$2} que o restante do grupo, verificamos " +
					"um monopólio da conversa@";
				}, 

				naoDiscrepantes: function(){
					return "Atenção: Embora {$1} tenha enviado mais mensagens que os demais, " +
					"esse valor não chega a ser discrepante do grupo!"
				}, 
			},

			enderecamento: {

				menosReceberam: function(){
					return "{$1} foram os que menos receberam mensagens nesta sessão.";
				},

				naoReceberam: function(){
					return "Atenção! Observamos que ninguém se dirigiu à {$1}, " +
					"provavelmente ele(a)(as) nãi se engajou(aram) na conversa!.";
				}, 

				maisReceberam: function(){
					return "O grupo que mais recebeu mensagens endereçadas a si foi: {$1}. ";
				},	

				discrepantes: function(){
					return "Observamos que foi enviado um número discrepante de mensagens para {$1} " +
					"de fato ele(a)(es)(as) foi(rqm) o foco de atenção da turma.<BR/> " +
					"Assim com base nas análises desse relatório " +
					"concluiu-se que a conversação foi centrada em {$1}."; 
				},	
	
				naoDiscrepantes: function(){
					return "Atenção: Embora tenham sido endereçadas mais mensagens para {$1} esse valor não chega a ser discrepante no grupo!"
				}, 
			},	
			
			 
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
