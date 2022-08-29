'use strict'

const Merge = require("@11ty/eleventy/src/Util/Merge")

// No cambies los nombres de las funciones.

function quickSort(array) {
  // Implementar el método conocido como quickSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  /*Primero, creamos una forma de hallar un valor 
  aleatorio entre 0 y el número de elementos del array */
  if(array.length <= 1) return array
  let myRandom = Math.round(Math.random()*array.length) //Me da valores enteros entre [0, longitudDelArray)
  let pivot = array[myRandom]
  let arrMin = []
  let arrMax = []
  let arrEqu = []
  for (let i=0; i<array.length; i++) {
    if(array[i] < pivot) {
      let valMin = array[i]
      arrMin.push(valMin)
    }
    else if (array[i] > pivot) {
      let valMax = array[i]
      arrMax.push(valMax)
    }
    else {
      let valEqu = array[i]
      arrEqu.push(valEqu)
    }
  }
  return quickSort(arrMin).concat(arrEqu).concat(quickSort(arrMax))
  //return array.sort((a, b) => a-b)
}
console.log(quickSort([5, 1, 4, 2, 8]))




/*El método mergeSort, divide un array en dos, y estos sub arrays en dos, y así sucesivamente hasta tener
sub arrays de 1 elemento, luego, se devuelve en el mismo orden, concatenando los subarrays pero esta vez
con sus elementos en orden*/

/*La función split_function, toma un array como argumento, establece middle como la mitad de la longitud 
del arreglo, luego con el método slice se crean dos arrays de igual longitud y los retorna en un array*/

function split_function(array) {
  let middle = Math.floor(array.length/2)
  let left = array.slice(0, middle)
  let right = array.slice(middle)
  return [left, right]
}

/* La funcion merge, toma dos arrays como argumento (que son de longitud>1 y llegan ordenados cada uno)
los recorre y va comparando sus valores con ayuda de las dos variables Index, cuando alguno es menor,
lo envia al array auxiliar y aumenta en 1 el valor del Index del array correspondiente y sigue 
comparando, llegará un punto en que alguno de los dos arrays no cumpla la condición del while, en este caso
se concatenan los valores que no se comparararon, pues se puede dar por sentado que son valores ordenados*/

function merge(left, right) { //Se encarga de comparar los valores
  let leftIndex = 0
  let rightIndex = 0
  let myArr = []
  while (leftIndex < left.length && rightIndex < right.length) {
    if(left[leftIndex] < right[rightIndex]) {
      myArr.push(left[leftIndex]);
      leftIndex++;
    } else {
      myArr.push(right[rightIndex])
      rightIndex++;
    }
  }
  return myArr.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

/* Si el array es de longitud 1, devuelve su valor; si no, se hace llamado a la función split_function 
para dividirlo y luego se pasan estos dos nuevos arrays a la función merge como funciones recursivas*/
function mergeSort(array) {
  // Implementar el método conocido como mergeSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  if(array.length === 1) return array
  let div = split_function(array)
  return merge(mergeSort(div[0]), mergeSort(div[1]))
}
console.log(mergeSort([5, 1, 4, 2, 8]))


// No modificar nada debajo de esta línea
// --------------------------------
module.exports = {
  quickSort,
  mergeSort,
};
