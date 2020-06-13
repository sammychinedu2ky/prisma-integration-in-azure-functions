const {PrismaClient} = require('../prisma/client')
let prisma = new PrismaClient()
module.exports = async function (context, req) {
    try {
           let items = await prisma.todo.findMany()
            context.res = {
                status: 200,
                body: items
            };
                              
    } catch (error) {
        context.log(error)
        context.res = {
            status: 500,
            body: "An error occured in the server"
        };
    }
   
   
};