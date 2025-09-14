package com.pdfkit

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.PdfkitViewManagerInterface
import com.facebook.react.viewmanagers.PdfkitViewManagerDelegate

@ReactModule(name = PdfkitViewManager.NAME)
class PdfkitViewManager : SimpleViewManager<PdfkitView>(),
  PdfkitViewManagerInterface<PdfkitView> {
  private val mDelegate: ViewManagerDelegate<PdfkitView>

  init {
    mDelegate = PdfkitViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<PdfkitView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): PdfkitView {
    return PdfkitView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: PdfkitView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "PdfkitView"
  }
}
