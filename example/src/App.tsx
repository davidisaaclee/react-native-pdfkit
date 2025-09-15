import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import { PdfkitView, Commands } from 'react-native-pdfkit';

export default function App() {
  const pdfViewRef = useRef(null);
  const [savedViewport, setSavedViewport] = useState<{
    contentOffsetX: number;
    contentOffsetY: number;
    zoomScale: number;
  } | null>(null);
  const [currentViewport, setCurrentViewport] = useState<{
    contentOffsetX: number;
    contentOffsetY: number;
    zoomScale: number;
  } | null>(null);

  useEffect(() => {
    if (pdfViewRef.current) {
      Commands.loadDocumentFromURL(
        pdfViewRef.current,
        'https://dn790009.ca.archive.org/0/items/all-ps1-rpg-manuals/King%27s%20Field.pdf'
      );
    }
  }, []);

  const handleContentOffsetChange = (event: any) => {
    const viewport = {
      contentOffsetX: event.nativeEvent.contentOffsetX,
      contentOffsetY: event.nativeEvent.contentOffsetY,
      zoomScale: event.nativeEvent.zoomScale,
    };

    setCurrentViewport(viewport);
    console.log('Content offset changed:', viewport);
  };

  const saveViewport = () => {
    if (currentViewport) {
      setSavedViewport(currentViewport);
      console.log('Viewport saved:', currentViewport);
    }
  };

  const restoreViewport = () => {
    if (savedViewport && pdfViewRef.current) {
      Commands.setViewport(
        pdfViewRef.current,
        savedViewport.contentOffsetX,
        savedViewport.contentOffsetY,
        savedViewport.zoomScale,
        false
      );
      console.log('Viewport restored:', savedViewport);
    }
  };

  const restoreViewportAnimated = () => {
    if (savedViewport && pdfViewRef.current) {
      Commands.setViewport(
        pdfViewRef.current,
        savedViewport.contentOffsetX,
        savedViewport.contentOffsetY,
        savedViewport.zoomScale,
        true
      );
      console.log('Viewport restored with animation:', savedViewport);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !currentViewport && styles.buttonDisabled]}
          onPress={saveViewport}
          disabled={!currentViewport}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !savedViewport && styles.buttonDisabled]}
          onPress={restoreViewport}
          disabled={!savedViewport}
        >
          <Text style={styles.buttonText}>Restore</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !savedViewport && styles.buttonDisabled]}
          onPress={restoreViewportAnimated}
          disabled={!savedViewport}
        >
          <Text style={styles.buttonText}>Restore ✨</Text>
        </TouchableOpacity>
      </View>

      <PdfkitView
        ref={pdfViewRef}
        style={styles.pdfView}
        onContentOffsetChange={handleContentOffsetChange}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pdfView: {
    flex: 1,
    width: '100%',
  },
});
