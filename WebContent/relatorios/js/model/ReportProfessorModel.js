/**
 *  Classe que define as varáveis globais do grupo relatóros 
 */
var ReportVariables = 
	( function ($){
		
	 /* get / set variables */	
	    getMatrizAdjacencia=  function(){
	    	return this.matrizAdjacencia;
	    },	
	 	
	    setMatrizAdjacencia= function(value){
	    	this.matrizAdjacencia = value;
	    },
		
	    getVertices = function(){
	    	return this.vertices;
	    }	
	 	
	    setVertices = function(value){
	    	this.vertices = value;
	    }
		
	    getArrayOutDegree = function(){
	    	return this.arrayOutDegree;
	    }	
	 	
	    setArrayOutDegree = function(value){
	    	this.arrayOutDegree = value;
	    }
		
	    getArrayInDegree = function(){
	    	return this.arrayOutDegree;
	    }	
	 	
	    setArrayInDegree = function(value){
	    	this.arrayInDegree = value;
	    }
		
	    getOutMed = function(){
	    	return this.outMed;
	    }	
	 	
	    setOutMed = function(value){
	    	this.outMed = value;
	    }
	    
	    getInMed = function(){
	    	return this.inMed;
	    }	
	 	
	    setInMed = function(value){
	    	this.inMed = value;
	    }
	    
	    getOutQ1 = function(){
	    	return this.outQ1;
	    }	
	 	
	    setOutQ1 = function(value){
	    	this.outQ1 = value;
	    }
	    
	    getInQ1 = function(){
	    	return this.inQ1;
	    }	
	 	
	    setInQ1 = function(value){
	    	this.inQ1 = value;
	    }
	    
	    getOutQ3 = function(){
	    	return this.outQ3;
	    }	
	 	
	    setOutQ3 = function(value){
	    	this.outQ3 = value;
	    }
	    
	    getInQ3 = function(){
	    	return this.inQ1;
	    }	
	 	
	    setInQ3 = function(value){
	    	this.inQ3 = value;
	    }
	    
	    getOutIQR = function(){
	    	return this.outIQR;
	    }	
	 	
	    setOutIQR = function(value){
	    	this.outIQR = value;
	    }
	    
	    getInIQR = function(){
	    	return this.inIQR;
	    }	
	 	
	    setInIQR = function(value){
	    	this.inIQR = value;
	    }
	 
	    getOutIQR2 = function(){
	    	return this.outIQR2;
	    }	
	 	
	    setOutIQR2 = function(value){
	    	this.outIQR2 = value;
	    }
	    
	    getOutLow = function(){
	    	return this.outLow;
	    }	
	 	
	    setOutLow = function(value){
	    	this.outLow = value;
	    }
	   
	    getInLow = function(){
	    	return this.inLow;
	    }	
	 	
	    setInLow = function(value){
	    	this.inLow = value;
	    }
	
	    getOutHigh = function(){
	    	return this.outHaigh;
	    }	
	 	
	    setOutHigh = function(value){
	    	this.outHigh = value;
	    }
	   
	    getInHigh = function(){
	    	return this.inHigh;
	    }	
	 	
	    setInHigh = function(value){
	    	this.inHigh = value;
	    }
	    
	    getValues = function(){
	    	return this.values;
	    }	
	 	
	    setValues = function(value){
	    	this.values = value;
	    }
	    /*	


		

		var values; */	
	    
});