import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const GuidelineBaseWidth = 390;

export const horizontalScale = (size:number, floor = true, setMax = false) => 
{
    let result = width / GuidelineBaseWidth * size;
    let newSize = floor ? Math.floor(result) : result;
    return setMax && newSize > size ? size : newSize;
};
