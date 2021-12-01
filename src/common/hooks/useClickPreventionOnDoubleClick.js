import useCancellablePromises from "./useCancellablePromises";
import { cancellablePromise, delay } from "../utils";

const useClickPreventionOnDoubleClick = (
  onClick,
  onDoubleClick,
  duration = 300
) => {
  const api = useCancellablePromises();

  const handleClick = (...args) => {
    api.clearPendingPromises();
    const waitForClick = cancellablePromise(delay(duration));
    api.appendPendingPromise(waitForClick);

    waitForClick.promise
      .then(() => {
        api.removePendingPromise(waitForClick);
        onClick(...args);
      })
      .catch((errorInfo) => {
        api.removePendingPromise(waitForClick);
        if (!errorInfo.isCanceled) {
          throw errorInfo.error;
        }
      });
  };

  const handleDoubleClick = (...args) => {
    api.clearPendingPromises();
    onDoubleClick(...args);
  };

  return [handleClick, handleDoubleClick];
};

export default useClickPreventionOnDoubleClick;
