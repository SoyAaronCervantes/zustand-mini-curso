import {useEffect, useState} from 'react'
import {tesloAPI} from "../../../api/teslo";
import superagent from "superagent";

export const RequestInfo = () => {
  const [info, setInfo] = useState<unknown>();
  useEffect(() => {

    const url = superagent.get('/auth/private');
    tesloAPI(url)
      .then( res => setInfo(res.body))
      .catch( () => setInfo('error') )

  }, []);

  return (
    <>
      <h2>Información</h2>
      <pre>
        {JSON.stringify(info, null, 2)}
      </pre>
    </>
  )
}
