let cars = ['maruti', 'Ferrari', 'BMW', 'Audi']
let l = console.log

l(cars)

let myFunction = (element) => {
  return element + ' Power'
}

let newcars = cars.map(myFunction)

l(newcars[1])
l(newcars)
