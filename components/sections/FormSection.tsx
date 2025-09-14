import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField, FormMessage } from '@/components/ui/form-field';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface FormSectionProps {
  onSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  fieldName: string;
  placeholder: string;
  buttonText: string;
  isLoading?: boolean;
  inputTestId?: string;
  buttonTestId?: string;
}

export function FormSection({
  onSubmit,
  register,
  errors,
  fieldName,
  placeholder,
  buttonText,
  isLoading = false,
  inputTestId,
  buttonTestId
}: FormSectionProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
      <FormField>
        <div className="flex h-[58px] items-center justify-between pl-6 pr-3 py-3 relative self-stretch w-full bg-zinc-800 rounded-[36px] overflow-hidden border border-solid border-[#3f3f46] shadow-shadow">
          <div className="inline-flex w-full flex-col items-start justify-center relative ">
            <Input
              {...register(fieldName)}
              className="relative w-full mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-zinc-200 text-base text-start tracking-[0] leading-6 whitespace-nowrap bg-transparent border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-zinc-500"
              data-testid={inputTestId}
              placeholder={placeholder}
            />
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2.5 px-4 py-2 relative flex-[0_0_auto] mt-[-3.00px] mb-[-3.00px] bg-zinc-50 rounded-[45px] h-auto hover:bg-zinc-100 disabled:opacity-50"
            data-testid={buttonTestId}
          >
            <span className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-zinc-900 text-sm tracking-[0] leading-6 whitespace-nowrap">
              {isLoading ? `${buttonText}...` : buttonText}
            </span>
          </Button>
        </div>
        {errors[fieldName] && (
          <FormMessage className="text-center mt-2">
            {errors[fieldName]?.message as string}
          </FormMessage>
        )}
      </FormField>
    </form>
  );
}
