/**
 * Realiza os calculos para gerar os totais
 *
 */

$(function() {

	/**
	 * Calculo de quartis. Entre no site :
	 * http://www.hackmath.net/en/calculator/quartile-q1-q3
	 * 
	 * entre com os valores : 6,6,6,6,8,8,10,10,15,16,30,139
	 * 
	 * Resitado:
	 * Statistical file:
     *       {0, 1, 6, 6, 6, 6, 8, 8, 10, 10, 15, 16, 30, 139, 262}
     *       Quartile Q1: 6
     *       Quartile Q2: 8
     *       Quartile Q3: 16
	 * 
	 * @returns
	 */
	CalculoController = function(){

	};

	CalculoController.prototype = {
			/**
			 * Variavies publicas do método
			 */
			inLow	: 0,
			inHigh	: 0,
			outLow  : 0,
		    outHigh : 0,
            medianaX: 0,
            mediana:  0,
            inQ1:     0,
            inQ2:     0,
            inQ3:     0,
            outQ1:    0,
            outQ2:    0,
            outQ3:    0,
            arrayInDegree: null,
            arrayOutDegree: null,
            
			/**
			 * Calcua a mediana de um vetor
			 * @param medianArr
			 * @returns {___anonymous_median}
			 */
			medianX: function(medianArr){
				var count = medianArr.length;
				var medianaX =   (count % 2 === 0) ? 
						         (medianArr[(medianArr.length/2) - 1] + 
							  	  medianArr[(medianArr.length / 2)]) / 2:
								  medianArr[Math.floor(medianArr.length / 2)];
				return medianaX;
			},
			
			
			doCalcElementsFor: function(values){
				console.log("CalculoController >> doCalcElementFor");
				var tamTotalVetor  = values.length;
				var posicaoMediana =  Math.trunc(tamTotalVetor/ 2);
				var q2Arr  = values.slice();
				var q2   = this.medianX(q2Arr);
	            /**
	             * Montar o vetor do primeiro 
	             */
				var q1Arr  = values.slice(0, posicaoMediana);
				var q3Arr  = values.slice(posicaoMediana, tamTotalVetor);
				var q1   = this.medianX(q1Arr);
				var q3   = this.medianX(q3Arr);
				
				console.log("Calculo Controller>>doCalcElementFor>>Quartis--->>>",q1,q2,q3);		
				var iqr   = q3 - q1;
				var z  = 1.5 * iqr;
				var pontoInferior = z-q1;
				var pontoSuperior = q3 + z;
				console.log("Calculo Controller>>doCalcElementFor>>iqr,z,pontoInferior,pontoSuperior--->>>",iqr,z,pontoInferior,pontoSuperior);	
				return [q1,q2,q3,pontoInferior,pontoSuperior];
			},
			
			 /**
			 * Calcula os resultados estatisticos de um vetor
			 * @param values
			 */
			doCalcElementosLinha: function (values){
				console.log("CalculoController >> doCalcElementosLinha");
				var result = this.doCalcElementsFor(values);
				this.inQ1    = result[0];
				this.inQ2    = result[1];
				this.inQ3    = result[2];
				this.inLow   = result[3];
				this.inHigh  = result[4];
				this.doPrepareRascunho(0, values); 
			},
			/**
			 * Calcula os resultados estatisticos do vetor coluna
			 * @param values
			 */
			doCalcElementosColuna: function (values){
				console.log("CalculoController >> doCalcElementosColuna");
				var result = this.doCalcElementsFor(values);
				this.outQ1    = result[0];
				this.outQ2    = result[1];
				this.outQ3    = result[2];
				this.outLow   = result[3];
				this.outHigh  = result[4];
				this.doPrepareRascunho(1, values); 
			},
			
			/**
			 * Monta o vetor de total de colunas
			 */
			doPrepareArrayOutDegree: function(theMatrix){
				console.log("CalculoController >> doPrepareArrayOutDegree");
				var arrayOutDegree = new Array();
				for (var linha=0;linha < theMatrix.length-1; ++linha){
					myArray = theMatrix[linha];
					var totalColuna=0;
					for(var coluna=0; coluna < myArray.length; ++coluna){
						totalColuna += myArray[coluna];
					}
					arrayOutDegree.push(totalColuna);
				}
				return arrayOutDegree;
			}, 
			
			doSortArray: function (myArray){
				myArray.sort(function (a, b) {
					a = a-0;
					b = b-0;
					if (a < b ) {
						return -1;
					}
					if (a > b) {
						return 1;
					}

					return 0;});
				return myArray;
			},
			
			
			doPrepareRascunho: function(t,vetor){
				var linhas = new Array();
				$("#rascunhoCalculos").append("<h4>" + (t==0 ? ".:Entradas:.":".:Saidas:.") +"</h4><ul>");
				linhas.push("Vetor organizado: "+vetor);
				linhas.push("Mediana: "+ (t==0 ? this.inQ2 : this.outQ2));
				linhas.push("Primeiro Quartil: "+ (t==0 ? this.inQ1 : this.outQ1));
				linhas.push("Terceiro Quartil: "+ (t==0 ? this.inQ3 : this.outQ3));
				var iqr  = (t==0)? this.inQ3 - this.inQ1:this.outQ3 - this.outQ1 ;
				linhas.push("iqr (q3-q1): "+ iqr);
				var z  = 1.5 * iqr;
				linhas.push("z (1.5 * iqr): "+ z);
				
				var pontoInferior = z-(t==0?this.inQ1:this.outQ1);
				var pontoSuperior = (t==0?this.inQ3:this.outQ3) + z;
				linhas.push("Ponto Superior: "+ pontoSuperior);
				linhas.push("Ponto Inferior: "+ pontoInferior);
				
				for (var i=0; i< linhas.length; ++i){
					$("#rascunhoCalculos").append("<li>"+ linhas[i] +"</li");
				}
				
				$("#rascunhoCalculos").append("</ul><br>");
			},
			
			
			/**
			 * Prepara os valores para a matriz
			 * @param theMatrix
			 */
		   	doInit: function (theMatrix){
		   		console.log("Inicio do Calculo Controller");
		   		$("#rascunhoCalculos").empty();
                /*
                 * Prepara e calcula o array de entrada.
                 * =====================================
                 */
		   		this.arrayInDegree = this.doSortArray(
						theMatrix[theMatrix.length-1].slice());
				console.log("arrayInDegree Organizado", this.arrayInDegree);
				this.doCalcElementosLinha(this.arrayInDegree);
				/*
                 * Prepara e calcula o array de saida.
                 * =====================================
                 */				
				var arrayOut= this.doPrepareArrayOutDegree(theMatrix);
				this.arrayOutDegree =  this.doSortArray(arrayOut);
				this.doCalcElementosColuna(this.arrayOutDegree);
				console.log("Termino de Calculo Controller");
			}
			
			
	}
});