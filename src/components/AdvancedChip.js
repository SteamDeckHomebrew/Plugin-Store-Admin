import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { useRecordContext } from 'react-admin';
import get from 'lodash.get';

const AdvancedChip = ({ source, altSource, onChipClick, clickSources }) => {
    const record = useRecordContext();
    const src = get(record, source);
    const altSrc = get(record, altSource);
    return (
        <Tooltip title={altSrc}>
            <Chip label={src} key={src+Math.random()} onClick={() => onChipClick(...clickSources.map(x => get(record, x)))}/>
        </Tooltip>
    )
}
export default AdvancedChip;