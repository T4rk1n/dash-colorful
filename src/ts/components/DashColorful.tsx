import React, {useMemo, useCallback, memo} from 'react';
import {
    HslaColor,
    HslColor,
    HsvaColor,
    HsvColor,
    RgbaColor,
    RgbColor,
    HexColorPicker,
    RgbaColorPicker,
    RgbaStringColorPicker,
    HslColorPicker,
    HslStringColorPicker,
    RgbColorPicker,
    RgbStringColorPicker,
    HslaColorPicker,
    HslaStringColorPicker,
    HsvColorPicker,
    HsvaStringColorPicker,
    HsvaColorPicker,
    HsvStringColorPicker,
} from 'react-colorful';
import {AnyColor} from 'react-colorful/dist/types';

import {DashComponentProps} from '../props';
import {throttle} from "../utils";

import "./DashColorful.scss"

type DashColorfulProps = {
    /**
     * Current color value
     */
    value?: AnyColor;
    /**
     * Type of color
     */
    type?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva';
    /**
     * Add a toggle button to activate the color picker.
     */
    toggleable?: boolean;
    /**
     * Content of the toggle button.
     */
    toggle_button?: JSX.Element;
    /**
     * Close the color picker when a value is selected.
     */
    toggle_on_choose?: boolean;
    /**
     * Delay before closing the modal when the
     */
    toggle_on_choose_delay?: number;
    /**
     * Direction to open the color picker on toggle.
     */
    toggle_direction?:
        | 'top'
        | 'top-left'
        | 'top-right'
        | 'left'
        | 'right'
        | 'bottom'
        | 'bottom-left'
        | 'bottom-right';
    /**
     * Show the color picker.
     */
    active?: boolean;
    /**
     * Use a square with background color from the value as the toggle button.
     */
    toggle_button_color?: boolean;
    /**
     * The value will always be a string, usable directly in styles.
     *
     * ``toggle_button_color`` requires a string value or hex type.
     */
    as_string?: boolean;

    class_name?: string;
    style?: any;
} & DashComponentProps;


type PickerProps = Pick<DashColorfulProps, 'value' | 'type' | 'as_string'> & {
    onChange: (color: AnyColor) => void;
}


const RawPicker = (props: PickerProps) => {
    const { type, value, onChange, as_string } = props;
    switch (type) {
        case 'rgb':
            if (as_string) {
                return (
                    <RgbStringColorPicker
                        onChange={onChange}
                        color={value as string}
                    />
                );
            }
            return (
                <RgbColorPicker
                    onChange={onChange}
                    color={value as RgbColor}
                />
            );
        case 'rgba':
            if (as_string) {
                return (
                    <RgbaStringColorPicker
                        onChange={onChange}
                        color={value as string}
                    />
                );
            }
            return (
                <RgbaColorPicker
                    onChange={onChange}
                    color={value as RgbaColor}
                />
            );
        case 'hsl':
            if (as_string) {
                return (
                    <HslStringColorPicker
                        onChange={onChange}
                        color={value as string}
                    />
                );
            }
            return (
                <HslColorPicker
                    onChange={onChange}
                    color={value as HslColor}
                />
            );
        case 'hsla':
            if (as_string) {
                return (
                    <HslaStringColorPicker
                        onChange={onChange}
                        color={value as string}
                    />
                );
            }
            return (
                <HslaColorPicker
                    onChange={onChange}
                    color={value as HslaColor}
                />
            );
        case 'hsv':
            if (as_string) {
                return (
                    <HsvStringColorPicker
                        onChange={onChange}
                        color={value as string}
                    />
                );
            }
            return (
                <HsvColorPicker
                    onChange={onChange}
                    color={value as HsvColor}
                />
            );
        case 'hsva':
            if (as_string) {
                return (
                    <HsvaStringColorPicker
                        onChange={onChange}
                        color={value as string}
                    />
                );
            }
            return (
                <HsvaColorPicker
                    onChange={onChange}
                    color={value as HsvaColor}
                />
            );
        case 'hex':
        default:
            return (
                <HexColorPicker
                    onChange={onChange}
                    color={value as string}
                />
            );
    }
}

const Picker = memo(RawPicker);

/**
 * A color picker powered by react-colorful
 *
 * A toggle button is included or can be disabled with ``toggleable=False``.
 *
 * Common style aspects goes on the container of the picker, hidden by default.
 */
const DashColorful = (props: DashColorfulProps) => {
    const {
        id,
        class_name,
        style,
        type,
        toggleable,
        toggle_button,
        toggle_on_choose,
        toggle_on_choose_delay,
        toggle_button_color,
        toggle_direction,
        active,
        value,
        setProps,
        as_string,
    } = props;

    const className = useMemo(() => {
        const c = [class_name, 'dash-colorful'];
        if (active) {
            c.push('active');
        }
        return c.join(' ');
    }, [class_name, active]);

    const pickerClassName = useMemo(() => {
        const c = ['dash-color-picker'];
        if (toggle_direction) {
            c.push(`toggle-direction-${toggle_direction}`);
        }
        return c.join(' ');
    }, [toggle_direction])

    const closePicker = useCallback(() => setProps({active: false}), [])

    const onChange = useCallback((newColor) => {
        const payload: any = {value: newColor};
        if (toggle_on_choose) {
            throttle<void>(
                closePicker,
                toggle_on_choose_delay,
                true
            )
        }
        setProps(payload);
    }, [toggle_on_choose, toggle_on_choose_delay]);

    const toggleButton = useMemo(() => {
        if (toggle_button_color) {
            return (
                <div
                    className="toggle-button-color"
                    // @ts-ignore
                    style={{backgroundColor: value}}
                />
            );
        }
        return toggle_button || '🎨';
    }, [toggle_button, toggle_button_color, value]);

    const onToggle = useCallback(() => {
        setProps({active: !active});
    }, [active, setProps]);

    return (
        <div id={id} className={className}>
            {toggleable && (
                <div className="dash-color-picker-toggle" onClick={onToggle}>
                    {toggleButton}
                </div>
            )}
            <div style={style} className={pickerClassName}>
                <Picker
                    onChange={onChange}
                    as_string={as_string}
                    type={type}
                    value={value}
                />
            </div>
        </div>
    );
}

DashColorful.defaultProps = {
    type: 'hex',
    toggle_button_color: true,
    toggleable: true,
    toggle_on_choose: true,
    toggle_on_choose_delay: 2500,
    toggle_direction: 'top-left',
};

export default DashColorful;
