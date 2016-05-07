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

	$('#doLoadLog1').click(function(e) {
		md =  new MockDataModel();
		md.getMockData(1);
	});


	$('#doLoadLog2').click(function(e) {
		md =  new MockDataModel();
		md.getMockData(2);

	});


	$('#doLoadLog3').click(function(e) {
		md =  new MockDataModel();
		md.getMockData(3);
	});


	$('#doLoadLog4').click(function(e) {
		md =  new MockDataModel();
		md.getMockData(4);
	});


	$('#doLoadLog5').click(function(e) {
		md =  new MockDataModel();
		md.getMockData(5);
	});
	
	
	$('#doClearData').click(function(e) {
		window.screenController.clearScreen();
	});
	
	$('#doExecuteRelatorio').click(function(e) {
		window.doExecuteRelatorio();
	});
	
	window.doExecuteRelatorio = function() {
		console.log("==========================================" );
		console.log("Executando ReportProfessorController");
		console.log("===========================================" );

		var arquivo = $( "textarea#cvs" ).val();

		if (typeof(arquivo) === 'undefined' || arquivo ==='' || arquivo.indexOf('\t') < 0){
			alert("Conteúdo da conversa inválido. Preencha corretametne o conteúdo da planilha.");
			return;
		}

		$("#msgProcessamento").hide();

		reportProfessorController.doMainAction();

		$("#msgProcessamento").show();
		$("#divResultado").show();
	};

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