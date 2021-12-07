import addModal from './add';
import renameModal from './rename';
import removeModal from './delete';

const mappingModal = {
  adding: addModal,
  renaming: renameModal,
  removing: removeModal,
};

export const getModal = (type) => mappingModal[type];
