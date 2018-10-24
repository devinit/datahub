import * as React from 'react';
import { List, ListItem, Narrative, PrintHeader, TableCell } from '../../atoms/CountryProfilePrint';
import { Country } from '../../types';

interface Props {
  country: Country;
}
export class PrintProfileHeader extends React.Component<Props> {
  render() {
    const { name } = this.props.country;

    return (
      <React.Fragment>
        <tr>
            <TableCell colSpan={ 4 }>
              <PrintHeader>{ name }</PrintHeader>
            </TableCell>
          </tr>
          <tr>
            <TableCell colSpan={ 4 }>
              <Narrative>Canada's ODA is Awesome</Narrative>
              <List>
                <ListItem>Non-concessional development finance (OOFs) has grown</ListItem>
                <ListItem>35% of bilateral ODA goes to Sub-Saharan Africa</ListItem>
              </List>
            </TableCell>
          </tr>
      </React.Fragment>
    );
  }
}
