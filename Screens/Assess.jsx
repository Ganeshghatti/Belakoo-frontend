import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import CustomSafeAreaView from "../Components/CustomSafeAreaView";
import { ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

import api from "../services/api";
import { useLocalSearchParams } from "expo-router";

const Assess = () => {
  const router = useRouter();

  const [assessData, setAssessData] = useState();
  const { lessonCode, lessonName } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLessonDetails();
  }, []);

  const fetchLessonDetails = async () => {
    try {
      const response = await api.get(
        `https://belakoo-backend.onrender.com/api/lessons/${lessonCode}/`
      );
      console.log(response.data);
      setAssessData(response.data.assess);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching lesson details:", error);
      console.log(lessonCode);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load chapters. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <View style={styles.content} className="">
        <ImageBackground
          source={require("../assets/Content/bg2.png")}
          style={styles.background}
        >
          <View className="flex items-center justify-center  bg-[#F56E00] py-5 mt-0">
            <Text className="text-2xl font-bold text-white">Assess</Text>
          </View>

          <ScrollView className="space-y-3 mt-4 h-[89%]">
            {assessData?.ASSESSMENT && (
              <View className="space-y-4 mx-4">
                <Text className="text-[#F56E00] font-bold text-xl">
                  Assessment
                </Text>
                <Text className="text-black font-medium text-lg">
                  {assessData?.ASSESSMENT}
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/principle",
                  params: {
                    lessonCode: lessonCode,
                    lessonName: lessonName,
                  },
                })
              }
              className="bg-[#F56E00] py-4  mx-3 flex border-[#F56E00] items-center justify-center border rounded-3xl"
            >
              <Text className="text-white font-bold text-xl">Finish</Text>
            </TouchableOpacity>
          </ScrollView>

          <View></View>
        </ImageBackground>
      </View>
    </CustomSafeAreaView>
  );
};

export default Assess;

const styles = StyleSheet.create({});