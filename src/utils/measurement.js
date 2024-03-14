import Communicator from "communicator";

// Below functions are used to implemented measurement functionality.

// Clear all operators -
const clearMeasurementOperators = (hwv) => {
  hwv.operatorManager.remove(Communicator.OperatorId.MeasurePointPointDistance);
  hwv.operatorManager.remove(Communicator.OperatorId.MeasureLineLineAngle);
};

const calculateLength = (hwv) => {
  clearMeasurementOperators(hwv);
  hwv.operatorManager.push(Communicator.OperatorId.MeasurePointPointDistance);
};

const calculateAngle = (hwv) => {
  clearMeasurementOperators(hwv);
  hwv.operatorManager.push(Communicator.OperatorId.MeasureLineLineAngle);
};

const removeMeasurements = (hwv) => {
  clearMeasurementOperators(hwv);
  hwv.measureManager.removeAllMeasurements();
};

export { clearMeasurementOperators, calculateLength, calculateAngle, removeMeasurements };
