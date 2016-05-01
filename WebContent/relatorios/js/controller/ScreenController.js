/**
 *  Controla os divs da tela
 *  ========================
 */

$(function() {

	/*
	 * Executa a tela de popup
	 */
	$('.call-popup').on('click', function ( e ) {
		e.preventDefault();
		$(".popup-window").bPopup({ 
			speed: 850,
			transition: 'slideDown', 
			modalColor: '#000000',
			opacity: 0.7
		});
	});

	$('#processamento').click(function(e) {
		sc = new ScreenController();
		sc.hideAll();
		$("#divProcessamento").show();
		$("#divProcessamento").hide();
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

	$('#doSimulaDados').click(function(e) {
		md =  new MockDataModel();
		md.getMockData();
	});

	$('#doClearData').click(function(e) {
		window.screenController.clearScreen();
	});

	$('#doExecuteRelatorio').click(function(e) {
		console.log("==========================================" );
		console.log("Executando ReportProfessorController");
		console.log("===========================================" );

		var arquivo = $( "textarea#cvs" ).val();

		if (typeof(arquivo) === 'undefined' || arquivo ===''){
			alert("Conteúdo da conversa inválido. Preencha corretametne o conteúdo da planilha.");
			return;
		}

		$("#msgProcessamento").hide();

		reportProfessorController.doMainAction();

		$("#mw-panel").show();
		$("#msgProcessamento").show();
		$("#divResultado").show();
	});

	ScreenController = function(){

	};

	ScreenController.prototype = {
			hideAll: function(){
				$("#divResultado").hide();
			},	
			/*
			 * Limpa a tela quando carrega o sistema
			 * =====================================
			 */ 
			clearScreen: function(){
				$('#myForm').trigger("reset");
				$(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
				$("#msgProcessamento").hide();
				$("#divResultado").hide();
				$("#divProcessamento").show();
				$("#msgProcessamento").hide();
				$("#mw-panel").show();
				/*
				 * Tela carregada.
				 */
			},
	}
})