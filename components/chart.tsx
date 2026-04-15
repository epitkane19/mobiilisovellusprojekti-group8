import { Dimensions, View } from "react-native";
import { CartesianChart, Line } from "victory-native";
import {useFont } from "@shopify/react-native-skia";
import { chartProps } from "../types/ChartProps";
import { useEffect } from "react";
import { Karttamoodi } from "../types/karttamoodiEnum";

const { width, height } = Dimensions.get("window");


export function MyChart({DataArr, Karttamoodi}: chartProps) {
  
  
  const inter = require("../roboto.ttf"); 
  const fontti = useFont(inter, 12)  
  
  if(Karttamoodi == "paino")
  {
  return (
    <View style={{ height: height/2.5, width: width/1.1, backgroundColor: '#e2d1ff', padding: 20}}>
      <CartesianChart
        data={DataArr} 
        xKey="Date" 
        yKeys={["Weight_Kg"]}    
        domainPadding={{top: 30, bottom: 30}}
        axisOptions={{
          tickCount: DataArr.length, //tää sitä varten, että kartta luo oikean määrän ruudukoita. vakiona heittelee vähän sinnepäin ruutujen määrän.
          labelColor: '#ff1a1a',
          font: fontti,  
        }}
        
      >
        {}
        {({ points }) => (
          <Line 
          points={points.Weight_Kg} 
          color="red" strokeWidth={3}
          animate={{ type: "timing", duration: 500 }} />
        )}
      </CartesianChart>
    </View>
  );
}
else if(Karttamoodi == "pituusAvg")
  {
    return (
    <View style={{ height: height/2.5, width: width/1.1, backgroundColor: '#e2d1ff', padding: 20}}>
      <CartesianChart
        data={DataArr} 
        xKey="Jog_Date" 
        yKeys={["Avg_Speed"]}    
        domainPadding={{top: 30, bottom: 30}}
        axisOptions={{
          tickCount: DataArr.length,
          labelColor: '#ff1a1a',
          font: fontti
        }}
        
      >
        {}
        {({ points }) => (
          <Line 
          points={points.Avg_Speed} 
          color="red" strokeWidth={3}
          animate={{ type: "timing", duration: 500 }} />
        )}
      </CartesianChart>
    </View>
  );
  }
else if(Karttamoodi == "lenkkiAika")
  {
    return (
    <View style={{ height: height/2.5, width: width/1.1, backgroundColor: '#e2d1ff', padding: 20}}>
      <CartesianChart
        data={DataArr} 
        xKey="Jog_Date" 
        yKeys={["Time_Minutes"]}    
        domainPadding={{top: 30, bottom: 30}}
        axisOptions={{
          tickCount: DataArr.length,
          labelColor: '#ff1a1a',
          font: fontti
        }}
        
      >
        {}
        {({ points }) => (
          <Line 
          points={points.Time_Minutes} 
          color="red" strokeWidth={3}
          animate={{ type: "timing", duration: 500 }} />
        )}
      </CartesianChart>
    </View>
  );
  }
else if(Karttamoodi == "lenkkiCal")
  {
    return (
    <View style={{ height: height/2.5, width: width/1.1, backgroundColor: '#e2d1ff', padding: 20}}>
      <CartesianChart
        data={DataArr} 
        xKey="Jog_Date" 
        yKeys={["Calories_Burned"]}    
        domainPadding={{top: 30, bottom: 30}}
        axisOptions={{
          tickCount: DataArr.length,
          labelColor: '#ff1a1a',
          font: fontti
        }}
        
      >
        {}
        {({ points }) => (
          <Line 
          points={points.Calories_Burned} 
          color="red" strokeWidth={3}
          animate={{ type: "timing", duration: 500 }} />
        )}
      </CartesianChart>
    </View>
  );
  }
}
