package com.nikirndemo3.test;

import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.PermissionListener;

public interface ReactDelegateProtocol {

    void onCreate(Bundle savedInstanceState);

    void onPause();

    void onResume();

    void onDestroy();

    void onActivityResult(int requestCode, int resultCode, Intent data);

    boolean onReactKeyDown(int keyCode, KeyEvent event);

    boolean onReactKeyUp(int keyCode, KeyEvent event);

    boolean onReactKeyLongPress(int keyCode, KeyEvent event);

    boolean onBackPressed();

    boolean onNewIntent(Intent intent);

    void requestPermissions(
            String[] permissions,
            int requestCode,
            PermissionListener listener);

    void onReactRequestPermissionsResult(
            final int requestCode,
            final String[] permissions,
            final int[] grantResults);


}
