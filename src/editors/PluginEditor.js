import { ArrayInput, Edit, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

const PluginEditor = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />
            <TextInput source="author" />
            <TextInput source="description" fullWidth multiline />
            <ArrayInput source="tags">
                <SimpleFormIterator>
                    <TextInput source="." label="Name"/>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="versions">
                <SimpleFormIterator>
                    <TextInput source="name" />
                    <TextInput source="hash" fullWidth/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export default PluginEditor;