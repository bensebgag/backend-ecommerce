import prisma from "../../config/db.js";

const create=async (name:string,Clerkid: string )=>{

  let user =await prisma.user.findUnique({
      where:{Clerkid}
  })
    if(!user){
       user= await prisma.user.create({
        data: {
            name,
            Clerkid
        },
    });
    }
    return user
}

const roleIs=async (Clerkid:string)=>{
    let user = await prisma.user.findUnique({where:{Clerkid}});

    return user

}









export {create ,roleIs};