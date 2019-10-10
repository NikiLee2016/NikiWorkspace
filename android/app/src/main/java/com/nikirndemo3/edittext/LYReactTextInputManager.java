package com.nikirndemo3.edittext;

import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.text.Editable;
import android.text.InputType;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.SpannableStringBuilder;
import android.text.TextUtils;
import android.text.style.ForegroundColorSpan;
import android.text.style.ImageSpan;
import android.util.TypedValue;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewDefaults;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.textinput.ReactEditText;
import com.facebook.react.views.textinput.ReactTextInputManager;
import com.nikirndemo3.R;

public class LYReactTextInputManager extends ReactTextInputManager implements SelectionWatcher {
    protected static final String REACT_CLASS = "LYAndroidTextInput";

    // private String mTopic;
    // private int[] mTopicPosition = {-1, -1};

    private int mStart;
    private int mEnd;
    private LYReactEditText mEditText;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public ReactEditText createViewInstance(ThemedReactContext context) {
        LYReactEditText editText = new LYReactEditText(context);
        int inputType = editText.getInputType();
        editText.setInputType(inputType & (~InputType.TYPE_TEXT_FLAG_MULTI_LINE));
        editText.setReturnKeyType("done");
        editText.setTextSize(
                TypedValue.COMPLEX_UNIT_PX,
                (int) Math.ceil(PixelUtil.toPixelFromSP(ViewDefaults.FONT_SIZE_SP)));
        editText.setLYSelectionWatcher(this);
        mEditText = editText;
        return editText;
    }

    private int getIndexPosition() {
        if (TextUtils.isEmpty(mEditText.getText())) {
            return 0;
        }
        if (mStart == mEnd) {
            return mStart;
        }
        return -1;
    }

    @ReactProp(name = "topic")
    public void setTopic(ReactEditText view, String topic) {
        CharSequence colorString = getColorString(topic, Color.parseColor("#00ff00"));
        Editable text = mEditText.getText();
        if (TextUtils.isEmpty(text)) {
            mEditText.setText(colorString);
            return;
        }
        // 当前光标位置
        int position = this.getIndexPosition();
        if (position < 0) {
            return;
        } else if (position == 0) {
            mEditText.setText("");
            mEditText.append(colorString);
        } else if (position >= text.length()) {
            mEditText.append(colorString);
        } else {
            mEditText.setText("");
            mEditText.append(text.subSequence(0, position));
            mEditText.append(colorString);
            mEditText.append(text.subSequence(position, text.length()));
        }
    }


    /**
     * 去掉这个区间内的字符
     *
     * @param view
     * @param subPosition
     */
    @ReactProp(name = "subText")
    private void setSubText(ReactEditText view, ReadableArray subPosition) {
        if (subPosition == null || subPosition.size() != 2) {
            throw new IllegalArgumentException("字符截取区间参数错误, 应该是长度等于2的数组");
        }
        int start = subPosition.getInt(0);
        int end = subPosition.getInt(1);
        Editable text = mEditText.getText();
        if (TextUtils.isEmpty(text)) {
            return;
        }

        mEditText.setText(text.subSequence(0, start));
        if (end < text.length()){
            mEditText.setText(text.subSequence(end, text.length()));
        }
    }

    @ReactProp(name = "emoji")
    public void insertEmoji(ReactEditText view, String emojiCode) {
        Drawable drawable = view.getContext().getResources().getDrawable(R.mipmap.guobiting);
        drawable.setBounds(0 ,0, 30, 30);
        ImageSpan span = new ImageSpan(drawable, ImageSpan.ALIGN_BASELINE);
        Editable text = mEditText.getText();
        SpannableString ss = new SpannableString(text.toString());
        ss.setSpan(span, 0, ss.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        mEditText.getText().insert(mEditText.getSelectionStart(), ss);
    }

    @Override
    public void onSelectionChanged(int start, int end) {
        mStart = start;
        mEnd = end;
    }

    public static CharSequence getColorString(String text, int color) {
        SpannableStringBuilder style = new SpannableStringBuilder(text);
        style.setSpan(new ForegroundColorSpan(color), 0, text.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        return style;
    }
}
