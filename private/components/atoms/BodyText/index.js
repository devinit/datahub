import glamorous from 'glamorous';

export const Lead = glamorous.p({
  fontSize: '1.5em',
  fontWeight: '300',
  textAlign: 'center',
  '& span': {
    paddingRight: '2px',
    paddingLeft: '2px',
    fontWeight: '600',
  },
});

