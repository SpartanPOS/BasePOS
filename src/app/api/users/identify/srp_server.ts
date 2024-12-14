import {SRP, SrpServer} from 'fast-srp-hap';
import { NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient();


async function getUserVerifier(username: string):Promise<[string, string]>{

  const user = await prisma.employee.findFirst({where: {username: username}})

  return [user?.salt || "", user?.verifier || ""]
}

export default async function testSrp(NextApiRequest: NextApiRequest) {
  // Get the user details from somewhere
  const username = NextApiRequest.body.username;
  const [mongosalt, mongoverifier] = await getUserVerifier(username);
  const user = {
    username: username,
    salt: Buffer.from(mongosalt),
    verifier: Buffer.from(mongoverifier),
  };

  // Generate a secret key
  const secret = await SRP.genKey(32);

  const server = new SrpServer(SRP.params[1024], user, secret); // For Apple SRP use params.hap


  // ...
};
