import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme, shadow, cardStyle } from "../core/theme";
import { fS } from "../core/fonts";
import { Icon, Badge } from "react-native-elements";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function Device({ onPress }) {
  const { t, i18n } = useTranslation();
  return (
    <View
      style={{
        width: wp(38.92),
        height: wp(38.92),
        backgroundColor: theme.colors.backgroundEmpty,
        borderRadius: wp(3.64),
        padding: wp(4),
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            backgroundColor: theme.colors.backgroundEmpty,
            padding: wp(4),
            borderRadius: 10,
          }}
        >
          <Icon
            name={"plus"}
            type={"font-awesome-5"}
            size={wp(8)}
            solid
            color={theme.colors.greyIconsDark}
          />
          <Text
            style={{
              fontSize: wp(3.7),
              fontFamily: fS().Regular,
              color: theme.colors.greyIconsDark,
            }}
          >
            {t("New Device")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
