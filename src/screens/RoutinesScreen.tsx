import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { Chip, Button, Searchbar, Portal, Modal, Surface, ProgressBar, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  WorkoutDetail: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const routines = [
  {
    id: '1',
    name: 'Full Body',
    difficulty: 'Intermedio',
    duration: '60 min',
    frequency: '3 veces/semana',
    calories: '400-500 kcal',
    muscles: ['Pecho', 'Espalda', 'Piernas'],
    adherence: 0.7,
    image: require('../../assets/workout.webp'),
  },
  {
    id: '2',
    name: 'Push Pull Legs',
    difficulty: 'Avanzado',
    duration: '75 min',
    frequency: '6 veces/semana',
    calories: '500-600 kcal',
    muscles: ['Pecho', 'Hombros', 'Piernas'],
    adherence: 0.85,
    image: require('../../assets/workout.webp'),
  },
];

export default function RoutinesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const filteredRoutines = routines.filter(routine =>
    routine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openRoutineDetails = (routine: typeof routines[0]) => {
    setSelectedRoutine(routine);
  };

  const closeRoutineDetails = () => {
    setSelectedRoutine(null);
  };

  const renderRoutineCard = (routine: typeof routines[0]) => (
    <Surface style={styles.routineCard} key={routine.id} elevation={3}>
      <Image source={routine.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.routineTitle}>{routine.name}</Text>
        <View style={styles.chipContainer}>
          <Chip
            icon={() => <Icon name="clock" size={16} color="black" />}
            style={styles.chip}
            textStyle={{ color: 'black' }}
          >
            {routine.duration}
          </Chip>
          <Chip
            icon={() => <Icon name="arm-flex" size={16} color="black" />}
            style={styles.chip}
            textStyle={{ color: 'black' }}
          >
            {routine.difficulty}
          </Chip>
          <Chip
            icon={() => <Icon name="calendar" size={16} color="black" />}
            style={styles.chip}
            textStyle={{ color: 'black' }}
          >
            {routine.frequency}
          </Chip>
        </View>

        <Text style={styles.adherenceLabel}>Adherencia semanal</Text>
        <ProgressBar progress={routine.adherence} color="#ff8c00" style={styles.progressBar} />

        <View style={styles.muscleContainer}>
          {routine.muscles.map((muscle, index) => (
            <Chip key={index} style={styles.muscleChip} textStyle={styles.muscleChipText}>
              {muscle}
            </Chip>
          ))}
        </View>
      </View>

      <View style={styles.cardActions}>
        <Button
          mode="contained"
          onPress={() => openRoutineDetails(routine)}
          style={styles.detailsButton}
          labelStyle={{ color: 'black', fontWeight: 'bold' }}
        >
          Ver detalles
        </Button>
      </View>
    </Surface>
  );

  return (
    <View style={styles.container}>
      {/* Header fijo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rutinas</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="account-circle" size={36} color="#ffa500" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
        <Searchbar
          placeholder="Buscar rutinas"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={{ color: 'black' }}
          iconColor="black"
        />

        <Text style={styles.sectionTitle}>Rutinas Disponibles</Text>
        {filteredRoutines.map(renderRoutineCard)}

        <Text style={styles.sectionTitle}>Objetivos Semanales</Text>
        <View style={styles.objectivesContainer}>
          {[
            'Completar 4 entrenamientos esta semana',
            'Mejorar técnica en sentadillas',
            'Aumentar resistencia cardiovascular'
          ].map((objective, idx) => (
            <Surface key={idx} style={styles.objectiveCard} elevation={2}>
              <View style={styles.objectiveContent}>
                <Icon name="target" size={24} color="#ff8c00" />
                <Text style={styles.objectiveText}>{objective}</Text>
              </View>
            </Surface>
          ))}
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={!!selectedRoutine}
          onDismiss={closeRoutineDetails}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedRoutine && (
            <Surface style={styles.modalSurface} elevation={3}>
              <Text style={styles.modalTitle}>{selectedRoutine.name}</Text>

              <View style={styles.modalInfoRow}>
                <Icon name="calendar-clock" size={24} color="#666" />
                <Text style={styles.modalInfoText}>Frecuencia: {selectedRoutine.frequency}</Text>
              </View>

              <View style={styles.modalInfoRow}>
                <Icon name="fire" size={24} color="#666" />
                <Text style={styles.modalInfoText}>Calorías: {selectedRoutine.calories}</Text>
              </View>

              <Text style={styles.sectionTitle}>Grupos musculares</Text>
              <View style={styles.muscleContainer}>
                {selectedRoutine.muscles.map((muscle, index) => (
                  <Chip key={index} style={styles.muscleChip} textStyle={styles.muscleChipText}>
                    {muscle}
                  </Chip>
                ))}
              </View>

              <Button
                mode="contained"
                onPress={() => {
                  closeRoutineDetails();
                }}
                style={styles.modalButton}
                labelStyle={{ color: 'black', fontWeight: 'bold' }}
              >
                Comenzar rutina
              </Button>
            </Surface>
          )}
        </Modal>
      </Portal>

      <FAB icon="plus" style={styles.fab} onPress={() => console.log('Crear nueva rutina')} />
    </View>
  );
}

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
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
  scrollView: {
    flex: 1,
  },
  searchbar: {
    margin: 16,
    backgroundColor: '#ffa500',
    borderRadius: 0,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    color: 'black',
  },
  routineCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 0,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 0,
  },
  cardContent: {
    padding: 16,
  },
  routineTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5dc',
    borderRadius: 4,
  },
  muscleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  muscleChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5dc',
    borderRadius: 4,
  },
  muscleChipText: {
    fontSize: 12,
    color: 'black',
  },
  adherenceLabel: {
    fontWeight: '600',
    color: 'black',
    marginTop: 8,
    marginBottom: 4,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  detailsButton: {
    backgroundColor: '#f5f5dc',
    borderRadius: 0,
  },
  objectivesContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  objectiveCard: {
    marginBottom: 12,
    backgroundColor: '#fff8e1',
    borderRadius: 8,
    padding: 12,
  },
  objectiveContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  objectiveText: {
    marginLeft: 12,
    fontSize: 16,
    color: 'black',
    flexShrink: 1,
  },
  modalContainer: {
    marginHorizontal: 20,
    marginVertical: 40,
  },
  modalSurface: {
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 0,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  modalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  modalInfoText: {
    marginLeft: 12,
    fontSize: 16,
    color: 'black',
  },
  modalButton: {
    marginTop: 24,
    backgroundColor: '#ffa500',
    borderRadius: 0,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffa500',
  },
});
