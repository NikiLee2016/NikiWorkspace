package com.nikirndemo3.test;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import javax.annotation.Nullable;

public class ReactViewDelegate extends ReactActivityDelegate {

    private Activity mActivity;

    private String mComponentName;
    private OnViewInitFinishListener mListener;
    private Bundle mBundle;

    private @Nullable
    ReactRootView mReactRootView;

    public ReactViewDelegate(Activity activity, String componentName, Bundle bundle) {
        super(activity, componentName);
        mActivity = activity;
        mComponentName = componentName;
        mBundle = bundle;
    }

    public void setOnViewInitFinishListener(OnViewInitFinishListener listener) {
        mListener = listener;
    }

    @Nullable
    @Override
    protected Bundle getLaunchOptions() {
        return mBundle;
    }

    @Override
    protected void loadApp(String appKey) {
        if (mReactRootView != null) {
            throw new IllegalStateException("Cannot loadApp while app is already running.");
        }
        mReactRootView = createRootView();
        mReactRootView.startReactApplication(
                getReactNativeHost().getReactInstanceManager(),
                appKey,
                getLaunchOptions());
        //通知View, 加载完成
        mListener.onInitSuccess(mReactRootView);
    }

    // TODO: 2019/6/6 注意一定要在外面的fragment中调用其他事件, 比如onPause


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onPause() {
        super.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    public static interface OnViewInitFinishListener {
        void onInitSuccess(ReactRootView view);
    }
}
