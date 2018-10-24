import * as React from 'react';
import { List, ListItem, Narrative, PrintHeader, TableCell } from '../../atoms/CountryProfilePrint';

export class PrintProfileHeader extends React.Component {
  render() {
    return (
      <React.Fragment>
        <tr>
            <TableCell colSpan={ 4 }>
              <PrintHeader>Canada</PrintHeader>
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
