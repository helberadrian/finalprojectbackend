
export function template(order){
    const template = ''
    
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