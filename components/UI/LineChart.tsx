import { StyleSheet, Text, View } from "react-native";
import { Colours } from "utils/Colours";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";

const LineChart = <T,>({
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

  return (
    <View style={styles.graph}>
      <Text style={styles.graphText}>{heading}</Text>
      <View style={{ height: 200, width: "100%" }}>
        <CartesianChart
          data={data}
          xKey={xAxis}
          yKeys={[yAxis]}
          yDomain={[1, 10]}
          axisOptions={{ font, labelColor: "white" }}
        >
          {({ points }) => (
            <Line
              points={points[yAxis]}
              color={Colours.baseOrange}
              strokeWidth={3}
            />
          )}
        </CartesianChart>
      </View>
    </View>
  );
};
export default LineChart;

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
    textAlign: 'center'
  },
});
