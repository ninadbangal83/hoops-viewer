import Communicator from "communicator";

// Below functions are used to implemented Orbit view functionality.
const spin = (hwv) => {
  hwv.operatorManager.set(Communicator.OperatorId.Navigate, 0);
};

const turnable = (hwv) => {
  hwv.operatorManager.set(Communicator.OperatorId.Turntable, 0);
};

const walk = (hwv) => {
  hwv.operatorManager.set(Communicator.OperatorId.WalkMode, 0);
};

export { spin, turnable, walk };
