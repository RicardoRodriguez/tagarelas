/**
 * 
 */


MockDataModel = Class.extend({
	professores: ["@Amanda","@Luciene","@Marta","@Rita"],
	alunos:      ["José", "Maria", "Marta","Madalena","Thiago","Lucas", 
	             "Mateus","João", "Rita","Barbara","Cecília", "Tatianenumero",
	             "Modesto","Exagerado","Descansado"],
	turma:       new Array(),
    conversas:    new Array(),
	numAlunos:	  0,
	
	/**
	 * Carrega a turma para processar a conversa
	 */
	doPreparaTurma: function(numAlunos){
	
	},
	
	/**
	 * Perara a conversa entre alunos e professor
		 * retorna um json com as conversas
	 */
	doPreparaConversas: function(turma,interacoes){

    },
    
    /**
	 * Gera o bate papo. Chamar através desta função
	 * @param numeroAlunos
	 */
	doGerarBatePapo: function(numeroAlunos, interações){
	    var numAlunos = numeroAlunos-0;
	    var numInteracoes  = interacoes - 0
	    numAlunos = (numAlunos > 15)?15:nunAlunos;
	    this.doPreparaTurma(numAlunos);
		return this.doPreparaConversas(interacoes);
	},
	
	/**
	 * Seleciona um professor e inclui em turma
	 */
	getProfessorAleatorio: function(){
		
	},

	/**
	 * Seleciona os alunos e inclui em turoma
	 */
	getAlunoAleatorio: function(numAlunos){
		if (numAlunos >= 15){
			for (aluno in this.alunos){
				this.turma.put[aluno];
			}
			return;
		}
		/*
		 * gerar grupo aleatório
		 */
		
	},
	

	getTurma: function(){
		return this.turma;
	},
	
	
});




