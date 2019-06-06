package com.nikirndemo3.test;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.PermissionListener;

public class RNBaseRootView extends FrameLayout implements ReactDelegateProtocol, ReactViewDelegate.OnViewInitFinishListener {

    private ReactViewDelegate mDelegate;

    public RNBaseRootView(@NonNull Activity activity, String moduleName, Bundle bundle) {
        super(activity.getApplicationContext(), null, 0);
        mDelegate = new ReactViewDelegate(activity, moduleName);
        mDelegate.setOnViewInitFinishListener(this);
    }

    public RNBaseRootView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs, 0);
    }

    public RNBaseRootView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public void setViewSize() {
        ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        setLayoutParams(layoutParams);
    }

    @Override
    public void onInitSuccess(ReactRootView view) {
        setViewSize();
        addView(view);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        mDelegate.onCreate(savedInstanceState);
    }

    @Override
    public void onPause() {
        mDelegate.onPause();
    }

    @Override
    public void onResume() {
        mDelegate.onResume();
    }

    @Override
    public void onDestroy() {
        mDelegate.onDestroy();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        mDelegate.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public boolean onBackPressed() {
        return mDelegate.onBackPressed();
    }

    @Override
    public boolean onNewIntent(Intent intent) {
        return mDelegate.onNewIntent(intent);
    }

    @Override
    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
        mDelegate.requestPermissions(permissions, requestCode, listener);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        mDelegate.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

}
