import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface DateTimePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  
  // Handle time input
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(selectedDate || new Date());
    const [hours, minutes] = e.target.value.split(':').map(Number);
    
    if (!isNaN(hours) && !isNaN(minutes)) {
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      setSelectedDate(newDate);
      setDate(newDate);
    }
  };
  
  // Handle date selection
  const handleSelect = (day: Date | undefined) => {
    if (day) {
      const newDate = new Date(day);
      // Keep the current time
      newDate.setHours(date.getHours());
      newDate.setMinutes(date.getMinutes());
      
      setSelectedDate(newDate);
      setDate(newDate);
    }
  };
  
  const formatTime = (date: Date) => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-card" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      <div className="flex items-center">
        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
        <Input
          type="time"
          value={formatTime(date)}
          onChange={handleTimeChange}
          className="w-[150px]"
        />
      </div>
    </div>
  );
}
