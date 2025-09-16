import { codegenNativeCommands } from 'react-native';
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypesNamespace';

import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
  type CodegenTypes,
} from 'react-native';

export interface ContentOffsetChangeEvent {
  contentOffsetX: CodegenTypes.Double;
  contentOffsetY: CodegenTypes.Double;
  zoomScale: CodegenTypes.Double;
}

export interface NativeProps extends ViewProps {
  onContentOffsetChange?: DirectEventHandler<ContentOffsetChangeEvent>;
}

interface NativeCommands {
  loadDocumentFromURL: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    url: string
  ) => void;
  setViewport: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    contentOffsetX: CodegenTypes.Double,
    contentOffsetY: CodegenTypes.Double,
    zoomScale: CodegenTypes.Double,
    animated: boolean
  ) => void;
  setMinimumZoomScale: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    scale: CodegenTypes.Double
  ) => void;
  setMaximumZoomScale: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    scale: CodegenTypes.Double
  ) => void;
}

export const Commands = codegenNativeCommands<NativeCommands>({
  supportedCommands: [
    'loadDocumentFromURL',
    'setViewport',
    'setMinimumZoomScale',
    'setMaximumZoomScale',
  ],
});

export default codegenNativeComponent<NativeProps>('PdfkitView');
