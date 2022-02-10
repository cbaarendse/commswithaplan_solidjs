// TODO: in module and on definitely typed.

interface RangeSlider {}

type Value = string;
type Values = Value[];
type Min = number;
type Max = number;
type Step = number;
type Range = boolean | 'min' | 'max';
type Pushy = boolean;
type Float = boolean;
type Vertical = boolean;
type Pips = boolean;
type PipStep = number;
type First = boolean | 'label';
type Last = boolean | 'label';
type Rest = boolean | 'label';
type All = boolean | 'label';
type Prefix = string;
type Suffix = string;
type Reversed = boolean;
type Hoverable = boolean;
type Disabled = boolean;
type Id = string;
type Formatter = (v: Value, i: number, p: number) => Value;
type HandleFormatter = (v: Value, i: number, p: number) => Value;
type Stiffness = 0.15;
type Damping = 0.4;
interface SpringValues {
  stiffness: Stiffness;
  damping: Damping;
}

type Start = (activeHandle: number, value: number, values: string[]) => void;
type Change = (
  activeHandle: number,
  startValue: number,
  previousValue: number,
  value: number,
  values: string[]
) => void;
type Stop = (activeHandle: number, startValue: number, value: number, values: string[]) => void;
