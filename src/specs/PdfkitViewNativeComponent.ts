import { codegenNativeCommands } from 'react-native';
import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';
import type {
  Double,
  DirectEventHandler,
} from 'react-native/Libraries/Types/CodegenTypesNamespace';

export interface ContentOffsetChangeEvent {
  contentOffsetX: Double;
  contentOffsetY: Double;
  zoomScale: Double;
}

interface NativeProps extends ViewProps {
  onContentOffsetChange?: DirectEventHandler<ContentOffsetChangeEvent>;
}

interface NativeCommands {
  loadDocumentFromURL: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    url: string
  ) => void;
  setViewport: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    contentOffsetX: Double,
    contentOffsetY: Double,
    zoomScale: Double,
    animated: boolean
  ) => void;
  setMinimumZoomScale: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    scale: Double
  ) => void;
  setMaximumZoomScale: (
    viewRef: React.ElementRef<HostComponent<NativeProps>>,
    scale: Double
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
