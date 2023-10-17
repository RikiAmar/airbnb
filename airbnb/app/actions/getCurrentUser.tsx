import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "../libs/prismadb";
//לקבל את כל המידע מהבראוזר
export const getSession = async () => {
  return await getServerSession(authOptions);
};

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if(!session?.user?.email){
        return null;
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email as string
        }
    });

    if (!currentUser){
        return null;
    }

    //we do this, because the transfter of datetime objects to client components cause hydration. MAKE SURE TO FIX THE ERROR IN THE LAYOUT.
    return {
        ...currentUser,
        createdAt: currentUser.createdAt?.toISOString(),
        updatedAt: currentUser.updatedAt?.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString() || null
    };


  } catch (error) {
    return null;
  }
};

export default getCurrentUser;