import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns/format';
import { Calendar } from './ui/calendar';

export function FormInput({
  className = '',
  control,
  name,
  type = 'text',
  placeHolder,
  handleChange,
  clearErrors,
  maxLength = 100,
}: any) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          console.log(field.value);
          return (
            <FormItem className={'relative ' + className}>
              <FormLabel>{placeHolder}</FormLabel>

              <FormControl>
                <Input
                  type={type}
                  className={fieldState.error?.message && 'border-red-500'}
                  id={name}
                  placeholder={placeHolder}
                  value={field.value}
                  onChange={e => {
                    field.onChange(e);
                    handleChange(e);
                    clearErrors(name);
                  }}
                  onFocus={() => {
                    clearErrors(name);
                  }}
                  maxLength={maxLength}
                />
              </FormControl>

              {
                <FormMessage className="absolute top-full">
                  {fieldState.error?.message}
                </FormMessage>
              }
            </FormItem>
          );
        }}
      />
    </>
  );
}

export function FormDate({
  className = '',
  control,
  name,
  placeHolder,
  handleChange,
  clearErrors,
}: any) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <FormItem className={'relative ' + className}>
              <FormLabel>{placeHolder}</FormLabel>

              <FormControl>
                <Input
                  type="date"
                  className={fieldState.error?.message && 'border-red-500'}
                  id={name}
                  placeholder={placeHolder}
                  value={field.value}
                  onChange={e => {
                    field.onChange(e);
                    handleChange(e);
                    clearErrors(name);
                  }}
                  onFocus={() => {
                    clearErrors(name);
                  }}
                />
              </FormControl>

              {
                <FormMessage className="absolute top-full">
                  {fieldState.error?.message}
                </FormMessage>
              }
            </FormItem>
          );
        }}
      />
    </>
  );
}

interface DatePickerProps {
  value?: Date | null;
  onChange?: (date?: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  className,
  disabled,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value || undefined} // Calendar expects Date | undefined
          onSelect={onChange}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}
