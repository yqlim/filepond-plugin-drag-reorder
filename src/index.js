export default function(fpAPI){

  let currentRoot, currentItem, dragging;

  document.addEventListener('drop', function(e){
    if (!dragging) return;

    e.preventDefault();

    /**
     * If drop on filepond instance
     *   Remove original image
     *   Add dragged image to dropped position
     * else
     *   Do nothing
     */
    if (e.target.matches('.filepond--root')){
      // Mark item to remove
      currentItem.archive();
      // Remove marked items
      currentRoot.dispatch('DID_REMOVE_ITEM', {
        error: null,
        id: currentItem.id,
        item: currentItem
      });
    }

    dragging = false;
    currentItem = null;
    currentRoot = null;
  });

  function attachListeners(item, root){
    const li = root.element.parentElement.parentElement;

    li.setAttribute('draggable', true);
    li.ondragstart = li.ondragstart || function(e) {
      dragging = true;
      currentItem = item;
      currentRoot = root;

      const data = item.getFileEncodeDataURL();

      // Store data url into drag event to be internally used by filepond to add file
      e.dataTransfer.setData('text/plain', data);
    };
  }


  const { addFilter, utils } = fpAPI;
  const { createRoute } = utils;

  addFilter('CREATE_VIEW', viewAPI => {

    const { is, view, query } = viewAPI;

    if (!is('file')) {
      return;
    }

    const DID_LOAD_ITEM = function({ root, props }){
      const item = query('GET_ITEM', props.id);
      const isImage = file => /^image/.test(file.type);

      if (!item || !isImage(item.file)){
        return;
      }

      attachListeners(item, root);
    };

    view.registerWriter(
      createRoute({
        DID_LOAD_ITEM
      })
    );

  });

  return {
    // No options but this is still needed as a plugin format.
    options: {}
  }

};
