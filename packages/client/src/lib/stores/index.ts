import { useEffect, useState } from 'react';
import centralPubsub from '../central-pubsub';

const renderUI = centralPubsub.makeRenderWait();

export const useSSRStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
    renderUI();
  }, [result]);

  return data;
};
