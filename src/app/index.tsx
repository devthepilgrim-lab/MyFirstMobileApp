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

const STUDENT = {
  name: 'Ben Israel R. Seatriz',
  section: 'IT253',
};

type ActionButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: object;
};

function ActionButton({ title, onPress, variant = 'primary', style }: ActionButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'outline' && styles.buttonOutline,
        pressed && styles.buttonPressed,
        style,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          variant === 'secondary' && styles.buttonTextDark,
          variant === 'outline' && styles.buttonTextOutline,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

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

  const handleGreet = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      showAlert('Oops!', 'Please enter your name first.');
      return;
    }
    showAlert('Greetings!', `Hello, ${trimmedName}! Welcome to Mobile Programming.`);
  };

  const handleClear = () => {
    setName('');
    setSection('');
    setSubmitted(null);
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
          style={[styles.flex, styles.background]}
          contentContainerStyle={[styles.content, styles.background]}
          keyboardShouldPersistTaps="handled">
          {/* Banner image */}
          <Image
            source={require('@/assets/images/sample-banner.png')}
            style={styles.banner}
            contentFit="cover"
          />

          <View style={styles.body}>
            {/* Label 1: welcome heading */}
            <Text style={styles.welcomeText}>Welcome to My First Mobile App!</Text>

            {/* Logo */}
            <Image
              source={require('@/assets/images/sample-logo.png')}
              style={styles.logo}
              contentFit="contain"
            />

            {/* Label 2: instruction line */}
            <Text style={styles.instructionText}>Enter your details below</Text>

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

            {/* Buttons */}
            <ActionButton title="Submit" onPress={handleSubmit} style={styles.submitButton} />
            <View style={styles.buttonRow}>
              <ActionButton
                title="Greet"
                variant="secondary"
                onPress={handleGreet}
                style={styles.rowButton}
              />
              <ActionButton
                title="Clear"
                variant="outline"
                onPress={handleClear}
                style={styles.rowButton}
              />
            </View>

            {/* Label 3: app description */}
            <Text style={styles.descriptionText}>
              Submit your details to see your student information, greet yourself, or clear the
              form to start over.
            </Text>

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
        <Text style={styles.footerName}>
          {STUDENT.name} • {STUDENT.section}
        </Text>
        <Text style={styles.footerText}>MOBPROG • Enhanced Version</Text>
      </View>
    </SafeAreaView>
  );
}

const BLUE = '#353F8E';
const YELLOW = '#FFD60A';
const BACKGROUND = '#E8EEFB';
const TEXT = '#1B1D2A';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: BLUE,
  },
  background: {
    backgroundColor: BACKGROUND,
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
  },
  banner: {
    width: '100%',
    height: 140,
  },
  body: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    padding: Spacing.four,
    gap: Spacing.two,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: BLUE,
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginVertical: Spacing.two,
  },
  instructionText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: TEXT,
    textAlign: 'center',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    color: TEXT,
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
    color: TEXT,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: BLUE,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: BLUE,
  },
  buttonSecondary: {
    backgroundColor: YELLOW,
    borderColor: YELLOW,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonTextDark: {
    color: TEXT,
  },
  buttonTextOutline: {
    color: BLUE,
  },
  submitButton: {
    alignSelf: 'stretch',
    marginTop: Spacing.three,
  },
  buttonRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: Spacing.three,
  },
  rowButton: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 13,
    color: '#4A4F66',
    textAlign: 'center',
    marginTop: Spacing.two,
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
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
    color: TEXT,
  },
  footer: {
    backgroundColor: BLUE,
    borderTopWidth: 4,
    borderTopColor: YELLOW,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    gap: Spacing.one,
  },
  footerName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});