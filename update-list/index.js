const {PrismaClient} = require('../prisma/client')
let prisma = new PrismaClient()
module.exports = async function (context, req) {
    try {
        if (req.body && req.body.todo && req.body.id) {
            let todo = req.body.todo
            let id = req.body.id
            let item = await prisma.todo.update({
                where: {
                    id
                },
                data: {
                    todo
                }

            })
            context.res = {
                status: 200,
                body: item
            };
        }
        else {
            context.res = {
                status: 400,
                body: "Please pass a todo and id in the request body for update to be made"
            };
        }
    } catch (error) {
        context.log(error)
        context.res = {
            status: 500,
            body: "An error occured in the server"
        };
    }


};