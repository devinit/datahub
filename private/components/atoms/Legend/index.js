import glamorous from 'glamorous';

export const Legend = glamorous.div({
  textAlign: 'left',
  fontWeight: 100,

  '& span': {
    display: 'table-cell',
    valign: 'middle',
    margin: '2px 0',
  },

  '& span:first-child': {
    padding: '0 2px',
    width: '16px',
  },

  '& span:first-child > span': {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },

}, (props) => {
  return ({
    '& span:first-child > span': {
      backgroundColor: props.color || '#abc'
    },
  });
});

export default Legend;
