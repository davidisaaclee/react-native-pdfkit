import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { useState } from 'react';
import PdfkitViewExample from './PdfkitViewExample';
import PDFViewExample from './PDFViewExample';

type ExampleType = 'pdfkit' | 'pdfview';

export default function App() {
  const [currentExample, setCurrentExample] = useState<ExampleType>('pdfview');

  const renderExample = () => {
    switch (currentExample) {
      case 'pdfkit':
        return <PdfkitViewExample />;
      case 'pdfview':
        return <PDFViewExample />;
      default:
        return <PDFViewExample />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switcherContainer}>
        <TouchableOpacity
          style={[
            styles.switcherButton,
            currentExample === 'pdfkit' && styles.switcherButtonActive,
          ]}
          onPress={() => setCurrentExample('pdfkit')}
        >
          <Text
            style={[
              styles.switcherButtonText,
              currentExample === 'pdfkit' && styles.switcherButtonTextActive,
            ]}
          >
            PdfkitView (Raw)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.switcherButton,
            currentExample === 'pdfview' && styles.switcherButtonActive,
          ]}
          onPress={() => setCurrentExample('pdfview')}
        >
          <Text
            style={[
              styles.switcherButtonText,
              currentExample === 'pdfview' && styles.switcherButtonTextActive,
            ]}
          >
            PDFView (Wrapper)
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.exampleContainer}>{renderExample()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switcherContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  switcherButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  switcherButtonActive: {
    backgroundColor: '#007AFF',
  },
  switcherButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  switcherButtonTextActive: {
    color: 'white',
  },
  exampleContainer: {
    flex: 1,
  },
});
