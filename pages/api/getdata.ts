// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { get } from '../../redis/redis'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const redirects = await
    get()
   res.status(200).json( {redirects} )
}