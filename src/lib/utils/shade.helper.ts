import { Contrast, ContrastPropreties } from "src/types/shade";
import { ratio } from "wcag-color";
import { wcagContrastChecker } from "@mdhnpm/wcag-contrast-checker";
import { ColorRGB } from "src/types/color";
import { clamp } from "./utils";



export function checkContrast(target: string): Contrast {

    function calculate(target: string, comparator: string): ContrastPropreties {
        const { largeText, regularText } = wcagContrastChecker(target, comparator);
        return {
            ratio: ratio(target, comparator),
            large: largeText.aaa ? 'AAA' : largeText.aa ? 'AA' : undefined,
            regular: regularText.aaa ? 'AAA' : regularText.aa ? 'AA' : undefined
        };
    };


    return {
        black: calculate(target, "#000000"),
        white: calculate(target, "#FFFFFF")
    };
}



export function convertTemperature(tmpKelvin: number): ColorRGB {
    //src: https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html
    // All calculations require tmpKelvin \ 100, so only do the conversion once
    tmpKelvin = clamp(1000, tmpKelvin, 40000) / 100;

    // Note: The R-squared values for each approximation follow each calculation
    return {
        r: tmpKelvin <= 66 ? 255 / 255 :
            clamp(329.698727446 * (Math.pow(tmpKelvin - 60, -0.1332047592)), 0, 255) / 255,  // .988

        g: tmpKelvin <= 66 ?
            clamp(99.4708025861 * Math.log(tmpKelvin) - 161.1195681661, 0, 255) / 255 :      // .996
            clamp(288.1221695283 * (Math.pow(tmpKelvin - 60, -0.0755148492)), 0, 255) / 255, // .987

        b: tmpKelvin >= 66 ? 255 / 255 :
            tmpKelvin <= 19 ? 0 :
                clamp(138.5177312231 * Math.log(tmpKelvin - 10) - 305.0447927307, 0, 255) / 255 // .998
    };
}