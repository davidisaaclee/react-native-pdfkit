import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useCallback,
} from 'react';
import { CodegenTypes } from 'react-native';
import PdfkitViewNativeComponent, {
  Commands,
  type ContentOffsetChangeEvent,
} from './PdfkitViewNativeComponent';

export interface PDFViewProps extends ViewProps {
  /**
   * Event that is called when the content offset or zoom scale changes.
   */
  onContentOffsetChange?: (event: {
    contentOffsetX: number;
    contentOffsetY: number;
    zoomScale: number;
  }) => void;

  initialMinimumZoomScale?: number;
  initialMaximumZoomScale?: number;
}

export interface PDFViewMethods {
  loadDocumentFromURL: (url: string) => void;
  setViewport: (opts: {
    contentOffset: {
      x: number;
      y: number;
    };
    zoomScale: number;
    animated: boolean;
  }) => void;
  setMinimumZoomScale: (scale: number) => void;
  setMaximumZoomScale: (scale: number) => void;
}

export const PDFView = forwardRef<PDFViewMethods, PDFViewProps>(
  function PDFView(
    {
      onContentOffsetChange,
      initialMinimumZoomScale,
      initialMaximumZoomScale,
      ...otherProps
    },
    forwardedRef
  ) {
    const nativeViewRef = useRef(null);

    useImperativeHandle(forwardedRef, () => ({
      loadDocumentFromURL: (url: string) => {
        if (nativeViewRef.current) {
          Commands.loadDocumentFromURL(nativeViewRef.current, url);
        }
      },
      setViewport: ({ contentOffset, zoomScale, animated }) => {
        if (nativeViewRef.current) {
          Commands.setViewport(
            nativeViewRef.current,
            contentOffset.x,
            contentOffset.y,
            zoomScale,
            animated
          );
        }
      },
      setMinimumZoomScale: (scale: number) => {
        if (nativeViewRef.current) {
          Commands.setMinimumZoomScale(nativeViewRef.current, scale);
        }
      },
      setMaximumZoomScale: (scale: number) => {
        if (nativeViewRef.current) {
          Commands.setMaximumZoomScale(nativeViewRef.current, scale);
        }
      },
    }));

    // Set initial zoom scales when component mounts
    useEffect(() => {
      if (nativeViewRef.current) {
        if (initialMinimumZoomScale !== undefined) {
          Commands.setMinimumZoomScale(
            nativeViewRef.current,
            initialMinimumZoomScale
          );
        }
        if (initialMaximumZoomScale !== undefined) {
          Commands.setMaximumZoomScale(
            nativeViewRef.current,
            initialMaximumZoomScale
          );
        }
      }
    }, [initialMinimumZoomScale, initialMaximumZoomScale]);

    const handleContentOffsetChange = useCallback<
      CodegenTypes.DirectEventHandler<ContentOffsetChangeEvent>
    >(
      (event) => {
        if (onContentOffsetChange) {
          onContentOffsetChange({
            contentOffsetX: event.nativeEvent.contentOffsetX,
            contentOffsetY: event.nativeEvent.contentOffsetY,
            zoomScale: event.nativeEvent.zoomScale,
          });
        }
      },
      [onContentOffsetChange]
    );

    return (
      <PdfkitViewNativeComponent
        ref={nativeViewRef}
        onContentOffsetChange={handleContentOffsetChange}
        {...otherProps}
      />
    );
  }
);
