import { TouchableOpacity, View, Image } from "react-native";
import { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";

import { Icon, Badge } from "react-native-elements";
import { theme, shadow } from "../core/theme";

/** Header component for Image and IconBadge
 * @param onPress What to do when the component is clicked
 * @param iconColor Color of icon to display
 * @param image Boolean to select image or icon
 * @param source source of image
 * @param badgeValue Value of badge to display on icon
 * */

export default function HeaderIcon({
  onPress,
  iconColor,
  image,
  source,
  badgeValue,
  containerStyle,
  randomString,
}) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        // borderWidth: !image ? 0.5 : 0,
        width: wp(12.16),
        height: hp(7.39),
        borderRadius: wp(2.67),
        ...shadow,
        ...containerStyle,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: wp(12.16),
            height: hp(7.39),
            borderRadius: wp(2.67),
          }}
        >
          {image ? (
            // <FastImage
            //   style={{
            //     resizeMode: "cover",
            //     height: "100%",
            //     width: "100%",
            //     borderRadius: wp(2.67),
            //   }}
            //   source={{
            //     uri: source + "?" + randomString,
            //     priority: FastImage.priority.high,
            //   }}
            //   resizeMode={FastImage.resizeMode.cover}
            // />
            <Image
              source={{
                uri: source + "?" + randomString,
              }}
              style={{
                resizeMode: "cover",
                height: "100%",
                width: "100%",
                borderRadius: wp(2.67),
              }}
            />
          ) : (
            <>
              {badgeValue > 0 && (
                <Badge
                  value={badgeValue}
                  badgeStyle={{
                    backgroundColor: theme.colors.error,
                    marginTop: hp(-2.3),
                  }}
                  containerStyle={{
                    alignSelf: "flex-end",
                    position: "absolute",
                    zIndex: 99,
                  }}
                />
              )}
              <Icon
                name={"bell"}
                type={"font-awesome-5"}
                size={wp(5.5)}
                solid
                color={iconColor}
              />
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
