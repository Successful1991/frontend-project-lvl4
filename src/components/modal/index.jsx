import addModal from './Add';
import renameModal from './Rename';
import removeModal from './Delete';

const mappingModal = {
  adding: addModal,
  renaming: renameModal,
  removing: removeModal,
};

export const getModal = (type) => mappingModal[type];
