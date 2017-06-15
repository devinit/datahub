// @flow
import React from 'react';
import Chart from '../Chart';
import donut from './donut.stub';

const Donut = () => (<Chart config={donut.config} data={donut.data} height="150px" />);

export default Donut;
