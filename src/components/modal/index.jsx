import addModal from './Add';
import renameModal from './Rename';
import removeModal from './Delete';

const mappingModal = {
  adding: addModal,
  renaming: renameModal,
  removing: removeModal,
};

const getModal = (type) => mappingModal[type];
export default getModal;
