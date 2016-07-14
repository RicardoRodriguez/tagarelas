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

/**
 * Map - Objeto de mapeamento do objetos para os relatorios
 * ---------------------------------------------------------
 */

//linking the key-value-pairs is optional
//if no argument is provided, linkItems === undefined, i.e. !== false
//--> linking will be enabled
function Map(linkItems) {
 this.current = undefined;
 this.size = 0;

 if(linkItems === false)
     this.disableLinking();
}

Map.noop = function() {
 return this;
};

Map.illegal = function() {
 throw new Error("illegal operation for maps without linking");
};

//map initialisation from existing object
//doesn't add inherited properties if not explicitly instructed to:
//omitting foreignKeys means foreignKeys === undefined, i.e. == false
//--> inherited properties won't be added
Map.from = function(obj, foreignKeys) {
 var map = new Map;

 for(var prop in obj) {
     if(foreignKeys || obj.hasOwnProperty(prop))
         map.put(prop, obj[prop]);
 }

 return map;
};

Map.prototype.disableLinking = function() {
 this.link = Map.noop;
 this.unlink = Map.noop;
 this.disableLinking = Map.noop;
 this.next = Map.illegal;
 this.key = Map.illegal;
 this.value = Map.illegal;
 this.removeAll = Map.illegal;

 return this;
};

//overwrite in Map instance if necessary
Map.prototype.hash = function(value) {
 return (typeof value) + ' ' + (value instanceof Object ?
     (value.__hash || (value.__hash = ++arguments.callee.current)) :
     value.toString());
};

Map.prototype.hash.current = 0;

//--- mapping functions

Map.prototype.get = function(key) {
 var item = this[this.hash(key)];
 return item === undefined ? undefined : item.value;
};

Map.prototype.put = function(key, value) {
 var hash = this.hash(key);

 if(this[hash] === undefined) {
     var item = { key : key, value : value };
     this[hash] = item;

     this.link(item);
     ++this.size;
 }
 else this[hash].value = value;

 return this;
};

Map.prototype.remove = function(key) {
 var hash = this.hash(key);
 var item = this[hash];

 if(item !== undefined) {
     --this.size;
     this.unlink(item);

     delete this[hash];
 }

 return this;
};

//only works if linked
Map.prototype.removeAll = function() {
 while(this.size)
     this.remove(this.key());

 return this;
};

//--- linked list helper functions

Map.prototype.link = function(item) {
 if(this.size == 0) {
     item.prev = item;
     item.next = item;
     this.current = item;
 }
 else {
     item.prev = this.current.prev;
     item.prev.next = item;
     item.next = this.current;
     this.current.prev = item;
 }
};

Map.prototype.unlink = function(item) {
 if(this.size == 0)
     this.current = undefined;
 else {
     item.prev.next = item.next;
     item.next.prev = item.prev;
     if(item === this.current)
         this.current = item.next;
 }
};

//--- iterator functions - only work if map is linked

Map.prototype.next = function() {
 this.current = this.current.next;
};

Map.prototype.key = function() {
 return this.current.key;
};

Map.prototype.value = function() {
 return this.current.value;
};
