import * as React from 'react';
import {
    storiesOf
} from '@storybook/react';
import TreeChart, {
    Props
} from '.';
import config from '../../visbox/linePartition';

const data = require('./testData.json');

const configB = {
    title: '',
    type: 'partition',
    colors: ['#0095cb'],
    coloring: 'color',
    orientation: 'horizontal',
    tree: {
        id: 'nodeId',
        parent: 'nodeParent',
        value: 'value'
    },
    legend: {
        showLegend: true,
        depth: 1
    },
    labeling: {
        prefix: 'US$'
    }
};

const configA = {
    ...config.partition,
    labeling: {
        prefix: 'US$'
    }
};

const base = {
    height: '250px',
    width: '350px',
    onClick: console.info,
    data,
};

storiesOf('Treemap', module)
    .add('Governement Finance A', () => {
        const props: Props = {
            ...base,
            config: configA
        };
        return <div style={{padding: '10em'}} > < TreeChart {...props}/> </div > ;
    })
    .add('Governement Finance B', () => {
        const props: Props = {
            ...base,
            config: configB
        };
        return <div style={{padding: '10em'}} > < TreeChart {...props}/> </div > ;
    });
