package com.example.tracker_client;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.StrictMode;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import javax.crypto.Mac;
import java.io.IOException;
import java.io.OutputStream;
import java.net.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;



public class MainActivity extends AppCompatActivity {

    private static final String SEVER = "175.24.97.39";
    private static final int PORT = 8080;
    TextView tv;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        if (android.os.Build.VERSION.SDK_INT > 9) {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        tv =findViewById(R.id.tv);
        //getLocation();
        while(true){
            getLocation();
            try{
                Thread.sleep(10000);
            }
            catch (InterruptedException e){

            }
        }



    }

    private static String getMac(){
        try {
            List<NetworkInterface> all = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface nif : all) {
                if (!nif.getName().equalsIgnoreCase("wlan0")) continue;

                byte[] macBytes = nif.getHardwareAddress();
                if (macBytes == null) {
                    return "";
                }

                StringBuilder res1 = new StringBuilder();
                for (byte b : macBytes) {
                    res1.append(String.format("%02X",b));
                }

                return res1.toString();
            }
        } catch (Exception ex) {
        }
        return "020000000000";
    }

    private void sendAddress(String address) throws IOException {
        Socket socket = new Socket("175.24.97.39", 8080 /*"183.232.231.172", 80*/);

        if(socket.isConnected()){
            String s = getMac();
            address += s + "|";
            OutputStream outputStream = socket.getOutputStream();
            outputStream.write(address.getBytes("utf-8"));
            outputStream.flush();
            outputStream.close();
        }
        socket.close();
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    private void getLocation() {
        //check permissions
        ArrayList<String> permissions = new ArrayList<>();
        if (ActivityCompat.checkSelfPermission(com.example.tracker_client.MainActivity.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Manifest.permission.ACCESS_FINE_LOCATION);
        }
        if (ActivityCompat.checkSelfPermission(com.example.tracker_client.MainActivity.this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Manifest.permission.ACCESS_COARSE_LOCATION);
        }
        if (ActivityCompat.checkSelfPermission(com.example.tracker_client.MainActivity.this, Manifest.permission.INTERNET) != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Manifest.permission.INTERNET);
        }

        //check
        if (permissions.size() == 0) {
            getLocationLL();
        } else {//request for permission
            requestPermissions(permissions.toArray(new String[permissions.size()]), 2);
        }
    }

    private void getLocationLL() {

        Location location = getLastKnownLocation();
        if (location != null) {

            String result = "{code: '0',type:'2',data: {longitude: '" + location.getLongitude() + "',latitude: '" + location.getLatitude() + "'}}";
//            tex.loadUrl("javascript:callback(" + result + ");");
            String locationStr =  location.getLatitude() + "|" + location.getLongitude() + "|";
            //tv.setText(  "Address：\n" + locationStr);
            try{
                sendAddress(locationStr);
            }
            catch (IOException e){
                e.printStackTrace();
            }
        } else {
            Toast.makeText(this, "Get address failed", Toast.LENGTH_SHORT).show();
            tv.setText(  "Request permissions 7 - " + "Get address failed");
        }
    }

    private Location getLastKnownLocation() {
        LocationManager mLocationManager = (LocationManager) getApplicationContext().getSystemService(LOCATION_SERVICE);
        List<String> providers = mLocationManager.getProviders(true);
        Location bestLocation = null;
        for (String provider : providers) {
            Location l = mLocationManager.getLastKnownLocation(provider);
            if (l == null) {
                continue;
            }
            if (bestLocation == null || l.getAccuracy() < bestLocation.getAccuracy()) {
                // Found best last known location: %s", l);
                bestLocation = l;
            }
        }
        return bestLocation;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        switch (requestCode) {
            case 2:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    tv.setText(   "Get the permission");
                    getLocationLL();
                } else {
                    Toast.makeText(this, "Can not get the permission", Toast.LENGTH_SHORT).show();
                }
                break;
            default:
        }
    }


}
