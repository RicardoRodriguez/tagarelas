/**
 * Realiza os calculos para gerar os totais
 *
 */

$(function() {

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

			/**
			 * Calcua a mediana de um vetor
			 * @param medianArr
			 * @returns {___anonymous_median}
			 */
			medianX: function(medianArr){
				count = medianArr.length;
				median = (count % 2 == 0) ? 
						(medianArr[(medianArr.length/2) - 1] + 
								medianArr[(medianArr.length / 2)]) / 2:
									medianArr[Math.floor(medianArr.length / 2)];
				return median;
			},
			
			median: function(values) {

			    values.sort( function(a,b) {return a - b;} );

			    var half = Math.floor(values.length/2);

			    if(values.length % 2){
			        return values[half];
			    }
			   
			    return (values[half-1] + values[half]) / 2.0;
			},

			/**
			 * Calcula os resultados estatisticos de um vetor
			 * @param values
			 */
			doCalcElementosLinha: function (values){
				console.log("CalculoController >> doCalcElementosLinha");
				var q1Arr   = (values.length % 2 == 0) ? values.slice(0, (values.length / 2)) : values.slice(0, Math.floor(values.length / 2));
				var q2Arr   =  values;
				var q3Arr   = (values.length % 2 == 0) ? values.slice((values.length / 2), values.length) : values.slice(Math.ceil(values.length / 2), values.length);
				var inQ1    = this.medianX(q1Arr);
				//outQ1=median;
				var inMed   = this.medianX(q2Arr);
				//outMed=median;
				var inQ3    = this.medianX(q3Arr);
				//outQ3=median;
				var inIQR   = inQ3 - inQ1;
				var inIQR2  = 1.5 * inIQR;
				this.inLow  = inQ1 - inIQR2;
				this.inHigh = inQ3 + inIQR2;
			},
			/**
			 * Calcula os resultados estatisticos do vetor coluna
			 * @param values
			 */
			doCalcElementosColuna: function (values){
				console.log("CalculoController >> doCalcElementosColuna");
				var q1Arr      = (values.length % 2 == 0) ? values.slice(0, (values.length / 2)) : values.slice(0, Math.floor(values.length / 2));
				var q2Arr      =  values;
				var q3Arr      = (values.length % 2 == 0) ? values.slice((values.length / 2), values.length) : values.slice(Math.ceil(values.length / 2), values.length);
				var outQ1      = this.medianX(q1Arr);
				//outQ1=median;
				var outMed     = this.medianX(q2Arr);
				//outMed=median;
				var outQ3      = this.medianX(q3Arr);
				//outQ3=median;
				var outIQR     = outQ3 - outQ1;
				var outIQR2    = 1.5 * outIQR;
				this.outLow    = outQ1 - outIQR2;
				this.outHigh   = outQ3 + outIQR2;
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
			
			/**
			 * Prepara os valores para a matriz
			 * @param theMatrix
			 */
		   	doInit: function (theMatrix){
				var arrayInDegree = theMatrix[theMatrix.length-1];
				arrayInDegree.sort();
				this.doCalcElementosLinha(arrayInDegree);
				var arrayOutDegree= this.doPrepareArrayOutDegree(theMatrix);
				arrayOutDegree.sort();
				this.doCalcElementosColuna(arrayOutDegree);
				console.log("Termino de Calculo Controller");
			}
	}
});