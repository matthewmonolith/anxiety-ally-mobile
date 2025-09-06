import { StyleSheet, Text, View } from "react-native";
import { Colours } from "utils/Colours";
import { CartesianChart, Bar } from "victory-native";
import { useFont } from "@shopify/react-native-skia";


const BarChart = <T,>({
  data,
  xAxis,
  yAxis,
  heading,
}: {
  data: T[];
  xAxis: string;
  yAxis: string;
  heading: string;
}) => {
  const font = useFont(require("../../assets/inter.ttf"), 12);
  if (!font) return null;

  return (
    <View style={styles.graph}>
      <Text style={styles.graphText}>{heading}</Text>
      <View style={{ height: 200, width: "100%" }}>
        <CartesianChart
          data={data}
          xKey={xAxis}
          yKeys={[yAxis]}
          yDomain={[1, 10]}
          axisOptions={{
            font,
            labelColor: "white",
            lineWidth: { grid: 0, frame: 0 },
          }}
        >
          {({ points, chartBounds }) => (
            <Bar
              points={points.avgMood}
              chartBounds={chartBounds}
              color={Colours.baseOrange}
              roundedCorners={{ topLeft: 5, topRight: 5 }}
              animate={{type: 'spring'}}
            />
          )}
        </CartesianChart>
      </View>
    </View>
  );
};

export default BarChart;

const styles = StyleSheet.create({
  graph: {
    width: "100%",
  },
  graphText: {
    marginBottom: 15,
    fontSize: 18,
    color: "White",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    textAlign: "center",
  },
});
