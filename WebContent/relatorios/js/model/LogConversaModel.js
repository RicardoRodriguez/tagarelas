/**
 *  Arquivos de Logs Enviados pela Valleska
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
	
	LogConversaModel = function(){

	};
	
	
	LogConversaModel.prototype = {
		
		turma:     new Array(),
		conversas: new Array(),
		
		
		getTurma: function(){
			return this.turma;
		},	
		
		getConversas: function(){
			return this.conversas;
		},
		
		doGetPrimeiroNome: function(nome){
			nome = nome.trim();
			if (nome.indexOf(' ')>0){
				return nome.split(' ')[0];
			}
			
			return nome;
		},
		
		/**
		 * Converte entrada de input no formato origem \n destino em
		 * objeto Json.
		 * @param csv - entrada de dados no formato cvs
		 * @returns Objeto JSON formatado para o processo.
		 */
		csvToJSON: function (csv){

			  var lines=csv.split("\n");

			  var result = [];

			  var headers=["origem","destino"];

			  for(var i=1;i<lines.length;i++){

			      var obj = {};
			      var currentline=lines[i].split("\t");

			      for(var j=0;j<headers.length;j++){
			          obj[headers[j]] = currentline[j];
			      }

			      result.push(obj);

			  }

			  //return result; //JavaScript object
			  return JSON.stringify(result); //JSON
		},
		
		doInsertNomeTurma: function(nome){
			if (! this.turma.contains(nome)){
				this.turma.push(nome);
			}
		},
		
		doPrepareConversas: function(arquivoLog){
			this.conversas = new Array();
			for (var posicao=0; posicao < arquivoLog.length; ++posicao){
				log = arquivoLog[posicao];
				var nome_origem = this.doGetPrimeiroNome(log.origem);
				var nome_destino = this.doGetPrimeiroNome(log.destino);
				//if(! nome_destino !== 'Todos')
			    this.conversas.push(nome_origem+"|"+nome_destino);	
			}
		},
		
		doPrepareTurma: function(arquivoLog){
			this.turma = new Array();
			var hasTodos = false;
			for (var posicao=0; posicao < arquivoLog.length; ++posicao){
				log = arquivoLog[posicao];
				var nome = this.doGetPrimeiroNome(log.origem);
				this.doInsertNomeTurma(nome);
				var nome = this.doGetPrimeiroNome(log.destino);
				if (nome !== 'Todos'){ 
					this.doInsertNomeTurma(nome);
				} else {
					hasTodos = true;
				}
			}
			if (hasTodos){
				this.turma.push("Todos");
			}
		},	
		
	}
	
});