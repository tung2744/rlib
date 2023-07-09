import { Select } from "../components/Select";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SelectItem } from "rlib";

interface ExampleOption extends SelectItem {
  toString: () => string;
}

export function SelectScreen() {
  const options = useMemo<ExampleOption[]>(
    () => [
      { key: "1", toString: () => "Option 1" },
      { key: "2", toString: () => "Option 2" },
      { key: "3", toString: () => "Option 3" },
    ],
    []
  );

  const [selectedOption, setSelectedOption] = useState<ExampleOption | null>(null);

  return (
    <View style={screenStyles.container}>
      <Select
        options={options}
        placeholder="Please Select"
        selectedKey={selectedOption?.key}
        onChange={setSelectedOption}
      />
    </View>
  );
}

const screenStyles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: "flex-start",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
});
