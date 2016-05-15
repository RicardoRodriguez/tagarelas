/**
 * 
 */

$(function() {

	Array.prototype.contains = function(obj) {
		var i = this.length;
		while (i--) {
			if (this[i] == obj) {
				return true;
			}
		}
		return false;
	};

	MockDataModel = function(){

	};

	MockDataModel.prototype = {
			professores: ["@Amanda","@Luciene","@Marta","@Raul"],
			alunos:      ["José", "Maria", "Marta","Madalena","Thiago","Lucas", 
			              "Mateus","João", "Rita","Barbara","Cecília", "Tatianenumero",
			              "Modesto","Exagerado","Descansado"],
			              turma:       new Array(),
			              conversas:    new Array(),
			              numAlunos:	  0,

			              /**
			               * Perara a conversa entre alunos e professor
			               * retorna um json com as conversas
			               */
			              doPreparaConversas: function(numeroAlunos,interacoes){
			            	  while (this.conversas.length < interacoes){
			            		  var nome1 = this.getElementoConversa(numeroAlunos);
			            		  var nome2 = nome1
			            		  while (nome1 === nome2){
			            			  nome2 = this.getElementoConversa(numeroAlunos);
			            		  }
			            		  this.conversas.push(nome1+"|"+nome2);
			            	  }	
			              },

			              getElementoConversa: function(numeroAlunos){
			            	  var elemento = -1;
			            	  var max = this.turma.length-1;
			            	  while (elemento < 0 || elemento > max){
			            		  elemento = this.getRandom(numeroAlunos);
			            		  console.log("MockDataModel>>Elemento...."+elemento);
			            	  }
			            	  return this.turma[elemento];
			              },

			              /**
			               * Gera o bate papo. Chamar através desta função
			               * @param numeroAlunos
			               */
			              doGerarBatePapo: function(numeroAlunos, interações){
			            	  var numAlunos = numeroAlunos-0;
			            	  var numInteracoes  = interacoes - 0;
			            	  var numAlunos = (numAlunos > 15) ? 15:numAlunos;
			            	  this.doPreparaTurma(numAlunos);
			            	  this.doPreparaConversas(numeroAlunos,interacoes);
			            	  return this.conversas;
			              },


			              /**
			               * Carrega a turma para processar a conversa
			               */
			              doPreparaTurma: function(numeroAlunos){
			            	  this.turma.push(this.getProfessorAleatorio());
			            	  this.getAlunosAleatorios(numeroAlunos);
			              },

			              /**
			               * Seleciona um professor e inclui em turma
			               */
			              getProfessorAleatorio: function(){
			            	  var max = this.professores.length-1;
			            	  var professor = -1;
			            	  while (professor < 0 || professor > max){
			            		  professor = this.getRandom(max);
			            	  }
			            	  return (this.professores[professor]);
			              },

			              /**
			               * Seleciona os alunos e inclui em turoma
			               */
			              getAlunosAleatorios: function(numAlunos){
			            	  if (numAlunos >= 15){
			            		  for (var posicao =0; posicao < this.alunos.length; ++ posicao){
			            			  this.turma.put[this.alunos[posicao]];
			            		  }
			            		  return;
			            	  }
			            	  /*
			            	   * gerar grupo aleatório
			            	   */
			            	  while (this.turma.length+1 < numAlunos){
			            		  aluno = this.getPosicaoAlunoAleatorio(numAlunos);
			            		  if (! (this.turma.contains(aluno))){
			            			  this.turma.push(aluno);
			            		  }
			            	  }
			              },

			              /**
			               * Carrega um aluno aleatorio
			               * @param numAlunos
			               * @returns
			               */
			              getPosicaoAlunoAleatorio: function(numAlunos){
			            	  var aluno = -1;
			            	  while (aluno < 0 || aluno > numAlunos){
			            		  aluno = this.getRandom(numAlunos);
			            	  }
			            	  return this.alunos[aluno];
			              },

			              getTurma: function(){
			            	  return this.turma;
			              },


			              getRandom: function(max) {
			            	  return Math.floor(Math.random() * max );//+ 1)
			              },


			              getMockData: function(myChoice){
			            	  /*
			            	   * Determina que arquivo de log será utilizado.
			            	   * --------------------------------------------
			            	   */
			            	  
			            	  if ((typeof myChoice === 'undefined') || myChoice === null){
			            		  myChoice="1";
			            	  }
			            	  
			            	  var xhttp = new XMLHttpRequest();
			            	  xhttp.onreadystatechange = function() {
			            	    if (xhttp.readyState == 4 && xhttp.status == 200) {
			            	      $("textarea#cvs").val(xhttp.responseText);
			            	      window.doExecuteRelatorio();
			            	      location.hash = "#resultado";  
			            	    }
			            	  };
			            	  xhttp.open("GET", "mockdataLog"+ myChoice +".txt", true);
			            	  xhttp.send();
			              },
	}});




