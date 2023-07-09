import { useState } from "react";

const noop = () => {};

export function useControlledState<T>(
  defaultValue: T,
  value: T | undefined,
  onChange: ((value: T) => void) | undefined
): [value: T, setValue: (value: T) => void] {
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(defaultValue);

  if (value !== undefined) {
    return [value, onChange ?? noop];
  }

  return [uncontrolledValue, setUncontrolledValue];
}
