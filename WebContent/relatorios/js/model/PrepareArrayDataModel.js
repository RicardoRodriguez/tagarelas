$(function() {
	
	PrepareArrayDataModel= function(){
       
	};

	PrepareArrayDataModel.prototype = {
	    myMatrix: null, 
	
	    doProcessArray: function(titLinha,titColuna,theMatrix){
			this.myMatrix = theMatrix;
            var resultGeral = new Array(titLinha.length);
			for(var linha=0; linha < titLinha.length; ++linha){
				var nomeLinha = titLinha[linha];
				var theColumnMatrix = theMatrix[linha];
				resultGeral[linha] = this.doAddRegistro(nomeLinha,titColuna,theColumnMatrix) ;
				
			}

            console.log("ArrayToJSONModel->Vetor Gerado..."+resultGeral);
			return resultGeral;
	    },
	
		doAddRegistro: function(nomeLinha,titColuna,theColumnMatrix){
			var result = new Array(titColuna.length+2);
			result[0]  = nomeLinha;
			var totalColuna=0;
			for (var i=0; i< titColuna.length; ++i){
				result[i+1] = theColumnMatrix[i];
				totalColuna += theColumnMatrix[i];
			}
			result[result.length-1] = totalColuna;
			return result;
		},	
	  	
	    doPrepareArrayColumnName: function(titColuna){
	      var result =new Array(titColuna.length+2);
	      result[0] = this.doAddTitle("");
	      for (var i=0; i < titColuna.length;++i){
	    	  result[i+1] = this.doAddTitle(titColuna[i]);
	      }
	      result[result.length-1]= this.doAddTitle("Total");
	      return result;
	    },
		doAddTitle: function(titulo){
			var result = '{';
			result += '"title": ' + '"'+titulo+'"}';
			return JSON.parse(result);
		}	
	  		
	}
});	