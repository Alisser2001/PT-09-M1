// Crear un método `repeatify` que este disponible para _todos_ los objetos `Strings`. 
//Esta función debe aceptar un `entero` que indica cuantas veces el string tiene que repetirse. 
//La función retorna el string repetido el número de veces que indicamos. 
//Controlar que el número no sea menor que cero, y si es cero que devuelva `''` (String vacío).

String.prototype.repeatify = function (n) {
    if (n<=0) {
        return " "
    } else {
        let str = ''
        for (let i=1; i<=n; i++) {
            str += this
        }
        return str
    }
}
let str = 'Hola'
console.log(str.repeatify(5))

//Crea un objeto llamado `shape` que tenga una propiedad `type` y un método `getType`.
//Ahora defini una función `Triangle` cuyo prototipo sea `shape`. 
//Los objetos creados con `Triangle` deberían tener tres propiedades: `a`, `b` y `c`. 
//Que representan cada lado del triángulo. `type` debe ser `Triangle`.
//Agregá un nuevo método al prototipo llamado `getPerimeter`.

let Triangle = function(a, b, c) {
    this.a = a,
    this.b = b,
    this.c = c
}
let Shape = {
}
Shape.prototype = {
    type: null,
    getType: function() {
        if (this instanceof Triangle) {
            this.type = 'Triangle'
            return this.type
        } else if (this instanceof Circle) {
            this.type = 'Circle'
            return this.type
        } else if(this instanceof Square) {
            this.type = 'Square'
            return this.type
        }
    },
    getPerimeter: function() {
        if (this instanceof Triangle) {
            return this.a + this.b + this.c
        } else if (this instanceof Circle) {
            return this.a * Math.PI * 2
        } else if(this instanceof Square) {
            return this.a*2 + this.b*2
        }
    },
    getArea: function() {
        if (this instanceof Triangle) {
            return (this.a + this.b)/2 
        } else if (this instanceof Circle) {
            return Math.PI * Math.pow(this.a, 2)
        } else if(this instanceof Square) {
            return this.a * this.b
        }
    }
}
Triangle.prototype = Object.create(Shape.prototype)

var t = new Triangle(1, 2, 3);
console.log(t instanceof Triangle)
console.log(Shape.prototype.isPrototypeOf(t));
console.log(t.getPerimeter());
console.log(t.getType());


//Ahora creá un nuevo constructor que herede de `shape`, llamado `Circle`. 
//Implementalo de tal modo que puedas calcular su perímetro en la función `getPerimeter`.

let Circle = function(a) {
    this.a = a
}
Circle.prototype = Object.create(Shape.prototype)

var c = new Circle(2);
console.log(c instanceof Circle)
console.log(Shape.prototype.isPrototypeOf(c));
console.log(c.getPerimeter());
console.log(c.getType());

//Creá una última `shape` llamada `Square`.
//Agregá el método `getArea` de todas las `shape`s.

let Square = function(a, b) {
    this.a = a,
    this.b = b
}
Square.prototype = Object.create(Shape.prototype)

var s = new Square(3, 5);
console.log(s instanceof Square)
console.log(Shape.prototype.isPrototypeOf(s));
console.log(s.getPerimeter());
console.log(s.getType());
console.log(s.getArea())
console.log(c.getArea())
console.log(t.getArea())