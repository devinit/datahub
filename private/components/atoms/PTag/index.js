// @flow
import React from 'react';
import glamorous from 'glamorous';
import {black} from 'components/theme/semantic';

type Props = {
    size?: string;
    color?: string;
    fontWeight?: string | number;
    textAlign?: string;
    paddingBottom?: string;
    paddingTop?: string;
    lineHeight?: number;
}

const size = {
  normal: '1em',
  small: '0.8em',
  big: '1.5em'
};

const PTag = glamorous.p(
    (props: Props) => ({
      paddingTop: props.paddingBottom || '0em',
      paddingBottom: props.paddingBottom || '0em',
      textAlign: props.textAlign || 'center',
      color: props.color || black,
      fontSize: props.size ? size[props.size] : '1em',
      fontWeight: props.fontWeight || 500,
      lineHeight: props.lineHeight || 1
    })
);
export default PTag;
