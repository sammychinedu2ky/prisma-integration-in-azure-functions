const {PrismaClient} = require('../prisma/client')
let prisma = new PrismaClient()
module.exports = async function (context, req) {
    try {
        if (req.body && req.body.id) {
            let id = parseInt(req.body.id)
            let item = await prisma.todo.delete({
                where: {
                    id
                },
            })
            context.res = {
                status: 200,
                body: item
            };
        }
        else {
            context.res = {
                status: 400,
                body: "Please pass an id in the request body for update to be made"
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