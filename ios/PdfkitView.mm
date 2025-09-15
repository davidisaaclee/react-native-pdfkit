#import "PdfkitView.h"

#import <react/renderer/components/PdfkitViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/PdfkitViewSpec/EventEmitters.h>
#import <react/renderer/components/PdfkitViewSpec/Props.h>
#import <react/renderer/components/PdfkitViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface PdfkitView () <RCTPdfkitViewViewProtocol>

@end

@implementation PdfkitView {
    PDFView * _pdfView;
    UIScrollView * _scrollView;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<PdfkitViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const PdfkitViewProps>();
    _props = defaultProps;

    _pdfView = [[PDFView alloc] initWithFrame:frame];
    _pdfView.autoScales = YES;
    _pdfView.displayMode = kPDFDisplaySinglePageContinuous;

    self.contentView = _pdfView;

    [self setupScrollViewObserver];
  }

  return self;
}

Class<RCTComponentViewProtocol> PdfkitViewCls(void)
{
    return PdfkitView.class;
}

- (void)setupScrollViewObserver
{
    // Find the UIScrollView in PDFView's subviews
    for (UIView *subview in _pdfView.subviews) {
        if ([subview isKindOfClass:[UIScrollView class]]) {
            _scrollView = (UIScrollView *)subview;
            break;
        }
    }

    if (!_scrollView) {
        NSLog(@"Error: Could not find UIScrollView in PDFView subviews");
        return;
    }

    // Add KVO observer for contentOffset
    [_scrollView addObserver:self forKeyPath:@"contentOffset" options:NSKeyValueObservingOptionNew context:nil];
}

- (void)dealloc
{
    if (_scrollView) {
        [_scrollView removeObserver:self forKeyPath:@"contentOffset"];
    }
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context
{
    if ([keyPath isEqualToString:@"contentOffset"] && object == _scrollView) {
        [self emitContentOffsetChangeEvent];
    } else {
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
    }
}

- (void)emitContentOffsetChangeEvent
{
    if (_scrollView && _eventEmitter) {
        CGPoint contentOffset = _scrollView.contentOffset;
        CGFloat zoomScale = _scrollView.zoomScale;

        facebook::react::PdfkitViewEventEmitter::OnContentOffsetChange event;
        event.contentOffsetX = contentOffset.x;
        event.contentOffsetY = contentOffset.y;
        event.zoomScale = zoomScale;

        std::static_pointer_cast<const facebook::react::PdfkitViewEventEmitter>(_eventEmitter)->onContentOffsetChange(event);
    }
}

- (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args
{
    RCTPdfkitViewHandleCommand(self, commandName, args);
}

- (void)loadDocumentFromURL:(NSString *)url
{
    NSURL *documentURL = [NSURL URLWithString:url];
    if (!documentURL) {
        NSLog(@"Error: Invalid URL: %@", url);
        return;
    }

    PDFDocument *document = [[PDFDocument alloc] initWithURL:documentURL];
    if (!document) {
        NSLog(@"Error: Could not load PDF document from URL: %@", url);
        return;
    }

    _pdfView.document = document;
}

- (void)setViewport:(double)contentOffsetX contentOffsetY:(double)contentOffsetY zoomScale:(double)zoomScale animated:(BOOL)animated
{
    if (!_scrollView) {
        NSLog(@"Error: ScrollView not found, cannot set viewport");
        return;
    }
  
  [_scrollView setZoomScale:zoomScale
                   animated:animated];
  [_scrollView setContentOffset:CGPointMake(contentOffsetX, contentOffsetY)
                       animated:animated];
}

- (void)setMinimumZoomScale:(double)scale
{
    if (!_scrollView) {
        NSLog(@"Error: ScrollView not found, cannot set minimum zoom scale");
        return;
    }

    _scrollView.minimumZoomScale = scale;
    NSLog(@"Set minimum zoom scale to: %f", scale);
}

- (void)setMaximumZoomScale:(double)scale
{
    if (!_scrollView) {
        NSLog(@"Error: ScrollView not found, cannot set maximum zoom scale");
        return;
    }

    _scrollView.maximumZoomScale = scale;
    NSLog(@"Set maximum zoom scale to: %f", scale);
}

@end
