"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { cn } from "@/lib/utils";
import { getLocalTimeZone, today } from "@internationalized/date";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
    Button,
    Calendar,
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarGridHeader,
    CalendarHeaderCell,
    DateInput,
    DatePicker,
    DateSegment,
    Dialog,
    Group,
    Heading,
    Popover
} from "react-aria-components";

import useDebouncedFormik from "@/core/hooks/useDebouncedFormik";
import './style.css';

type FormikInputBoxProps = {
    formik: any;
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
    extClass?: string;
    semi?: boolean;
    readonly?: boolean;
    disabled?: boolean;
}
    & React.ComponentProps<"div">;
export const FormikInputBox: React.FC<FormikInputBoxProps> = (
    { formik, label, name, placeholder, type, extClass, ...props }
) => {

    const debouncedFormik = useDebouncedFormik(formik, 1000);
    return (
        <div className={`${props.semi ? 'semi-group' : 'form-group'} grid gap-3`}>
            <Label htmlFor={name} className={extClass}>{label}</Label>
            {type === 'date' ?
                <Input
                    id={name}
                    name={name}
                    type={type ?? 'text'}
                    placeholder={placeholder ?? `Enter ${label}`}
                    onChange={debouncedFormik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[name]}
                    readOnly={props.readonly}
                    className={`form-input-date    ${formik.errors[name] ? 'input-error' : ''}`} />
                :
                <Input
                    id={name}
                    name={name}
                    type={type ?? 'text'}
                    placeholder={placeholder ?? `Enter ${label}`}
                    onChange={debouncedFormik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[name]}
                    readOnly={props.readonly}
                    disabled={props.disabled}
                    className={`form-input    ${formik.errors[name] ? 'input-error' : ''}`}
                />
            }
            {formik.touched[name] && formik.errors[name] ? <div className='text-error text-red-500 text-sm pl-2'>{formik.errors[name]}</div> : null}
        </div>

    )
}

const DateInputBox: React.FC<FormikInputBoxProps> = ({ formik, label, name, placeholder, type, extClass, ...props }: FormikInputBoxProps) => {
    const now = today(getLocalTimeZone());

    return (
        <DatePicker className="space-y-2">
            <div className="flex">
                <Group className="inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 pe-9 text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
                    <DateInput>
                        {(segment) => (
                            <DateSegment
                                segment={segment}
                                className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
                            />
                        )}
                    </DateInput>
                </Group>
                <Button className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70">
                    <CalendarIcon size={16} strokeWidth={2} />
                </Button>
            </div>
            <Popover
                className="z-50 rounded-lg border border-border bg-background text-popover-foreground shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
                offset={4}
            >
                <Dialog className="max-h-[inherit] overflow-auto p-2">
                    <Calendar className="w-fit">
                        <header className="flex w-full items-center gap-1 pb-1">
                            <Button
                                slot="previous"
                                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-foreground data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
                            >
                                <ChevronLeft size={16} strokeWidth={2} />
                            </Button>
                            <Heading className="grow text-center text-sm font-medium" />
                            <Button
                                slot="next"
                                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:bg-accent hover:text-foreground data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70"
                            >
                                <ChevronRight size={16} strokeWidth={2} />
                            </Button>
                        </header>
                        <CalendarGrid>
                            <CalendarGridHeader>
                                {(day) => (
                                    <CalendarHeaderCell className="size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80">
                                        {day}
                                    </CalendarHeaderCell>
                                )}
                            </CalendarGridHeader>
                            <CalendarGridBody className="[&_td]:px-0">
                                {(date) => (
                                    <CalendarCell
                                        date={date}
                                        className={cn(
                                            "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal text-foreground outline-offset-2 transition-colors data-[disabled]:pointer-events-none data-[unavailable]:pointer-events-none data-[focus-visible]:z-10 data-[hovered]:bg-accent data-[selected]:bg-primary data-[hovered]:text-foreground data-[selected]:text-primary-foreground data-[unavailable]:line-through data-[disabled]:opacity-30 data-[unavailable]:opacity-30 data-[focus-visible]:outline data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring/70 data-[invalid]:data-[selected]:[&:not([data-hover])]:bg-destructive data-[invalid]:data-[selected]:[&:not([data-hover])]:text-destructive-foreground",
                                            date.compare(now) === 0 &&
                                            "after:pointer-events-none after:absolute after:bottom-1 after:start-1/2 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-primary data-[selected]:after:bg-background",
                                        )}
                                    />
                                )}
                            </CalendarGridBody>
                        </CalendarGrid>
                    </Calendar>
                </Dialog>
            </Popover>

        </DatePicker>
    );
}

