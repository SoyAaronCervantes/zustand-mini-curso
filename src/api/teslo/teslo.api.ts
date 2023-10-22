import {type SuperAgentRequest} from 'superagent';
import saPrefix from 'superagent-prefix';
import {useAuthStore} from "../../stores";

const tesloURL = saPrefix('http://localhost:3000/api');
export const tesloAPI = (fetchFn: SuperAgentRequest): SuperAgentRequest => {
  const token = useAuthStore.getState().token;
  const request = fetchFn
    .use(tesloURL)
    .type('application/json')
    .set('Accept', 'application/json');

  if (token !== null) {
    console.log({token});
    request.auth(token, {type: 'bearer'})
  }

  return request;
}
