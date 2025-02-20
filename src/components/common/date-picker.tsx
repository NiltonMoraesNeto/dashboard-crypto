import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import { CalendarIcon as Calendar1 } from "lucide-react";
import { parse, isValid, format } from "date-fns";

interface DatePickerProps {
  className?: string;
  selected?: Date | string;
  onSelect?: (date: Date | undefined) => void;
  labelFilter: string;
}

export function DatePicker({
  className,
  selected,
  onSelect,
  labelFilter,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(() => {
    if (typeof selected === "string") {
      const parsedDate = parse(selected, "dd/MM/yyyy", new Date());
      return isValid(parsedDate) ? parsedDate : undefined;
    }
    return selected instanceof Date ? selected : undefined;
  });

  useEffect(() => {
    if (typeof selected === "string") {
      const parsedDate = parse(selected, "dd/MM/yyyy", new Date());
      setDate(isValid(parsedDate) ? parsedDate : undefined);
    } else if (selected instanceof Date) {
      setDate(selected);
    }
  }, [selected]);

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (onSelect) {
      onSelect(newDate);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <Calendar1 size={16} className="mr-2 text-foreground/50" />
            {date ? (
              format(date, "dd/MM/yyyy")
            ) : (
              <span className="text-xs font-normal text-foreground/50">
                {labelFilter}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            locale={ptBR}
            defaultMonth={date}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
