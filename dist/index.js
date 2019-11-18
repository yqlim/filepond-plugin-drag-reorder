/*!
 * FilepondPluginDragReorder
 * (c) 2019 Yong Quan Lim
 * Released under MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.FilepondPluginDragReorder = factory());
}(this, (function () { 'use strict';

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  function index (fpAPI) {
    var _this = this;

    var currentRoot, currentItem, dragging;
    document.addEventListener('drop', function (e) {
      if (!dragging) return;
      e.preventDefault();
      /**
       * If drop on filepond instance
       *   Remove original image
       *   Add dragged image to dropped position
       * else
       *   Do nothing
       */

      if (e.target.matches('.filepond--root')) {
        // Mark item to remove
        currentItem.archive(); // Remove marked items

        currentRoot.dispatch('DID_REMOVE_ITEM', {
          error: null,
          id: currentItem.id,
          item: currentItem
        });
      }

      currentItem = null;
      currentRoot = null;
    });

    function attachListeners(item, root) {
      var li = root.element.parentElement.parentElement;
      li.setAttribute('draggable', true);

      li.ondragstart = li.ondragstart || function (e) {
        dragging = true;
        currentItem = item;
        currentRoot = root;
        var data = item.getFileEncodeDataURL(); // Store data url into drag event to be internally used by filepond to add file

        e.dataTransfer.setData('text/plain', data);
      };
    }

    var addFilter = fpAPI.addFilter,
        utils = fpAPI.utils;
    var createRoute = utils.createRoute;
    addFilter('CREATE_VIEW', function (viewAPI) {
      _newArrowCheck(this, _this);

      var is = viewAPI.is,
          view = viewAPI.view,
          query = viewAPI.query;

      if (!is('file')) {
        return;
      }

      var DID_LOAD_ITEM = function DID_LOAD_ITEM(obj) {
        var _this2 = this;

        var root = obj.root,
            props = obj.props;
        var id = props.id;
        var item = query('GET_ITEM', id);

        var isImage = function isImage(file) {
          _newArrowCheck(this, _this2);

          return /^image/.test(file.type);
        }.bind(this);

        if (!item || !isImage(item.file)) {
          return;
        }

        attachListeners(item, root);
      };

      view.registerWriter(createRoute({
        DID_LOAD_ITEM: DID_LOAD_ITEM
      }));
    }.bind(this));
    return {
      // No options but this is still needed as a plugin format.
      options: {}
    };
  }

  return index;

})));
