import React from 'react';
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* Header fijo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="account-circle" size={36} color="#ffa500" />
        </TouchableOpacity>
      </View>

      {/* Contenido scrollable */}
      <ScrollView style={styles.scrollContainer}>

        {/* Header Entrenamiento del día */}
        <View style={styles.cardBox}>
          <View style={styles.trainingBlock}>
            <Image source={require('../../assets/workout.webp')} style={styles.trainingImage} />
            <View style={styles.trainingInfo}>
              <Text style={styles.trainingTitle}>ENTRENAMIENTO DEL DÍA</Text>
              <Text style={styles.trainingSubtitle}>Full Body</Text>
              <View style={styles.trainingTags}>
                <Text style={styles.tag}>⏱ 60 min</Text>
                <Text style={styles.tag}>🔥 350 kcal</Text>
                <Text style={styles.tag}>🏋️ Intermedio</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('WorkoutDetail')}>
                <Text style={styles.trainingAction}>Ver detalles →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Acciones rápidas */}
        <View style={styles.cardBoxDark}>
          <Text style={styles.sectionTitle}>Accesos rápidos</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('ClassBooking')}>
              <Icon name="calendar" size={26} color="#FF6600" />
              <Text style={styles.actionText}>Reservar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Progress')}>
              <Icon name="chart-line" size={26} color="#FF6600" />
              <Text style={styles.actionText}>Progreso</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Routines')}>
              <Icon name="dumbbell" size={26} color="#FF6600" />
              <Text style={styles.actionText}>Rutinas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.cardBoxGray}>
          <Text style={styles.sectionTitle}>Estadísticas semanales</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Icon name="clock-outline" size={28} color="#FF6600" />
              <Text style={styles.statValue}>5.2h</Text>
              <Text style={styles.statLabel}>Tiempo</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="fire" size={28} color="#FF6600" />
              <Text style={styles.statValue}>2450</Text>
              <Text style={styles.statLabel}>Kcal</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="run" size={28} color="#FF6600" />
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Sesiones</Text>
            </View>
          </View>
        </View>

        {/* Clases */}
        <View style={styles.cardBoxAlt}>
          <Text style={styles.sectionTitle}>Clases disponibles</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.classScroll}>
            {['Yoga', 'CrossFit', 'Spinning', 'Boxeo', 'Pilates'].map((clase, i) => (
              <View key={i} style={styles.classCard}>
                <Image source={require('../../assets/class-placeholder.jpg')} style={styles.classImage} />
                <Text style={styles.className}>{clase}</Text>
                <Text style={styles.classTime}>Próxima clase: 14:00</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Nutrición */}
        <View style={styles.cardBox}>
          <Text style={styles.sectionTitle}>Nutrición</Text>
          <View style={styles.nutritionCard}>
            <Text style={styles.nutritionTitle}>Plan alimenticio personalizado</Text>
            <Text style={styles.nutritionDesc}>Alcanza tus objetivos con una dieta equilibrada</Text>
            <TouchableOpacity>
              <Text style={styles.trainingAction}>Ver plan →</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf0',
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
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  cardBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  cardBoxDark: {
    backgroundColor: '#fff3e0',
    padding: 20,
    marginBottom: 16,
  },
  cardBoxAlt: {
    backgroundColor: '#fff8dc',
    padding: 20,
    marginBottom: 16,
  },
  cardBoxGray: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 16,
  },
  trainingBlock: {
    flexDirection: 'row',
  },
  trainingImage: {
    width: 110,
    height: 110,
  },
  trainingInfo: {
    flex: 1,
    marginLeft: 16,
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  trainingSubtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  trainingTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  tag: {
    fontSize: 14,
    color: '#111',
    backgroundColor: '#ffe0b2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    borderRadius: 0,
  },
  trainingAction: {
    color: '#FF6600',
    fontSize: 14,
    marginTop: 10,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionBtn: {
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    marginTop: 6,
    fontSize: 14,
    color: '#111',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
    color: '#111',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  classScroll: {
    flexDirection: 'row',
  },
  classCard: {
    width: 130,
    marginRight: 16,
  },
  classImage: {
    width: '100%',
    height: 90,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    color: '#111',
  },
  classTime: {
    fontSize: 13,
    color: '#777',
  },
  nutritionCard: {
    backgroundColor: '#fffaf0',
    padding: 16,
    marginTop: 10,
  },
  nutritionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#111',
  },
  nutritionDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
});
