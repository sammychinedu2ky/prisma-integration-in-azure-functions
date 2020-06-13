const {PrismaClient} = require('../prisma/client')
let prisma = new PrismaClient()
module.exports = async function (context, req) {
    try {
        if (req.body && req.body.todo) {
            let todo = req.body.todo
         let item = await prisma.todo.create({
                data:{
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
                body: "Please pass a todo  in the request body"
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