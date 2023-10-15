import { headers } from 'next/headers'

export default async function getData (action, dir) {
    const host = headers().get('host')

     let response = await fetch(`http://${host}/api/public?action=${action}&relDir=${dir}`)
     return response.json()
  }