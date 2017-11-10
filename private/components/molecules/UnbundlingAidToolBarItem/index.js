// @flow
import React from 'react';
import { Grid } from 'semantic-ui-react';
import {lighterGrey, lightGrey } from 'components/theme/semantic';
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
  static getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: ToolBarItem.grid * 2,
    margin: `0 0 ${ToolBarItem.grid}px 0`,
    // change background colour if dragging
    background: isDragging ? lighterGrey : lightGrey,
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  static grid: number = 8;
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
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {this.state.keys.map(key => (
                    <Draggable key={key} draggableId={key}>
                      {(provided, snapshot) => (
                        <div
                          style={{width: '100px', height: '30px', marginLeft: '10px', display: 'inline-block'}}
                        >
                          <div
                            ref={provided.innerRef}
                            style={ToolBarItem.getItemStyle(
                              provided.draggableStyle,
                              snapshot.isDragging
                            )}
                            {...provided.dragHandleProps}
                          >
                            <div>{key}</div>
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Grid.Column>
    );
  }
}

