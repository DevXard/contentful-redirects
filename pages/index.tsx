import { SidebarExtensionSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import React from 'react';
import { Button, Form, TextInput, ControlledInput } from '@contentful/forma-36-react-components';
import useSWR from 'swr'


const Sidebar = () => {
  const sdk = useSDK<SidebarExtensionSDK>();
  const medata = sdk.entry.getSys()
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error } = useSWR('/api/getdata', fetcher);
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

  return (
    <>
    <ul>
      {data && data.redirects.data.map((item: any, index: number) => <li key={index}>{item.source}</li>)}
    </ul>
  <Button buttonType="positive">Add</Button>
  </>)
};

export default Sidebar;