import React, { FC } from "react";
import {
  Image,
  ImageBackground,
  ImageStyle,
  View,
  ViewStyle,
} from "react-native";

import { Button, Text } from "../components";
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle";
import { Link } from "expo-router";

const welcomeBackground = require("../../assets/images/welcome-background.png");
const textDrink = require("../../assets/images/text-drink.png");

export default function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"]);
  const $topContainerInsets = useSafeAreaInsetsStyle(["top"]);

  return (
    <ImageBackground
      style={[$container, $bottomContainerInsets, $topContainerInsets]}
      source={welcomeBackground}
      resizeMode="cover"
    >
      <View className="flex py-12 px-8">
        <Text largeHeading styleClassName="mb-4">
          It's time for a
        </Text>
        <Image style={$image} source={textDrink} className="mb-4" />
        <Text body styleClassName="mb-5">
          Find amazing cocktail recipes for any occassion.
        </Text>
        <View className="flex flex-row">
          <Link href={"/"} asChild>
            <Button label={"Get started"} />
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const $container: ViewStyle = {
  flex: 1,
};

const $image: ImageStyle = {
  width: 110,
  height: 48,
};
