import { List, Datagrid, DateField, TextField } from "react-admin";

const AnnouncementList = () => (
    <List pagination={false}>
        <Datagrid rowClick="edit">
            <TextField source="title" sortable={false} />
            <TextField source="id" sortable={false} />
            {/* <TextField source="text" sortable={false} /> */}
            <DateField source="updated" sortable={false} />
            <DateField source="created" sortable={false} />
        </Datagrid>
    </List>
)

export default AnnouncementList;