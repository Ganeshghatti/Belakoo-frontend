import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, Modal } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import api from "../services/api";
import Toast from "react-native-toast-message";

const Content = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { chapterId, chapterTitle, level } = route.params;
  const [isDone, setIsDone] = useState(level.is_done);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleMarkDone = async () => {
    setShowPopup(true);
  };

  const confirmMarkDone = async () => {
    try {
      const endpoint = isDone ? 'mark-not-done' : 'mark-done';
      console.log(level.id,endpoint)
      await api.post(`/api/levels/${level.id}/${endpoint}/`);
      setIsDone(!isDone);

      setShowPopup(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: `Level marked as ${isDone ? 'not done' : 'done'}.`,
        position: "bottom",
      });
    } catch (error) {
      console.error("Error marking level:", error);
      setShowPopup(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update level status. Please try again.",
        position: "bottom",
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../assets/Content/bg.png")}
        style={styles.background}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{chapterTitle}</Text>
          <TouchableOpacity
            style={[styles.markButton, isDone && styles.markButtonDone]}
            onPress={handleMarkDone}
          >
            <Text style={styles.markButtonText}>
              {isDone ? "Mark as not done" : "Mark as done"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <WebView
            source={{ uri: level.pdflink }}
            style={styles.webview}
            scalesPageToFit={true}
          />
        </View>
      </View>

      <Modal
        transparent={true}
        visible={showPopup}
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>
              Are you sure you want to mark this level as {isDone ? 'not done' : 'done'}?
            </Text>
            <View style={styles.popupButtonContainer}>
              <TouchableOpacity
                style={[styles.popupButton, styles.cancelButton]}
                onPress={() => setShowPopup(false)}
              >
                <Text style={styles.popupButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.popupButton, styles.confirmButton]}
                onPress={confirmMarkDone}
              >
                <Text style={styles.popupButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: '#740000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#740000',
    flex: 1,
    textAlign: 'center',
  },
  markButton: {
    backgroundColor: "#740000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  markButtonDone: {
    backgroundColor: "#169331",
  },
  markButtonText: {
    color: "white",
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  popupText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  popupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  popupButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#808080',
  },
  confirmButton: {
    backgroundColor: '#740000',
  },
  popupButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Content;
