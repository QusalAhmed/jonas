// app/country/page.tsx
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Local
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import Country from "@/lib/features/country/Country";

// ShadCN UI components
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Redux
import { useDispatch } from "react-redux";
import { setCountry } from "@/lib/features/country/countrySlice";
import { useAppSelector } from "@/lib/hooks";
import type { RootState } from "@/lib/store";

interface CountryData {
    flags: {
        png: string;
        svg: string;
        alt: string;
    };
    name: {
        common: string;
        official: string;
        nativeName?: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    cca3: string;
}

function useDebouncedValue<T>(value: T, delay = 200) {
    const [debounced, setDebounced] = useState(value);
    React.useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

const App = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(useAppSelector((state: RootState) => state.country.country).countryName);
    const [search, setSearch] = useState('');
    const [countries, setCountries] = useState<CountryData[] | null>(null);

    const isOnline = useOnlineStatus();

    useEffect(() => {
        axios.get<CountryData[]>('https://restcountries.com/v3.1/all?fields=name,flags,cca3')
            .then((response) => {
                const sorted = response.data.sort((a, b) => {
                    return a.cca3 === 'BGD' ? -1 : b.cca3 === 'BGD' ? 1 : a.name.common.localeCompare(b.name.common);
                });
                setCountries(sorted);
            }).catch(() => setCountries(null));
    }, []);

    const debouncedSearch = useDebouncedValue(search, 200);

    const filtered = useMemo(() => {
        if (!countries) return [];
        const q = debouncedSearch.trim().toLowerCase();
        if (!q) return countries;
        return countries.filter((c) => c.name.common.toLowerCase().includes(q));
    }, [countries, debouncedSearch]);

    const Row = ({index, style}: ListChildComponentProps) => {
        const country = filtered[index];
        const selected = value === country.name.common;
        const dispatch = useDispatch();

        return (
            <div style={style}>
                <CommandItem
                    key={country.cca3}
                    value={country.name.common}
                    onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                        dispatch(setCountry(country.name.common));
                    }}
                    className="px-2"
                >
                    <Image
                        src={country.flags.svg}
                        alt={country.flags?.alt || `${country.name.common} flag`}
                        width={24}
                        height={24}
                        loading="lazy"
                        sizes="24px"
                        className="mr-2 flex-shrink-0 w-6 h-6"
                    />
                    <span>{country.name.common}</span>
                    <Check className={cn('ml-auto', selected ? 'opacity-100' : 'opacity-0')}/>
                </CommandItem>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center p-2">
            <Country/>
            <div className="font-semibold text-green-500">{isOnline ? "Online" : "Loading..."}</div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[240px] justify-between text-fuchsia-600 whitespace-pre-wrap p-6 ring-1 ring-inset ring-fuchsia-300"
                    >
                        {value || 'Select country...'}
                        <ChevronsUpDown className="opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder="Search country..."
                            className="h-9"
                            value={search}
                            onValueChange={setSearch}
                        />
                        {filtered.length === 0 ? <CommandEmpty>No country found.</CommandEmpty> : null}
                        <CommandList className="max-h-none p-0">
                            <CommandGroup heading={undefined} className="p-0">
                                <List
                                    height={300}
                                    width="100%"
                                    itemCount={filtered.length}
                                    itemSize={44}
                                    overscanCount={6}
                                >
                                    {Row}
                                </List>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default App;