package com.bsstore;
import java.util.Base64;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class Bulb extends ReactContextBaseJavaModule  {
    private static Boolean isOn = false;
    public Bulb(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void getStatus(
        Callback successCallback) {
        successCallback.invoke(null, isOn);
    }

    @ReactMethod
    public void turnOn() {
        isOn = true;
        System.out.println("Bulb is turn ON");
    }
    @ReactMethod
    public void turnOff() {
        isOn = false;
        System.out.println("Bulb is turn OFF");
    }

    @ReactMethod
    public void encodeToBase64(String input, Callback successCallback) {
        String encodedString = Base64.getEncoder().encodeToString(input.getBytes());
        successCallback.invoke(encodedString);
    }

    @ReactMethod
    public void decodeStringFromBase64(String input, Callback successCallback) {
        byte[] decodedBytes = Base64.getDecoder().decode(input);
        String decodedString = new String(decodedBytes);
        successCallback.invoke(decodedString);
    }


    @Override
    public String getName() {
        return "Bulb";
    }

}