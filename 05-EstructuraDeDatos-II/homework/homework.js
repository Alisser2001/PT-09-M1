"use strict";

/*
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor (tener en cuenta el caso particular 
    de una lista de un solo nodo y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro 
  puede ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; 
  en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  Ejemplo: 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, 
  busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

function LinkedList() {
  this.head = null
}

function Node(value) {
  this.value = value;
  this.next = null
}
//Retornar todo los valores de la lista:
LinkedList.prototype.getAll = function(data) { //Imprime todos los nodos de la List
  let current = this.head //Apunta al primer elemento de List
  if (!current) { //Si no hay elementos en la lista
    console.log("La lista está vacía")
    return
  } 
  while (current) { //Mientras no sea null, undefined o false, se evaluará en cada nodo
    console.log(current.value) //Devuelve el valor de cada Nodo
    current = current.next //Establece a current en el valor del nodo siguiente
  } //Cuando llegue al valor next del último nodo, el while se evalua en null y se rompe el ciclo
}
//Agregar un elemento al final de la lista:
LinkedList.prototype.add = function (data) {
  let node = new Node(data);
  let current = this.head;
  if(!current) { //Si está vacía, establecemos un nuevo head y retornamos el valor de node
    this.head = node
    return this.head
  }
  while(current.next) { //Si no está vacía, iteramos la lista hasta encontrar el último valor y lo establecemos en current
    current = current.next;
  }
  current.next = node;
  return current.next;
};
//Remover el último elemento ingresado:
LinkedList.prototype.remove = function() {
  let ultValue = null; //Creamos una variable que guardará el value del último nodo
  let current = this.head; //Establecemos el current en el primer valor de la lista
  if(!current) { //Si no hay ningún elemento en la lista, retornamos null
    return null
  } else if (current.next === null) { /*Si sólo existe el primer elemento, establecemos ultValue en su value y eliminamos el primer 
  elemento (this.head) */
    ultValue = current.value
    this.head = null
    return ultValue
  }
  while(current.next.next != null) { /*Si hay más de un elemento, se iterara con un while hasta que el valor siguiente del valor 
  siguiente (último elemento) de nuestro current, sea null, esto nos permite establecer current siempre un elemento antes del último*/
    current = current.next
  }
  ultValue = current.next.value //Establecemos ultValue como el value del último elemento, referenciado por current.next
  current.next = null //Se desenlaza el último elemento de la lista
  return ultValue
};
LinkedList.prototype.search = function(data) {
  let current = this.head;
  while(current) {
    if(typeof data === 'function') {
      if (data(current.value)) {
        return current.value
      }
    }
    if (current.value === data) {
      return current.value
    }
    current = current.next
  }
  return null;
};

/*
Implementar la clase HashTable.

Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, 
  posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor 
  (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests, a modo de ejercicio 
  adicional, pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético, suma el 
  código numérico de cada caracter del input (investigar el método charCodeAt de los strings) y calcula el módulo de ese número 
  total por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash, 
  y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, con hasKey, si ya hay algo en la
tabla con el nombre 'instructora'; luego, invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico 
(determinado al hashear la clave)
*/

function HashTable() {
  this.hashArr = []
  this.numBuckets = 35
}

HashTable.prototype.hash = function(input) {
  let sum=0;
  for(let i=0; i<input.length; i++) {
    let myVar = input.charCodeAt(i)
    sum += myVar
  }
  return (sum % this.numBuckets);
};
HashTable.prototype.set = function(key, value) {
  if(typeof key != 'string') {
    throw new TypeError('Keys must be strings');
  }
  let posi = this.hash(key)
  if(this.hashArr[posi] === undefined) {
    this.hashArr[posi] = {}
  }
  this.hashArr[posi][key] = value;
};
HashTable.prototype.get = function(key) {
  let posi = this.hash(key)
  return this.hashArr[posi][key]
};
HashTable.prototype.hasKey = function(key) {
  let posi = this.hash(key)
  if(this.hashArr[posi][key]) {
    return true;
  }
  return false;
}
// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  Node,
  LinkedList,
  HashTable,
};
