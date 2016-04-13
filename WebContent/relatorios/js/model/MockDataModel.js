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
	     */
		var doPreparaConversas = function(numneroAlunos){
		
		}
		
		/**
		 * Gera o bate papo. Chamar através desta função
		 * @param numeroAlunos
		 */
		doGerarBatePapo = function(numeroAlunos){
		    var numAlunos = numeroAlunos-0;
		    numAlunos = (numAlunos > 15)?15:nunAlunos;
		    this.doPreparaTurma(numAlunos)
			
		};
		
		/**
		 * Seleciona um professor
		 */
		var  getProfessorAleatorio=function(){
			
		};
		
		/**
		 * Seleciona os alunos
		 */
		var getAlunoAleatorio=function(){
			if (numAlunos == 15){
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