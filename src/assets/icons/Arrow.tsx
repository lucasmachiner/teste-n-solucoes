import Svg, { Path } from "react-native-svg"
import { theme } from "../../styles/theme"

interface ArrowIconProps {
  heigth?: string | number,
  width?: string | number,
  fill?: string
}

export const ArrowIcon = ({ heigth, width, fill }: ArrowIconProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill ?? theme.green}
      width={width ?? "24"}
      height={heigth ?? "24"}
    >
      <Path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
    </Svg>
  )
}