import { useCallback, useMemo } from "react";
import { useSelectable } from "../_shared/selectable/useSelectable";
import { SelectableItem } from "../_shared/selectable/models";
import { useControlledState } from "../_shared/useControlledState";

export interface SelectItem<Key = string> extends SelectableItem<Key> {
  disabled?: boolean;
}

export interface SelectProps<Item extends SelectItem, Context = void> {
  options: Item[];
  disabled?: boolean;
  selectedKey?: Item["key"] | null;
  onChange?: (selectedItem: Item | null, ctx?: Context) => void;
  isDropdownOpened?: boolean;
  onIsDropdownOpenedChange?: (value: boolean) => void;
  onAcquireFocus?: () => void;
  onSubmitEditing?: () => void;
}

export interface SelectItemProps<Item extends SelectItem, Context = void> {
  item: Item;
  isSelected?: boolean;
  isDisabled?: boolean;
  onSelect?: (ctx: Context) => void;
}

export interface SelectedItemProps<Item extends SelectItem> {
  item: Item;
}

export interface SelectParams<Item extends SelectItem, Context = void> {
  optionsProps: SelectItemProps<Item, Context>[];
  selectedItemProps: SelectedItemProps<Item> | null;
  isDropdownOpened: boolean;
  onCloseDropdown: () => void;
  onPressTrigger: () => void;
  onClear: () => void;
}

export function useSelect<Item extends SelectItem, Context = void>(
  props: SelectProps<Item, Context>
): SelectParams<Item, Context> {
  const {
    selectedKey,
    options,
    onChange,
    disabled = false,
    isDropdownOpened: propIsDropdownOpened,
    onIsDropdownOpenedChange: propOnIsDropdownOpenedChange,
    onAcquireFocus,
    onSubmitEditing,
  } = props;

  const [isDropdownOpened, setIsDropdownOpened] = useControlledState<boolean>(
    false,
    propIsDropdownOpened,
    propOnIsDropdownOpenedChange
  );

  const onPressTrigger = useCallback(() => {
    onAcquireFocus?.();
    setIsDropdownOpened(true);
  }, [onAcquireFocus, setIsDropdownOpened]);

  const onCloseDropdown = useCallback(() => {
    setIsDropdownOpened(false);
  }, [setIsDropdownOpened]);

  const { onSelect, selectedItem } = useSelectable<Item, Context | undefined>({
    options,
    selectedKey: selectedKey ?? null,
    onChange,
  });

  const onClear = useCallback(() => {
    onSelect(null, undefined);
  }, [onSelect]);

  const optionsProps = useMemo<SelectItemProps<Item, Context>[]>(() => {
    return options.map<SelectItemProps<Item, Context>>((item) => {
      return {
        item,
        isSelected: selectedItem?.key === item.key,
        isDisabled: item.disabled,
        onSelect: (ctx: Context) => {
          if (disabled) {
            return;
          }
          onSelect(item, ctx);
          setIsDropdownOpened(false);
          onSubmitEditing?.();
        },
      };
    });
  }, [disabled, onSelect, onSubmitEditing, options, selectedItem?.key, setIsDropdownOpened]);

  const selectedItemProps = useMemo<SelectedItemProps<Item> | null>(() => {
    if (selectedItem == null) {
      return null;
    }
    return {
      item: selectedItem,
    };
  }, [selectedItem]);

  return {
    optionsProps,
    selectedItemProps,
    isDropdownOpened,
    onPressTrigger,
    onCloseDropdown,
    onClear,
  };
}
