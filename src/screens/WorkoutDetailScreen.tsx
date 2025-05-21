import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Card, Surface, List, Divider, Button, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  GymMap: undefined;
  WorkoutDetail: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const WorkoutDetailScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const exercises = [
    {
      name: 'Sentadillas',
      sets: '4 series',
      reps: '12 repeticiones',
      rest: '90 seg',
      icon: 'weight-lifter',
      muscles: 'Piernas, Glúteos',
    },
    {
      name: 'Press de Banca',
      sets: '4 series',
      reps: '10 repeticiones',
      rest: '90 seg',
      icon: 'dumbbell',
      muscles: 'Pecho, Tríceps',
    },
    {
      name: 'Peso Muerto',
      sets: '3 series',
      reps: '8 repeticiones',
      rest: '120 seg',
      icon: 'weight',
      muscles: 'Espalda, Piernas',
    },
    {
      name: 'Dominadas',
      sets: '3 series',
      reps: 'Máximas',
      rest: '90 seg',
      icon: 'arm-flex',
      muscles: 'Espalda, Bíceps',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header fijo */}
      <View style={styles.header}>

        <Text style={styles.headerTitle}>Detalles</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.rightIcon}>
          <Icon name="account-circle" size={36} color="#ffa500" />
        </TouchableOpacity>
      </View>

      {/* Contenido Scrollable */}
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header Card */}
        <Card style={styles.headerCard} elevation={3}>
          <Card.Cover source={require('../../assets/workout.webp')} style={{ borderRadius: 0 }} />
          <Card.Content style={styles.headerContent}>
            <Text variant="headlineMedium" style={styles.headerTitleText}>Full Body</Text>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Icon name="clock-outline" size={24} color="#ffa500" />
                <Text style={styles.statValue}>60 min</Text>
              </View>
              <View style={styles.stat}>
                <Icon name="fire" size={24} color="#ffa500" />
                <Text style={styles.statValue}>350 kcal</Text>
              </View>
              <View style={styles.stat}>
                <Icon name="weight-lifter" size={24} color="#ffa500" />
                <Text style={styles.statValue}>Intermedio</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Exercises List */}
        <Surface style={styles.exercisesList} elevation={2}>
          <Text style={styles.sectionTitle}>Ejercicios</Text>
          {exercises.map((exercise, index) => (
            <React.Fragment key={index}>
              <List.Item
                titleStyle={styles.exerciseTitle}
                descriptionStyle={styles.exerciseDescription}
                title={exercise.name}
                description={exercise.muscles}
                left={props => <List.Icon {...props} icon={exercise.icon} color="#ffa500" />}
                right={props => (
                  <View style={styles.exerciseDetails}>
                    <Text style={styles.exerciseText}>{exercise.sets}</Text>
                    <Text style={styles.exerciseText}>{exercise.reps}</Text>
                    <IconButton {...props} icon="information" color="#ffa500" onPress={() => {}} />
                  </View>
                )}
              />
              {index < exercises.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Surface>

        {/* Instructions */}
        <Surface style={styles.instructions} elevation={2}>
          <Text style={styles.sectionTitle}>Instrucciones</Text>
          <List.Item
            title="Calentamiento"
            description="5-10 minutos de cardio ligero"
            titleStyle={styles.instructionTitle}
            descriptionStyle={styles.instructionDescription}
            left={props => <List.Icon {...props} icon="run" color="#ffa500" />}
          />
          <Divider />
          <List.Item
            title="Descanso entre ejercicios"
            description="60-90 segundos"
            titleStyle={styles.instructionTitle}
            descriptionStyle={styles.instructionDescription}
            left={props => <List.Icon {...props} icon="clock-outline" color="#ffa500" />}
          />
          <Divider />
          <List.Item
            title="Hidratación"
            description="Bebe agua entre series"
            titleStyle={styles.instructionTitle}
            descriptionStyle={styles.instructionDescription}
            left={props => <List.Icon {...props} icon="water" color="#ffa500" />}
          />
        </Surface>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            icon="play"
            onPress={() => navigation.navigate('GymMap')}
            style={styles.startButton}
            labelStyle={styles.startButtonLabel}
          >
            Comenzar Entrenamiento
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5dc',
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  leftIcon: {
    width: 40,
    justifyContent: 'center',
  },
  rightIcon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 0,
  },
  headerContent: {
    paddingVertical: 16,
  },
  headerTitleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    marginTop: 6,
    fontSize: 16,
    color: 'black',
  },
  exercisesList: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: 'white',
    borderRadius: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    color: 'black',
  },
  exerciseTitle: {
    color: 'black',
    fontWeight: '600',
  },
  exerciseDescription: {
    color: 'black',
  },
  exerciseDetails: {
    alignItems: 'flex-end',
  },
  exerciseText: {
    color: 'black',
  },
  instructions: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 0,
  },
  instructionTitle: {
    color: 'black',
    fontWeight: '600',
  },
  instructionDescription: {
    color: 'black',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#ffa500',
    borderRadius: 0,
    paddingVertical: 8,
  },
  startButtonLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default WorkoutDetailScreen;
