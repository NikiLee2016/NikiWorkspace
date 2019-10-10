package com.nikirndemo3.test.jump;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.nikirndemo3.TestReCreateActivity;

public class JumpActivityModule extends ReactContextBaseJavaModule {

    public JumpActivityModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "JumpModule";
    }

    @ReactMethod
    public void jump() {
        getCurrentActivity().startActivity(new Intent(getReactApplicationContext(), TestReCreateActivity.class));
    }
}
