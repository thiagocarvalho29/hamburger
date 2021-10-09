const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const port = 3001
const app = express()
app.use(express.json())
app.use(cors())


const Orders = []

const check_order_id = (request, response, next) => {
    const { id } = request.params

    const index = Orders.findIndex(Orders => Orders.id === id)

    if (index < 0) {
        return response.status(404).json({ Message: "Orders Not Found" })
    }

    request.Orders_index = index
    request.Orders_id = id

    next()
}

app.get('/orders', (request, response) => {
    return response.json(Orders)
})

app.post('/orders', (request, response) => {
    const { order, name } = request.body
    const new_order = { id: uuid.v4(), order, name}

    Orders.push(new_order)
    return response.status(201).json(new_order)
})

app.put('/orders/:id', check_order_id, (request, response) => {
    const { order, name } = request.body
    const index = request.Orders_index
    const id = request.Orders_id

    const update_order = { id, order, name }

    Orders[index] = update_order



    return response.json(update_order)
})


app.delete('/orders/:id', check_order_id, (request, response) => {
    const index = request.Orders_index

    Orders.splice(index, 1)

    return response.status(204).json()
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})