# FilePond Plugin - Drag Reorder

This is a plugin for [FilePond][1].

This plugin attempts to enable users to drag an existing image in the FilePond instance, drag to a desired order, and drop it to reorder it.

This plugin has no configuration options.

## Installation

### NPM

    npm i filepond-plugin-drag-reorder

## Usage

### As module

```javascript
import * as FilePond from 'filepond';
import FilepondPluginDragReorder from 'filepond-plugin-drag-reorder';

FilePond.registerPlugin(FilePondPluginDragReorder);
```

### As manual installation

```html
<script src="path/to/filepond-plugin-drag-reorder.js"></script>
<script src="path/to/filepond.js"></script>

<script>
FilePond.registerPlugin(FilePondPluginDragReorder);
</script>
```

## Note

1. This plugin works by removing the original photo and re-add it on drop, which means every time an image is dragged and dropped to reorder, the original image is removed and a new image is created.
2. This plugin has only been tested on FilePond v4.5.0. It should technically work on FilePond versions that internally support dropping a file.

## Known Issue

1. On reorder, the original file name will be gone.


[1]: https://github.com/pqina/filepond
