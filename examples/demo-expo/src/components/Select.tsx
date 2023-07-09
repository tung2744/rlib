import React from "react";
import { TouchableOpacity, View, Text, GestureResponderEvent } from "react-native";
import { useSelect, SelectProps as RSelectProps, SelectItem } from "rlib";
import { styles } from "./Select.styles";

interface SelectProps<T extends SelectItem> extends RSelectProps<T, GestureResponderEvent> {
  placeholder?: string;
  renderItem?: (item: T) => React.ReactElement;
}

function defaultItemRenderer(item: SelectItem): React.ReactElement {
  return <Text>{String(item)}</Text>;
}

export function Select<T extends SelectItem>(props: SelectProps<T>) {
  const { placeholder, renderItem = defaultItemRenderer, ...restProps } = props;
  const { optionsProps, selectedItemProps, isDropdownOpened, onPressTrigger, onClear } = useSelect<
    T,
    GestureResponderEvent
  >(restProps);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.trigger} onPress={onPressTrigger}>
        {selectedItemProps ? renderItem(selectedItemProps.item) : <Text>{placeholder}</Text>}
        {selectedItemProps != null ? (
          <TouchableOpacity style={styles.clearButton} onPress={onClear}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
      {isDropdownOpened ? (
        <View style={styles.menu}>
          {optionsProps.map((option) => (
            <TouchableOpacity style={styles.menuItem} onPress={option.onSelect}>
              {renderItem(option.item)}
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  );
}
