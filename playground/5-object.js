
const prod = {
    stock:12.5,
    user: 123
}

const {stock: abc, user, rating} = prod;
const print = ({stock}) => {
    console.log(stock)
}
print(prod);
//console.log(abc, user);