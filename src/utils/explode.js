import Communicator from "communicator";

// Below functions are used to implemented explode functionality.
const stopExplosion = (hwv) => {
  hwv.explodeManager.stop();
};

const setMagnitude = (hwv, magnitude) => {
  hwv.explodeManager.setMagnitude(magnitude * 0.1);
};

export { stopExplosion, setMagnitude };
