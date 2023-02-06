// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { addEntry } from '../../redis/redis'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Process a POST request
    // let data = JSON.parse(req.body)
    console.log("data", req.body)
    const newEntry = await addEntry(req.body.source, req.body.destination)
    
    res.status(200).json({ newEntry })
  }else{
    res.status(200).json({ name: 'John Doe' })
  }
}