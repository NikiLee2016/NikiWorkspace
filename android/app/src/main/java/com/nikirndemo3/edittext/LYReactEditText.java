package com.nikirndemo3.edittext;

import android.content.Context;

import com.facebook.react.views.textinput.ReactEditText;

import javax.annotation.Nullable;

public class LYReactEditText extends ReactEditText {

    private @Nullable
    SelectionWatcher mSelectionWatcher;

    public LYReactEditText(Context context) {
        super(context);
    }

    @Override
    protected void onSelectionChanged(int selStart, int selEnd) {
        super.onSelectionChanged(selStart, selEnd);
        if (mSelectionWatcher != null) {
            mSelectionWatcher.onSelectionChanged(selStart, selEnd);
        }
    }

    public void setLYSelectionWatcher(SelectionWatcher watcher){
        mSelectionWatcher = watcher;
    }

}
