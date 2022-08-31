function checkSeatStatus(file, num) {
    if(typeof file !== 'string') {
        throw TypeError('First parameter is not a string')
    }
    if(typeof num !== 'number') {
        throw TypeError('Second parameter is not a number')
    }
    const seat = getSeat(file, num)
    return seat.booked; //Devuelve true si está disponible y false si no lo está
}

const layout = [
    [{type: 'VIP', booked: false}, {type: 'VIP', booked: true}, {type: 'VIP', booked: true}, {type: 'VIP', booked: false}],
    [{type: 'NORMAL', booked: false}, {type: 'VIP', booked: true}, {type: 'VIP', booked: false}, {type: 'NORMAL', booked: false}],
    [{type: 'NORMAL', booked: false}, {type: 'NORMAL', booked: true}, {type: 'NORMAL', booked: true}, {type: 'NORMAL', booked: false}],
    [{type: 'ECONOMIC', booked: true}, {type: 'NORMAL', booked: true}, {type: 'NORMAL', booked: true}, {type: 'ECONOMIC', booked: false}],
    [{type: 'ECONOMIC', booked: false}, {type: 'ECONOMIC', booked: true}, {type: 'ECONOMIC', booked: false}, {type: 'ECONOMIC', booked: false}]
];

function getRowNumber(file) {
    return file.charCodeAt(0) - 65;
}

function book(file, num) {
    if(checkSeatStatus(file, num)) {
        return `Seat in ${file}${num} is already booked`
    }
    const seat = getSeat(file, num)
    seat.booked = true
    return `Seat in ${file}${num} successfully booked`
}

function getSeat(file, num) {
    const numRow = getRowNumber(file) //Devuelve el número de fila con relación a la letra ingresada
    const layoutRows = layout[numRow] //Devuelve el array correspondinete a la fila
    const seat = layoutRows[num] //Devuelve el número de asiento en dicha fila
    return seat
}

module.exports = {
    checkSeatStatus,
    getRowNumber,
    book
}