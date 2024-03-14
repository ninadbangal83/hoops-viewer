
# HOOPS Viewer

The HOOPS Viewer is a versatile React component that can seamlessly integrate with any existing React application. It allows for the creation of a viewer and loading of SCS models, enabling a wide range of functionalities.

## Table of Contents

* [Integration](#integration)
* [Usage](#usage)
* [Features](#features)
* [Documentation](#documentation)
* [Support](#support)

## Integration

To integrate the HOOPS Viewer into your existing application, follow these steps:

1. Clone the repository: `git clone https://github.com/Cove-Inc/hoops-viewer.git`
2. Copy all files and folders from the `src` directory.
3. Paste the copied files and folders into the corresponding `src` directory of your client application. In case there are already existing directories, merge the files accordingly.
4. Make sure to include the Communicator module in the `node_modules/react-scripts/config/webpack/webpack.config` file (in the return statement of line 199).

   ```
       externals : {
         communicator : "Communicator"
       },
   ```
5. Import the Viewer component and place it within the HTML element where you intend to load the viewer. Ensure that the HTML element has predefined dimensions (height and width) for proper rendering.

## Usage

To make use of the viewer, follow these steps:

1. The Viewer component accepts the `scsPath` (SCS file path) as a prop.
2. Pass the desired SCS file path to the Viewer component as a prop and launch your client application.
3. The SCS file path should be relative to the `viewerSetup.js` file located in the `src/containers/Viewer` directory. For instance, if the SCS file path relative to the `viewerSetup.js` file is `../../data/modules/3mm-bolt.scs`, set the `scsPath` variable as `data/modules/3mm-bolt.scs`.
4. When the SCS file path is passed as a prop to the Viewer component, the corresponding model will be loaded in the viewer application. If no SCS file path is provided, the viewer will load empty.

## Features

The HOOPS Viewer offers the following features:

* Right-click context menu with functionalities such as hiding, isolating, adjusting transparency, zooming, and showing all.
* Horizontal toolbar with functionalities for home view, measurements, annotations, orbiting, and exploding.
* Model Tree traversal and part management functionalities, including show, hide, and isolate.

## Documentation

Comprehensive documentation for the HOOPS Viewer is included along with the project files. You can refer to this documentation for detailed instructions and insights into utilizing the viewer's capabilities.

## Support

If you have any questions, encounter issues, or would like to provide feedback, please don't hesitate to reach out to us via email. We are dedicated to providing prompt assistance and continuous improvement.
