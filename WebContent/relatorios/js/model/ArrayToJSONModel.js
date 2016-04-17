$(function() {
	
	ArrayToJSONModel= function(){
       
	};

	ArrayToJSONModel.prototype = {
	    myMatrix: null, 
	/*	doProcessArray: function(titLinha,titColuna,theMatrix){
			this.myMatrix = theMatrix;
            var resultGeral = {};
			for(var linha=0; linha < titLinha.length; ++linha){
				var nomeLinha = titLinha[linha];
				var theColumnMatrix = theMatrix[linha];
				resultGeral[linha] =  this.doAddRegistro(nomeLinha,titColuna,theColumnMatrix) ;
			}
            console.log("ArrayToJSONModel->String Gerado..."+resultGeral);
			return $.toJSON(resultGeral);
		},*/

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
			var result = '{';
			result += '"Nome" :' + '"'+nomeLinha+'",';
			var totalColuna=0;
			for (var i=0; i< titColuna.length; ++i){
				result+='"'+titColuna[i]+'": ' + theColumnMatrix[i]+',';
				totalColuna += theColumnMatrix[i];
			}
			result += '"Total" :' + totalColuna +"}";
			return JSON.parse(result);
		}	
	  		
			
	}
});	