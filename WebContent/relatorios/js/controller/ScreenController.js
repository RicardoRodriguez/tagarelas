/**
 *  Controla os divs da tela
 *  ========================
 */

$(function() {

	 $('#processamento').click(function(e) {
		 	sc = new ScreenController();
	        sc.hideAll();
	        $("#divProcessamento").show();
	 	    $("#msgProcessamento").hide();
	  });

	 $('#resultado').click(function(e) {
		 	sc = new ScreenController();
	        sc.hideAll();
	        $("#divResultado").show();
	  });
	  
	 $('#analise').click(function(e) {
		 	sc = new ScreenController();
	        sc.hideAll();
	        $("#divAnalise").show();
	  });

	 $('#graficos').click(function(e) {
		 	sc = new ScreenController();
	        sc.hideAll();
	        $("#divGrafico").show();
	 });

	 $('#doExecuteRelatorio').click(function(e) {
		   console.log("==========================================" );
		   console.log("Executando ReportProfessorController");
		   console.log("===========================================" );

	       var arquivo = $( "#selectLog :selected" ).val();

	       console.log("Arquivo Selecionado...."+arquivo);
	       
	       if (typeof(arquivo) === 'undefined' || arquivo ===''){
	    	   alert("Informe o arquivo de log desejado.");
	           return;
	       }
		  
		   $("#msgProcessamento").hide();

		   reportProfessorController.doMainAction();

		   $("#msgProcessamento").show();
	 });

	ScreenController = function(){

	};

	ScreenController.prototype = {
			hideAll: function(){
		    	 $("#graficoBolha").hide();
		    	 $("#graficoColuna").hide();
		    	 $("#graficoCandelabro").hide();
		    	 $("#graficoEntradaSaida").hide();
		    	 
		    	 $("#divResultado").hide();
		    	 $("#divAnalise").hide();
		    	 
		    	 $("#divProcessamento").hide();
		    	 $("#divGrafico").hide();
		     },	
	}
})