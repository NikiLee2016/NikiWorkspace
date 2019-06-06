package com.nikirndemo3.test;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.modules.core.PermissionListener;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * to handle interaction events.
 */
public class RNFragment1 extends Fragment implements ReactFragmentDelegateProtocol {

    private RNBaseRootView mRnView;

    public RNFragment1() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mRnView = new RNBaseRootView(getActivity(), "NIkiRnDemo3", null);
        mRnView.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return mRnView;
    }

    @Override
    public void onPause() {
        super.onPause();
        mRnView.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
        mRnView.onResume();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mRnView.onDestroy();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mRnView.onActivityResult(requestCode, resultCode, data);
    }



    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        return mRnView.onKeyDown(keyCode, event);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        return mRnView.onKeyUp(keyCode, event);
    }

    @Override
    public boolean onKeyLongPress(int keyCode, KeyEvent event) {
        return mRnView.onKeyLongPress(keyCode, event);
    }

    @Override
    public boolean onBackPressed() {
        return mRnView.onBackPressed();
    }

    @Override
    public boolean onNewIntent(Intent intent) {
        return mRnView.onNewIntent(intent);
    }

    @Override
    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
        mRnView.requestPermissions(permissions, requestCode, listener);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        mRnView.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}
