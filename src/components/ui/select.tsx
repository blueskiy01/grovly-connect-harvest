import * as SelectPrimitive from "@radix-ui/react-select"
import { SelectContent } from "./select/select-content"
import { SelectItem } from "./select/select-item"
import { SelectTrigger } from "./select/select-trigger"
import { SelectLabel } from "./select/select-label"
import { SelectScrollUpButton, SelectScrollDownButton } from "./select/select-scroll-buttons"

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectSeparator = SelectPrimitive.Separator

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}