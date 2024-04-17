import { minidenticon } from "minidenticons";
import React, { ImgHTMLAttributes, useMemo } from "react";

interface IdentityIconProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  username: string;
  saturation?: string | number;
  lightness?: string | number;
}

const ProfileIcon: React.FC<IdentityIconProps> = ({
  username,
  saturation = 50,
  lightness = 50,
  ...props
}) => {
  const svgText = useMemo(
    () => minidenticon(username, saturation, lightness),
    [username, saturation, lightness]
  );
  return (
    <div
      style={{
        marginRight: "0.75rem",
      }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`}
        alt={username}
        {...props}
      />
    </div>
  );
};

export default ProfileIcon;
