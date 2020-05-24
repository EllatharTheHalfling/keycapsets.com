import React, { useContext, useState, useEffect } from 'react';
import { Brand, Profile, Material, Context } from 'typings';
import {
    AVAILABILITY_FILTER,
    AVAILABILITY_OPTIONS,
    PROFILE_OPTIONS,
    MATERIAL_OPTIONS,
    BRAND_OPTIONS,
} from '../../constants';
import context from '../../context';
import MultiSelect from '../Multiselect';
import Select from '../Select';
import Tab from './Tab';
import Arrow from '../Arrow';
import Link from 'next/link';
import ButtonLink from '../ButtonLink';

interface FiltersProps {}

function Filters(props: FiltersProps): JSX.Element {
    const {} = props;
    const { state, dispatch } = useContext<Context>(context);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(function handleToggleOnWindowSize() {
        const isBrowser = typeof window !== `undefined`;
        if (isBrowser) {
            if (window.innerWidth > 562) {
                setIsOpen(true);
            }
        }
    }, []);

    function resetFilter() {
        dispatch({
            type: 'set',
            payload: {
                filters: {
                    ...state.filters,
                    availabilityFilter: 'none',
                    brandFilter: [],
                },
            },
        });
    }

    // TODO: This needs refactoring...
    function handleBrandFilter(values: Brand[]) {
        dispatch({
            type: 'set',
            payload: {
                filters: {
                    ...state.filters,
                    brandFilter: values.map((b: Brand) => b.value),
                },
            },
        });
    }
    function handleProfileFilter(values: Profile[]) {
        dispatch({
            type: 'set',
            payload: {
                filters: {
                    ...state.filters,
                    profileFilter: values.map((b: Profile) => b.value),
                },
            },
        });
    }
    function handleMaterialFilter(values: Material[]) {
        dispatch({
            type: 'set',
            payload: {
                filters: {
                    ...state.filters,
                    materialFilter: values.map((b: Material) => b.value),
                },
            },
        });
    }

    function getLabelByAvailability(tab: string): string {
        const labelOptions: any = {
            ic: 'Interest Check',
            gb: 'In Groupbuy',
            waiting: 'Awaiting Groupbuy',
            ended: 'Groupbuy Ended',
        };
        return labelOptions[tab];
    }

    return (
        <>
            <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                <h5>{isOpen ? 'Close ' : 'Open '}search filters</h5>
                <Arrow color="#566073" size={16} direction={isOpen ? 'top' : 'bottom'} />
            </div>
            <div className={`filters ${isOpen ? 'open' : 'closed'}`}>
                <div className="left-side">
                    <div className="filter availability desktop-only">
                        <label className="label">Availability</label>
                        <div className="tabs">
                            {AVAILABILITY_OPTIONS.map((tab: string, idx: number) => (
                                <Tab
                                    label={getLabelByAvailability(tab)}
                                    type={AVAILABILITY_FILTER}
                                    id={tab}
                                    key={idx}
                                />
                            ))}
                            <div>
                                {state.filters.availabilityFilter !== 'none' && (
                                    <p className="small light clickable" onClick={resetFilter} style={{ marginTop: 8 }}>
                                        reset
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="filter availability mobile-only">
                        <Select
                            label="Availability"
                            name="Choose availability"
                            onSelectChange={(selectedFilterValue) =>
                                dispatch({
                                    type: 'set',
                                    payload: {
                                        filters: {
                                            ...state.filters,
                                            availabilityFilter: selectedFilterValue,
                                        },
                                    },
                                })
                            }
                            values={AVAILABILITY_OPTIONS.map((t) => ({
                                id: t,
                                name: getLabelByAvailability(t),
                            }))}
                        />
                    </div>

                    <div className="filter brand">
                        <MultiSelect isMulti label="Brand" options={BRAND_OPTIONS} onChange={handleBrandFilter} />
                    </div>

                    <div className="filter profile">
                        <MultiSelect isMulti label="Profile" options={PROFILE_OPTIONS} onChange={handleProfileFilter} />
                    </div>

                    <div className="filter material">
                        <MultiSelect
                            isMulti
                            label="Material"
                            options={MATERIAL_OPTIONS}
                            onChange={handleMaterialFilter}
                        />
                    </div>

                    <div className="filter favorites">
                        <ButtonLink href="/user">My favorites</ButtonLink>
                    </div>
                </div>

                <div className="counter">
                    <label className="label">Keycapsets:</label>
                    <p className="light">
                        {state.fetchedKeycapsetsLength}/{state.allKeycapsetsCount}
                    </p>
                </div>
            </div>
        </>
    );
}

export default Filters;
