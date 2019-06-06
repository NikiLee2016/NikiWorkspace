package com.nikirndemo3;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;

import com.nikirndemo3.test.RNFragment1;
import com.nikirndemo3.test.RNFragment2;
import com.nikirndemo3.test.RNPagerAdapter;
import com.nikirndemo3.test.ReactFragmentActivity;
import com.nikirndemo3.test.ReactFragmentDelegateProtocol;

import java.util.ArrayList;

public class MainActivity extends ReactFragmentActivity {

    private ViewPager mViewPager;
    private ArrayList<Fragment> mFragmentList;
    private RNFragment1 mRnFragment1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_rnfragment);
        mViewPager = findViewById(R.id.view_pager);
        mFragmentList = new ArrayList<>();
        mRnFragment1 = new RNFragment1();
        mFragmentList.add(mRnFragment1);
        mFragmentList.add(new RNFragment2());
        mViewPager.setAdapter(new RNPagerAdapter(getSupportFragmentManager(), mFragmentList));
    }

    @NonNull
    @Override
    protected ReactFragmentDelegateProtocol getFragmentDelegate() {
        return mRnFragment1;
    }
}
