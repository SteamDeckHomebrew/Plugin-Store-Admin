import { Create, Edit, SimpleForm, TextInput } from 'react-admin';

const AnnouncementForm = () => (
    <SimpleForm>
        <TextInput source="title" />
        <TextInput source="text" fullWidth multiline />
    </SimpleForm>
)

const AnnouncementEditor = () => (
    <Edit>
        <AnnouncementForm/>
    </Edit>
);

export const AnnouncementCreator = () => (
    <Create>
        <AnnouncementForm/>
    </Create>
);

export default AnnouncementEditor;