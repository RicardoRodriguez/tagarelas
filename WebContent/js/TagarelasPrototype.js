/**
 * Altera as configurações dos objetos JavaScript
 */

/**
 * Cria o metodo replaceAll dentro de String
 * @param search - o que quer se trocar
 * @param replacement Para o que se deseja trocar
 * @returns string substituido
 * 
 */


/**
 * Altera caracteres de um string
 */
String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};
/**
 * Verifica se um string é igual a outro 
 */
String.prototype.isEqualIgnoreCase =  function(search){
	var target = this;
	return (search.trim().toLowerCase() == target.trim().toLowerCase() )

};
/**
 * Verifica se um string está vazio
 * 
 * @returns {Boolean}
 */
String.prototype.isEmpty = function(){
	var str = this;
	str = str.trim();
	return typeof(str)=== 'undefined' || str === "" || str === null; 
};

/**
 * Verifica se um array possui um elemento.
 */
Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] == obj) {
			return true;
		}
	}
	return false;
};

/**
 *  Limpa o elemento de tela informado no parametro element.
 *  element - elemento que será removido da tela.
 */
window.doClearElement= function(element){
	console.log("executando doClearElement...");
	$(element).empty();
};

