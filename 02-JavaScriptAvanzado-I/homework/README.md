
# Homework JavaScript Avanzado I

## Scope & Hoisting

Determiná que será impreso en la consola, sin ejecutar el código.

> Investiga cuál es la diferencia entre declarar una variable con `var` y directamente asignarle un valor.
 Declarar una variable sin el uso del var o de cualquier otro identificador de contexto (de esto trata la 
 declaración con var, de crear un contexto de ejecución para la variable), hará que dicha variable sea creada unicamente en el contexto global de ejecución, así esta esté dentro de una función u objeto, su contexto siempre será el global y estritacmente el global ('use strict')
```javascript
x = 1;
var a = 5;
var b = 10;
var c = function(a, b, c) {
  var x = 10;
  console.log(x); // 10
  console.log(a); // 8
  var f = function(a, b, c) {
    b = a; // 8 Se refiere a los parametros a y b
    console.log(b); // 8 Al no crearse una nueva variable, ejecuta directamente
    b = c; // 10 
    var x = 5;
  }
  f(a,b,c); 
  console.log(b); // 10
}
c(8,9,10);
console.log(b); // 10
console.log(x); // 1
``` 
Guarda x como variable global, var a, var b, var c => Ejecuta c(8, 9, 10) => Nuevo contexto de ejecución => 
Guarda var x, var f => Ejecuta console1 y console2 de c(8, 9, 10) => Imprime 10, 8 Ya que 'a' hace referencia al parametro de c y no a la var a => Ejecuta f(a, b, c) = f(8, 9, 10) => 
Guarda var x => Asigna b=a y ejecuta el console1 de f(8, 8, 10) => Imprime 8 => Asigna b=c=10 =>
Ejecuta el console3 de c(8, 9, 10) ya que las asignaciones hechas para b no pertenecen a este contexto de ejecución => Imprime 9 => Ejecuta el console1 y console2 global => Imprime 10, 1  => 

Imprimió en total:  10, 8, 8, 9, 10, 1

```javascript
console.log(bar); // 1
console.log(baz); // 2
foo();
function foo() { console.log('Hola!'); } // Hola!
var bar = 1;
baz = 2;
```
Guarda bar, guarda baz (global), guarda function => ejecuta console1, console2 y foo() => imprime 1, 2, 'Hola!'

```javascript
var instructor = "Tony";
if(true) {
    var instructor = "Franco";
}
console.log(instructor); // Tony
```
Guarda instructor => Ejecuta el if primero => Nueva var instructor => Imprime el instructor nuevo, ya que este existe para contexto global puesto que el if se ejecuta siempre

```javascript
var instructor = "Tony";
console.log(instructor);
(function() {
   if(true) {
      var instructor = "Franco";
      console.log(instructor);
   }
})();
console.log(instructor);
```
Nota: contiene una IIFE (Expresión de función ejecutada inmediatamente)

Guarda instructor, guarda y ejecuta inmediatamente function => Guarda instructor dentro de if => Ejecuta console del if => Imprime "Franco" => Ejecuta el console1 global y console2 global => Imprime "Tony", "Tony", ya que nunca se sobreescribió la var instructor

```javascript
var instructor = "Tony";
let pm = "Franco";
if (true) {
    var instructor = "The Flash";
    let pm = "Reverse Flash";
    console.log(instructor);
    console.log(pm);
}
console.log(instructor);
console.log(pm);
```
Guarda instructor, guarda pm => ejecuta el if => guarda nuevo var instructor, guarda nuevo let pm => Ejecuta console1 del if y console2 del if => Imprime "The Flash", "Reverse Flash" => ejecuta console1 global y console2 global => Imprime "The Flash", "Franco" ... Esto debido a que declarar una variable con let es equivalente a declararla sólo para su uso dentro de la estructura en que se encuentra, en este caso, un condicional if; osease, el if puede crear variables de tipo global si se definen con var y siempre y cuando la condición se cumpla, pero al hacerlo con let, el alcance de dichas variables queda limitado el if

### Coerción de Datos

¿Cuál crees que será el resultado de la ejecución de estas operaciones?:

```javascript
6 / "3" // 2
"2" * "3" // 6
4 + 5 + "px" // '9px'
"$" + 4 + 5 // '$45'
"4" - 2 // 2
"4px" - 2 // NaN
7 / 0 // NaN
{}[0] // Undefined 
parseInt("09") // 9
5 && 2 // 2
2 && 5 // 5
5 || 0 // 5
0 || 5 // 5
[3]+[3]-[10] /* 23 los [] Hacen que Js los trate como Strings, por lo que los dos primeros [3] + [3] arroja '33'
Y como no se pueden restar Strings, hace la conversión para restar y la salida es 33-10 = 23 */
3>2>1 /* Evalua la primer desigualdad 3>2 y retorna true, luego evalua true>1, lo cual es falso */
[] == ![] /* True => Ya que estamos creando dos nuevos arrays y los arrays no son más que objetos tipo lista, lo que hace el operador de comparación == en este caso es comparar los valores de los tipos primitivos, en este caso, objetos; al comparar se están comparando dos objetos que no están en el mismo espacio de memoria, por lo que sería como decir que El tipo del array 1 es equivalente a true y el del array 2 es equivalente a false, por no ser el mismo Objeto; pero el operador ! cambia el valor booleano de array 2, lo que se evalua como 
true == !false => true

```

> Si te quedó alguna duda repasá con [este artículo](http://javascript.info/tutorial/object-conversion).


### Hoisting

¿Cuál es el output o salida en consola luego de ejecutar este código? Explicar por qué:

```javascript
function test() {
   console.log(a);
   console.log(foo());

   var a = 1;
   function foo() {
      return 2;
   }
}

test();
```
Guarda la función => Ejecuta la función test() => Nuevo contexto de ejecución => Guarda var a, guarda function 
=> Ejecuta console1 => Imprime 1 => Ejecuta console2 => Ejecuta foo() => Imprime 2;


Y el de este código? :

```javascript
var snack = 'Meow Mix';

function getFood(food) {
    if (food) {
        var snack = 'Friskies';
        return snack;
    }
    return snack;
}

getFood(false);
```
Guarda var snack, getFood(food) => Ejecuta getFood(false) => No ejecuta el if(food) == if(false) => Ejecuta el return, pero dentro del contexto de ejecución no existe una var snack => Imprime undefined

### This

¿Cuál es el output o salida en consola luego de ejecutar esté código? Explicar por qué:

```javascript
var fullname = 'Juan Perez';
var obj = {
   fullname: 'Natalia Nerea',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname());

var test = obj.prop.getFullname;

console.log(test());
```
Guarda var fullname, var obj, var test => ejecuta el console1 global => Ejecuta getFullname => 
Imprime this.fullname == 'Aurelio De Rosa' => Ejecuta el console2 global => Ejecuta test() == getFullname() => 
Imprime undefined, ya que al asignar la función getFullname a la variable test, el this de la función queda haciendo llamado a un this.fullname en el contexto global, en el cual no existe dicha variable

### Event loop

Considerando el siguiente código, ¿Cuál sería el orden en el que se muestra por consola? ¿Por qué?

```javascript
function printing() {
   console.log(1);
   setTimeout(function() { console.log(2); }, 1000);
   setTimeout(function() { console.log(3); }, 0);
   console.log(4);
}

printing();
```
Guarda la función printing() => Ejecuta la función => Imrpime el console1 == 1 => Deja la función1 esperando 1 segundo => Deja la función2 esperando aunque su temporizador esté en 0 => Imrpime el console2 == 4 => Ejecuta la function2 => Imprime 3 => Ejecuta la function1 => Imprime 2 => Orden: 1, 4, 3, 2