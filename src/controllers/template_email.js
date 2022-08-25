
export function template(order){
    let template = `<h1 style="color: blue;">Nueva Compra</h1>
    <p>Hemos registrado la compra de los siguientes productos:</p>`
    
    for (const product of order.cart) {
        const text = `<ul>
        <li>id: ${product.id}</li>
        <li>name: ${product.name}</li>
        <li>description: ${product.description}</li>
        <li>price: ${product.price}</li>
        <li>cant: ${product.cant}</li>
        </ul><br>`

        template = `${template} ${text}`;
    }

    return template;
}