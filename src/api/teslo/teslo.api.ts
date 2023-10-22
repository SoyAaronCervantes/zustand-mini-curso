import {type SuperAgentRequest} from 'superagent';
import saPrefix from 'superagent-prefix';

const tesloURL = saPrefix('http://localhost:3000/api');
export const tesloAPI = (fetchFn: SuperAgentRequest): SuperAgentRequest => fetchFn
  .use(tesloURL)
  .type('application/json')
  .set('Accept', 'application/json')
