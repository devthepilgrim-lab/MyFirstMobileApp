import { Image } from 'expo-image';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaxContentWidth, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  // Holds the submitted info; null until the user presses Submit with valid input.
  const [submitted, setSubmitted] = useState<{ name: string; section: string } | null>(null);

  const showAlert = (title: string, message: string) => {
    // Alert.alert does nothing on web, fall back to window.alert.
    if (Platform.OS === 'web') {
      window.alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const trimmedSection = section.trim();

    if (!trimmedName || !trimmedSection) {
      setSubmitted(null);
      showAlert('Oops!', 'Please enter your name and section first.');
      return;
    }

    setSubmitted({ name: trimmedName, section: trimmedSection });
    showAlert('Hello!', `Your name is ${trimmedName}.`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My First Mobile App</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <View style={styles.body}>
            {/* Logo */}
            <Image
              source={require('@/assets/images/sample-logo.png')}
              style={styles.logo}
              contentFit="contain"
            />

            {/* Textboxes */}
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#8A8FA3"
              value={name}
              onChangeText={setName}
              returnKeyType="next"
            />

            <Text style={styles.inputLabel}>Section</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your section"
              placeholderTextColor="#8A8FA3"
              value={section}
              onChangeText={setSection}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />

            {/* Button */}
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>

            {/* Student information (only shown after a successful submit) */}
            {submitted && (
              <View style={styles.card}>
                <Text style={styles.cardLabel}>Student Information</Text>
                <Text style={styles.infoText}>Name: {submitted.name}</Text>
                <Text style={styles.infoText}>Section: {submitted.section}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>MOBPROG: Mobile Programming • Laboratory Activity 1</Text>
      </View>
    </SafeAreaView>
  );
}

const BLUE = '#353F8E';
const YELLOW = '#FFD60A';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: BLUE,
  },
  header: {
    backgroundColor: BLUE,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: YELLOW,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  body: {
    width: '100%',
    maxWidth: MaxContentWidth,
    padding: Spacing.four,
    gap: Spacing.two,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: Spacing.three,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1D2A',
    marginTop: Spacing.two,
  },
  input: {
    alignSelf: 'stretch',
    borderWidth: 1.5,
    borderColor: BLUE,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    fontSize: 16,
    color: '#1B1D2A',
    backgroundColor: '#FFFFFF',
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: BLUE,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
    marginTop: Spacing.three,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: '#F0F0F3',
    borderLeftWidth: 5,
    borderLeftColor: YELLOW,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
    marginTop: Spacing.three,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: BLUE,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoText: {
    fontSize: 16,
    color: '#1B1D2A',
  },
  footer: {
    backgroundColor: BLUE,
    borderTopWidth: 4,
    borderTopColor: YELLOW,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});