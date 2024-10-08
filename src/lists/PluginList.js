import { List, Datagrid, BooleanField, TextField, ArrayField, SingleFieldList } from "react-admin";
import AdvancedChip from "../components/AdvancedChip";
import ArrayChipList from "../components/ArrayChipList";
import { downloadArtifact } from "../pluginDataProvider";

const PluginList = () => (
    <List pagination={false} disableAuthentication>
        <Datagrid rowClick="edit">
            <TextField source="id" sortable={false} />
            <TextField source="name" sortable={false} />
            <TextField source="author" sortable={false} />
            <ArrayChipList source="tags" sortable={false}/>
            <ArrayField source="versions" sortable={false}>
                <SingleFieldList>
                    <AdvancedChip source="name" altSource="hash" onChipClick={downloadArtifact} clickSources={["hash"]}/>
                </SingleFieldList>
            </ArrayField>
            <BooleanField source="visible" sortable={false}/>
        </Datagrid>
    </List>
)

export default PluginList;