import { WhiteCard } from '../../components';
import {useBearStore} from "../../stores";
import {useShallow} from "zustand/react/shallow";

const BlackBears = () => {

  const bears = useBearStore(state => state.blackBears);
  const increaseBears = useBearStore(state => state.increaseBlackBears);

  return (

    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={ () => increaseBears(+1) }> +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{bears} </span>
        <button onClick={ () => increaseBears(-1) }>-1</button>
      </div>

    </WhiteCard>
  );
}
const PolarBears = () => {

  const bears = useBearStore(state => state.polarBears);
  const increaseBears = useBearStore(state => state.increasePolarBears);

  return (

    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={ () => increaseBears(+1) }> +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{bears} </span>
        <button onClick={ () => increaseBears(-1) }>-1</button>
      </div>

    </WhiteCard>
  );
}
const PandaBears = () => {

  const bears = useBearStore(state => state.pandaBears);
  const increaseBears = useBearStore(state => state.increasePandaBears);

  return (

    <WhiteCard centered>
      <h2>Osos Panda</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={ () => increaseBears(+1) }> +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{bears} </span>
        <button onClick={ () => increaseBears(-1) }>-1</button>
      </div>

    </WhiteCard>
  );
}
const BearsDisplay = () => {
  const bears = useBearStore( useShallow(state => state.bears) );
  const doNothing = useBearStore( state => state.doNothing );
  const add = useBearStore( state => state.addBear );
  const clear = useBearStore( state => state.clearBears );

  return (
    <WhiteCard>
      <h1>Osos malosos</h1>
      <button onClick={doNothing}>Do nothing!</button>
      <button className="[ my-2 ]" onClick={add}>Add bear</button>
      <button onClick={clear}>Clean list</button>
      <pre>{ JSON.stringify(bears, null, 2) }</pre>
    </WhiteCard>
  );
};

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />
        <PandaBears />
        <PolarBears />
        <BearsDisplay />
      </div>

    </>
  );
};
