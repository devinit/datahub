import glamorous from 'glamorous';
import { red, lightBlack } from '../../theme/semantic';

export const Lead = glamorous.p({
  fontSize: '1.6em',
  fontWeight: 300,
});

export const HeaderGroup = glamorous.div({
  marginTop: '2em',
  '& .header': {
    marginBottom: 0,
    marginTop: 0,
  },
});
export const SectionHeader = glamorous.h2(
  {
    padding: '1em 1em 1em 1em',
    display: 'inline-block',
    margin: 0,
    letterSpacing: '1px',
    lineHeight: 1,
    textTransform: 'uppercase',
    '& span': {
      color: red,
    },
  },
  props => ({
    fontSize: props.fontSize || '1em',
    background: props.color || '#e9e7e8',
    color: props.fontColor || lightBlack,
  }),
);
