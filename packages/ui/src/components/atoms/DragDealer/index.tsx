import glamorous from 'glamorous';
// copied over from drag-dealer module css file
const DragDealerContainer = glamorous.div(
  {
    '& .dragdealer': {
      position: 'relative',
      height: '30px',
      background: '#EEE'
    },
    '& .dragdealer .handle': {
      position: 'absolute',
      top: 0,
      left: 0,
      cursor: 'pointer'
    },
    '& .dragdealer .red-bar': {
      width: '100px',
      height: '30px',
      background: '#CC0000',
      color: '#FFF',
      fontSize: '14px',
      lineHeight: '30px',
      textAlign: 'center',
    },
    '.dragdealer .disabled': {
      background: '#898989'
    }
  }
);

export default DragDealerContainer;
