import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomSafeAreaView from "../Components/CustomSafeAreaView";
import CustomHeader from "../Components/CustomHeader";
import TitleContainer from "../Components/TitleContainer";
import api from "../services/api";
import Toast from "react-native-toast-message";

const Grades = () => {
  const { subjectId, subjectName } = useLocalSearchParams();

  const router = useRouter();
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [gradeTab, setGradeTab] = useState(false);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await api.get(`/api/subjects/${subjectId}/`);
      setGrades(response.data.grades);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching grades:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to load grades. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const fetchProf = async () => {
    return;
  };

  return (
    <CustomSafeAreaView>
      <ImageBackground
        source={require("../assets/Grades/bg.png")}
        style={styles.background}
      >
        <View style={styles.content}>
          <View className="flex items-center justify-center bg-[#F56E00] py-5 mt-0">
            <Text className="text-2xl font-bold text-white">
              Select the Grade
            </Text>
          </View>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#740000"
              style={styles.loader}
            />
          ) : (
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <TouchableOpacity
                onPress={() => setGradeTab(!gradeTab)}
                className="bg-white  w-64 h-16 flex items-center justify-center border border-white rounded-xl"
              >
                <Text className="text-[#F56E00] font-semibold text-2xl">
                  Select
                </Text>
              </TouchableOpacity>

              {gradeTab && (
                <ScrollView
                  className="bg-white border mt-5 rounded-lg border-white h-36"
                  showsVerticalScrollIndicator={false}
                >
                  {grades.map((grade) => (
                    <TouchableOpacity
                      key={grade.id}
                      className="bg-white border-b border-b-black/10 mb-2 w-64 h-16 flex items-center justify-center rounded-xl"
                      onPress={fetchProf}
                    >
                      <Text className="text-black font-semibold text-2xl">
                        {grade.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </ScrollView>
          )}
        </View>
      </ImageBackground>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  gradeCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    width: "35%",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#979292",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  gradeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Grades;
