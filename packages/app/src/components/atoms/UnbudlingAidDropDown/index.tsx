import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import glamorous from 'glamorous';
import { white, midWhite, black } from '../../theme/semantic';

export type onClose1 = (event) => void;
export interface Props  {
  visible: any;
  text: string;
  items: Array<{value: any; name: string; }>;
  selected?: string;
  onClose: onClose1;
  onChange?: any;
  active?: any;
}

const Wrapper = glamorous.div<{visible: any}>(
  {
    'background': white,
    'position': 'absolute',
    'width': '200px',
    'padding': '20px',
    'zIndex': 1000000,
    'textAlign': 'center',
    '& .close': {
      position: 'absolute',
      top: '5px',
      right: '5px',
      cursor: 'pointer',
    },
  },
  props => ({
    display: props.visible ? 'block' : 'none'
  })
);
const Select = glamorous.select({
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '100%',
  lineHeight: '1.5',
  color: black,
  height: '3em',
  backgroundColor: midWhite,
  cursor: 'pointer',
  margin: '0px',
  padding: '0.75em 2.25em 0.75em 1em',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderImage: 'initial',
  borderRadius: '0.25em',
  outline: '0px',
  transition: 'all 0.25s',
  backgroundImage: 'none',
  boxSizing: 'border-box',
  boxShadow: 'none',
  fontSize: '18px',
});
const Text = glamorous.span<{active: any; }>(
  {
    display: 'inline-block',
    position: 'relative',
    fontSize: '22px',
    listStyle: 'none',
    padding: '5px',
    textAlign: 'center',
  },
  props => ({
    opacity: props.active ? 1 : 0.5,
  }),
);
const onMouseDown1 = (e) => e.stopPropagation();

const onDropdownChange = (items, callback) => (e) => {
  if (callback) {
    const [selected = { name: '', value: '' }] =
      items.filter(d => d.value === e.target.value);
    callback(selected);
  }
};

const DropDown = ({ visible, items, text, selected, onClose, active, onChange }: Props) => {
  const options = items.map(item =>
    (<option key={item.value} value={item.value}>
      {item.name}
    </option>),
  );
  return (
    <Wrapper visible={visible}>
      <Icon name="close" className="close" onClick={onClose} />
      <Text active={active}>
        {text}
      </Text>
      <Select
        onMouseDown={onMouseDown1}
        value={selected || undefined}
        onChange={onDropdownChange(items, onChange)}
      >
        {options}
      </Select>
    </Wrapper>
  );
};

export default DropDown;
