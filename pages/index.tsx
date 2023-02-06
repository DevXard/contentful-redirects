import { SidebarExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import React, { useState } from 'react';
import { Button, Form, TextInput, ControlledInput } from '@contentful/forma-36-react-components';
import TextLink from "@contentful/f36-text-link"
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import axios from 'axios';

async function sendRequest(url: RequestInfo | URL, { arg }: any) {
  console.log(arg)
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),

  })
}

const Sidebar = () => {
  const sdk = useSDK<SidebarExtensionSDK>();
  const medata = sdk.entry.getSys()
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/getdata', fetcher);
  const [url, setUrl] = useState('');
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();
  console.log(data)
  const addRedirect = async () => {
    if(!url || url === "") return
    axios.post('/api/hello', { source: url, destination: `/${medata.contentType.sys.id}/${medata.id}`  })

    }


  return (
    <>
    <ul className='"w-48 h-28 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
      {data && data.redirects.data.map((item: any, index: number) => <li className='w-full flex justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600' key={index}><a href='https://google.com'>{item.source}</a> <Button className="text-red-700 font-bold">X</Button> </li>)}
    </ul>
<div className='flex justify-between'>
  <Button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-1 px-2 mt-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
   buttonType="positive"
   onClick={addRedirect}
   >Add</Button>
   <div className="flex mt-1 items-center">
    <label htmlFor="default-input" className="inline-block align-middle text-sm font-medium text-gray-900 dark:text-white mr-2">Url</label>
    <input onChange={(e) => setUrl(e.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-1" />
</div>
   </div>
  </>)
};

export default Sidebar;