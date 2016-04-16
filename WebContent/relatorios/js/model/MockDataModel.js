/**
 * 
 */
var MockDataModel = 
	( function ($){
		var professores = ["@Amanda","@Luciene","@Marta","@Rita"];
		var alunos       = ["José", "Maria", "Marta","Madalena","Thiago","Lucas", 
		                    "Mateus","João", "Rita","Barbara","Cecília", "Tatianenumero",
		                    "Modesto","Exagerado","Descansado"];
		var turma        = [];
	    var conversas    = [];
		var numAlunos	 = 0;
		
		/**
		 * Carrega a turma para processar a conversa
		 */
		var doPreparaTurma = function(numAlunos){
		
		}
		
	    /**
	     * Perara a conversa entre alunos e professor
	     * retorna um json com as conversas
	     */
		var doPreparaConversas = function(turma,interacoes){
		
		}
		
		/**
		 * Gera o bate papo. Chamar através desta função
		 * @param numeroAlunos
		 */
		doGerarBatePapo = function(numeroAlunos, interações){
		    var numAlunos = numeroAlunos-0;
		    var numInteracoes  = interacoes - 0
		    numAlunos = (numAlunos > 15)?15:nunAlunos;
		    this.doPreparaTurma(numAlunos);
			return this.doPreparaConversas(interacoes);
		};
		
		/**
		 * Seleciona um professor e inclui em turma
		 */
		var  getProfessorAleatorio=function(){
			
		};
		
		/**
		 * Seleciona os alunos e inclui em turoma
		 */
		var getAlunoAleatorio=function(numAlunos){
			if (numAlunos >= 15){
				for (aluno in this.alunos){
					this.turma.put[aluno];
				}
				return;
			}
			/*
			 * gerar grupo aleatório
			 */
			
		};
		
	});