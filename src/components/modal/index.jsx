import AddModal from './Add';
import RenameModal from './Rename';
import RemoveModal from './Delete';

const mappingModal = {
  adding: AddModal,
  renaming: RenameModal,
  removing: RemoveModal,
};

const getModal = (type) => mappingModal[type];
export default getModal;
