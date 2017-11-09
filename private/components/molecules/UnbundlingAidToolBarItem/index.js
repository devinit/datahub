// @flow
import React from 'react';
import { Grid } from 'semantic-ui-react';
import Select from 'components/molecules/UnbundlingAidSelect';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type Props = {
  aid: string,
  width: number,
  data: any,
  position?: number,
  values: string[],
  textAlign?: string,
  onChange?: (key: string, value: string) => void,
};
/* eslint-disable no-unused-vars */
export default class ToolBarItem extends React.Component {
  static reorder(list, startIndex, endIndex) {
    const [removed] = list.splice(startIndex, 1); // gets a hold of the item
    list.splice(endIndex, 0, removed); // adds item in new place
    return list;
  }
  static reorder: (list: string[], startIndex: number, endIndex: number) => string[]
  constructor(props: Props) {
    super(props);
    const keys = Object.keys(this.props.data);
    this.state = {keys};
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  state: {
    keys: string[]
  }
  onDragEnd: (result: Object) => void

  onDragEnd(result: Object) {
    // dropped outside the list
    if (!result.destination) return;

    const keys = ToolBarItem.reorder(
      this.state.keys,
      result.source.index,
      result.destination.index
    );
    this.setState({
      keys
    });
  }

  render() {
    const {
      width,
      data,
      position = 0,
      values,
      textAlign,
      aid,
      onChange = (key, value) => {
        // TOFIX: @ernest why is this here yet its unused
      },
    } = this.props;
    return (
      <Grid.Column width={width} textAlign={textAlign || 'right'} verticalAlign="middle">
        <div>
          <span>{aid}</span>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {this.state.keys.map(key =>
                    key === 'years' ?
                      (<Draggable key={key} draggableId={key}>
                        <Select
                          ref={provided.innerRef}
                          key={key}
                          active
                          value={values[this.state.keys.indexOf(key)]}
                          options={data.years}
                          onChange={d => onChange(key, d)}
                        />
                      </Draggable>) :
                      (<Draggable key={key} draggableId={key}>
                        <Select
                          ref={provided.innerRef}
                          key={key}
                          active={this.state.keys.indexOf(key) <= position}
                          value={values[this.state.keys.indexOf(key)] || ''}
                          smallText={key}
                          options={data.to}
                          onChange={d => onChange(key, d)}
                        />
                      </Draggable>)
                  )
                  }
                  {provided.placeholder}
                </div>
              )
              }
            </Droppable>
          </DragDropContext>
        </div>
      </Grid.Column>
    );
  }
}

