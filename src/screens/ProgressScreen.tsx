import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, SegmentedButtons, Card, DataTable, Button, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProgressScreen() {
  const [timeRange, setTimeRange] = React.useState('week');

  const userStats = {
    totalWorkouts: 25,
    totalCalories: 3200,
    totalHours: 6.5,
    streak: 7
  };

  const workoutHistory = [
    { date: '2024-01-15', type: 'Full Body', duration: '60 min', calories: 450 },
    { date: '2024-01-14', type: 'Cardio', duration: '45 min', calories: 350 },
    { date: '2024-01-12', type: 'Piernas', duration: '50 min', calories: 400 },
  ];

  const personalRecords = [
    { exercise: 'Press Banca', weight: '80 kg', date: '2024-01-10', improvement: '+5kg' },
    { exercise: 'Sentadilla', weight: '100 kg', date: '2024-01-08', improvement: '+7.5kg' },
    { exercise: 'Peso Muerto', weight: '120 kg', date: '2024-01-15', improvement: '+10kg' },
  ];

  const achievements = [
    { title: '¡Primera semana completada!', description: 'Has completado tu primera semana de entrenamiento', icon: 'trophy', earned: true },
    { title: 'Maestro del peso', description: 'Has superado tu récord personal en press banca', icon: 'weight-lifter', earned: true },
    { title: 'Corredor constante', description: '5 sesiones de cardio completadas', icon: 'run', earned: false },
  ];

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.headerContainer}>
        <View style={styles.streakContainer}>
          <Icon name="fire" size={24} color="#FF4500" />
          <Text style={styles.streakText}>{userStats.streak} días seguidos</Text>
        </View>
      </Surface>

      <SegmentedButtons
        value={timeRange}
        onValueChange={setTimeRange}
        buttons={[
          { value: 'week', label: 'Semana' },
          { value: 'month', label: 'Mes' },
          { value: 'year', label: 'Año' },
        ]}
        style={styles.segmentedButtons}
        theme={{
          colors: {
            secondaryContainer: '#ffa500',
            onSecondaryContainer: 'black',
            primary: 'black',
            onSurface: 'black',
            outline: 'black'
          }
        }}
      />

      <Surface style={styles.statsContainer} elevation={4}>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Icon name="fire" size={28} color="#FF4500" />
            <Text style={styles.statValue}>{userStats.totalCalories}</Text>
            <Text style={styles.statLabel}>Calorías</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="clock-outline" size={28} color="#FF4500" />
            <Text style={styles.statValue}>{userStats.totalHours}h</Text>
            <Text style={styles.statLabel}>Tiempo Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Icon name="dumbbell" size={28} color="#FF4500" />
            <Text style={styles.statValue}>{userStats.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Entrenamientos</Text>
          </View>
        </View>
      </Surface>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Logros Desbloqueados</Text>
          <List.Section>
            {achievements.map((achievement, index) => (
              <List.Item
                key={index}
                title={achievement.title}
                description={achievement.description}
                left={props => (
                  <List.Icon 
                    {...props} 
                    icon={achievement.icon} 
                    color={achievement.earned ? "#FF4500" : "#808080"}
                  />
                )}
                titleStyle={[
                  styles.achievementTitle,
                  !achievement.earned && styles.achievementLocked
                ]}
                descriptionStyle={[
                  styles.achievementDescription,
                  !achievement.earned && styles.achievementLocked
                ]}
              />
            ))}
          </List.Section>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Récords Personales</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.dataHeader}>Ejercicio</DataTable.Title>
              <DataTable.Title numeric textStyle={styles.dataHeader}>Peso</DataTable.Title>
              <DataTable.Title numeric textStyle={styles.dataHeader}>Mejora</DataTable.Title>
            </DataTable.Header>

            {personalRecords.map((record, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{record.exercise}</DataTable.Cell>
                <DataTable.Cell numeric>{record.weight}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.improvement}>
                  {record.improvement}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Historial de Entrenamientos</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.dataHeader}>Fecha</DataTable.Title>
              <DataTable.Title textStyle={styles.dataHeader}>Tipo</DataTable.Title>
              <DataTable.Title numeric textStyle={styles.dataHeader}>Duración</DataTable.Title>
              <DataTable.Title numeric textStyle={styles.dataHeader}>Calorías</DataTable.Title>
            </DataTable.Header>

            {workoutHistory.map((workout, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{workout.date}</DataTable.Cell>
                <DataTable.Cell>{workout.type}</DataTable.Cell>
                <DataTable.Cell numeric>{workout.duration}</DataTable.Cell>
                <DataTable.Cell numeric>{workout.calories}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <Button 
            mode="contained"
            onPress={() => {}}
            style={styles.viewMoreButton}
            buttonColor="#FF4500"
            textColor="white"
          >
            Ver más
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5dc',
  },
  headerContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffa500',
    borderRadius: 8,
    elevation: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  segmentedButtons: {
    margin: 16,
    backgroundColor: '#f5f5dc',
  },
  statsContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffa500',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'black',
  },
  statLabel: {
    fontSize: 12,
    color: 'black',
    marginTop: 4,
  },
  card: {
    margin: 16,
    marginTop: 0,
    elevation: 4,
    backgroundColor: '#ffa500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  dataHeader: {
    color: 'black',
    fontWeight: 'bold',
  },
  viewMoreButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  achievementTitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  achievementDescription: {
    color: 'black',
  },
  achievementLocked: {
    color: '#808080',
  },
  improvement: {
    color: '#228B22',
  },
});