import Chip from '@mui/material/Chip';
import { useRecordContext } from "react-admin";
// https://github.com/marmelab/react-admin/issues/2383#issuecomment-539549660
const ArrayChipList = (props) => {
  const array = useRecordContext(props)[props.source]
  if (typeof array === 'undefined' || array === null || array.length === 0) {
    return <div/>
  } else {
    return (
      <>
        {array.map(item => <Chip label={item} key={item+Math.random()}/>)}
      </>
    )    
  }
}
ArrayChipList.defaultProps = { addLabel: true }
export default ArrayChipList;