const {
    checkSeatStatus,
    getRowNumber,
    book
} = require('../homework')
describe('checkSeatStatus Function', ()=> {
    it('checkSeatStatus is a function', ()=> {
        expect(typeof checkSeatStatus).toBe('function')
    })
    it('should throw a TypeError if first parameter is not a string', ()=>{
        expect(()=>checkSeatStatus(6)).toThrow(new TypeError('First parameter is not a string'))
    })
    it('should throw a TypeError if first parameter is not a string', ()=>{
        expect(()=>checkSeatStatus('Hello', 'World')).toThrow(new TypeError('Second parameter is not a number'))
    })
    it('should return true if the given seat defined by row and column is booked', ()=> {
        expect(checkSeatStatus('B', 1)).toBe(true)
    })
    it('should return false if the given seat defined by row and column is not booked', ()=> {
        expect(checkSeatStatus('D', 3)).toBe(false)
    })
})

describe('getRowNumber Function', ()=> {
    it('should return 1 if the letter given is an A', ()=>{
        expect(getRowNumber('A')).toBe(0);
    })
    it('should return 1 if the letter given is an A', ()=>{
        expect(getRowNumber('D')).toBe(3);
    })
})

describe('book Function', ()=>{
    it('should return "Seat in XX successfully booked" if the given seat is not booked', ()=>{
        expect(checkSeatStatus('E', 0)).toBe(false)
        expect(book('E', 0)).toBe('Seat in E0 successfully booked')
        expect(checkSeatStatus('E', 0)).toBe(true) 
        /*Esto ejecutará los expect en orden, asegurandose de que se cambió el valor del asiento
        de false a true luego de realizar la compra (book)*/
    })
    it('should return "Seat in XX is already booked" if the given seat is already booked', ()=>{
        expect(book('D', 0)).toBe('Seat in D0 is already booked')
    })
})

