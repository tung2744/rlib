import { useCallback, useMemo } from "react";
import { SelectableItem } from "./models";

type SelectableChangeHandler<Item extends SelectableItem, Context> = (
  selectedItem: Item | null,
  context: Context
) => void;

export interface SelectableProps<Item extends SelectableItem, Context> {
  options: Item[];
  selectedKey: Item["key"] | null;
  onChange: SelectableChangeHandler<Item, Context> | undefined;
}

export interface SelectableParams<Item extends SelectableItem, Context> {
  onSelect: (item: Item | null, context: Context) => void;
  selectedItem: Item | null;
}

export function useSelectable<Item extends SelectableItem, Context>(
  props: SelectableProps<Item, Context>
): SelectableParams<Item, Context> {
  const { options, selectedKey, onChange } = props;

  const optionsByKey = useMemo<Map<unknown, Item>>(() => {
    return new Map(options.map((option) => [option.key, option]));
  }, [options]);

  const selectedItem = useMemo<Item | null>(() => {
    if (selectedKey === null) {
      return null;
    }
    return optionsByKey.get(selectedKey) ?? null;
  }, [optionsByKey, selectedKey]);

  const onSelect = useCallback(
    (item: Item | null, context: Context) => {
      onChange?.(item, context);
    },
    [onChange]
  );

  return useMemo(() => ({ onSelect, selectedItem }), [onSelect, selectedItem]);
}
