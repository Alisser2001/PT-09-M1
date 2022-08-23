"use strict";

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

function BinarySearchTree(value) {
  this.value = value
  this.left = null
  this.right = null
}

BinarySearchTree.prototype.size = function() {
  let cont = 1 //Iniciamos el contador en cero haciendo referencia al valor head del arbol
  if(this.left) { //Si exite un valor a la izquierda, aumentamos el contador en 1
    cont += 1
    this.left.size() /*Con ayuda de la recursión, la función se ejecutará hacia ambos lados siempre
    y cuando existen valores*/
  } 
  if (this.right) { //Si existe un valor a la derecha, aumentamos el contador en 1
    cont += 1
    this.right.size()
  }
  return cont;
}

BinarySearchTree.prototype.insert = function(value) {
  if (value<this.value && this.left===null) { /*Si el valor ingresado es menor que el head va a la izquiera
  Y si el nodo izquierdo no tiene ningún valor asignado, se crea uno y se le asigna el valor ingresado*/
    this.left = new BinarySearchTree(value)
  } else if (value>=this.value && this.right===null) {/*Si el valor ingresado es mayor que el head va a la derecha
  Y si el nodo derecho no tiene ningún valor asignado, se crea uno y se le asigna el valor ingresado*/
    this.right = new BinarySearchTree(value)
  } else if(value<this.value && this.left!==null) {/*Si es menor que el head y el nodo izquiero está ocupado
  Se usa recursión para ejecutar la funcón hasta que se encuentre un espacio donde alguno de los primeros
  condicionales if pueda crear un nodo*/
    this.left.insert(value)
  } else if (value>=this.value && this.right!==null) {/*Si es mayor que el head y el nodo derecho está ocupado
  Se usa recursión para ejecutar la función hasta que se encuentre un espacio donde alguno de los primeros
  condicionales if pueda crear un nodo*/
    this.right.insert(value)
  }
}
BinarySearchTree.prototype.contains = function(value) {
  if(this.value === value) { //Si el valor es igual al value del nodo actual, se retorna true
    return true 
  } else if(value<=this.value && this.left !== null) { /*Si no es igual y es menor que el nodo head,
  se usa recursión para ejecutar la función hasta que el primer if retorne true*/ 
    return this.left.contains(value)
  } else if(value>this.value && this.right !== null) { /*Si no es igual y es mayor que el nodo head,
  se usa recursión para ejecutar la función hasta que el primer if retorne true*/ 
    return this.right.contains(value)
  } else {
    return false //Si ninguno retorna true al no haber más nodos por recorrer, se retorna false
  }
}
BinarySearchTree.prototype.depthFirstForEach = function(fcb, order) {
  /*El código va creando contextos de ejecución para cada nodo, de forma que cuando termina con el contexto de 
  cada nodo, vuelve por si solo a ejecutar los nodos principales o root*/ 
  if (order === 'pre-order') { 
    fcb(this.value) //Evalua el primer valor
    if(this.left !== null) { //Se ejecuta primero hacia la izquierda, devolviendo cada valor
      this.left.depthFirstForEach(fcb, order)
    }
    if(this.right !== null) { /*Cuando no hay nodos a la izquierda, sigue con el de la derecha 
    Y si tiene nodos a las izquierda, sigue por ese camino*/
      this.right.depthFirstForEach(fcb, order)
    }
  } else if (order === 'post-order') { /*Se va hasta el último de la izquierda y retorna los valores 
  de los últimos nodos primero, luego el de su padre*/
    if (this.left !== null) {
      this.left.depthFirstForEach(fcb, order)
    }
    if (this.right !== null) {
      this.right.depthFirstForEach(fcb, order)
    }
    fcb(this.value)
  } else { //in-order Opción por defecto
    if (this.left !== null) {
      this.left.depthFirstForEach(fcb, order)
    }
    fcb(this.value)
    if (this.right !== null) {
      this.right.depthFirstForEach(fcb, order)
    }
  }
}
BinarySearchTree.prototype.breadthFirstForEach = function(fcb, myArr = []) {
  //Se crea un array como parametro para enviar los nodos
  //Lo que hace el código es evaluar en la fcb el primer valor y enviar los nodos left y right al array
  //Luego usa recursión para evaluar los nodos del array uno por uno, añadiendo los nodos left y right 
  //De cada uno y pasando a la fcb el nodo evaluado
  if(this.left !== null) {
    myArr.push(this.left)
  }
  if(this.right !== null) {
    myArr.push(this.right)
  }
  fcb(this.value)
  if (myArr.length > 0) {
    myArr.shift().breadthFirstForEach(fcb, myArr)
  }
}
// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  BinarySearchTree,
};
