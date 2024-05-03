import * as React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

export default function SpinningInfinity() {
  return (
    <InfinitySpin
    visible={true}
    width="100"
    color="#4fa94d"
    ariaLabel="infinity-spin-loading"
  />
  );
}