import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Chip, Button, Searchbar, Portal, Modal, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const classes = [
  {
    id: '1', name: 'Yoga', instructor: 'Ana García', time: '10:00', duration: '60 min', room: 'Sala 1',
    capacity: 20, available: 8, level: 'Todos los niveles', calories: '150-200 kcal'
  },
  {
    id: '2', name: 'CrossFit', instructor: 'Carlos Ruiz', time: '11:30', duration: '45 min', room: 'Sala CrossFit',
    capacity: 15, available: 5, level: 'Intermedio', calories: '400-600 kcal'
  },
  {
    id: '3', name: 'Zumba', instructor: 'Laura Martínez', time: '12:30', duration: '60 min', room: 'Sala 2',
    capacity: 25, available: 0, level: 'Principiante', calories: '300-400 kcal'
  },
  {
    id: '4', name: 'Pilates', instructor: 'Sofía López', time: '14:00', duration: '60 min', room: 'Sala 3',
    capacity: 20, available: 10, level: 'Todos los niveles', calories: '200-300 kcal'
  },
];

export default function ClassBookingScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [visible, setVisible] = useState(false);

  const showModal = (cls) => { setSelectedClass(cls); setVisible(true); };
  const hideModal = () => { setSelectedClass(null); setVisible(false); };
  const onChangeSearch = (query) => setSearchQuery(query);

  const filteredClasses = classes.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCard = (cls) => (
    <View style={styles.card} key={cls.id}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.className}>{cls.name}</Text>
          <Text style={styles.instructor}>{cls.instructor}</Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>{cls.time}</Text>
        </View>
      </View>
      <View style={styles.chipRow}>
        <Chip style={styles.chip} icon="clock-outline" textStyle={styles.chipText}>{cls.duration}</Chip>
        <Chip style={styles.chip} icon="account-group" textStyle={styles.chipText}>{cls.available}/{cls.capacity}</Chip>
        <Chip style={styles.chip} icon="room-service-outline" textStyle={styles.chipText}>{cls.room}</Chip>
      </View>
      <Button
        mode="contained"
        disabled={cls.available === 0}
        onPress={() => showModal(cls)}
        style={[styles.reserveButton, { backgroundColor: cls.available === 0 ? '#bbb' : '#FF8C00' }]}
        textColor={'#000'}>
        {cls.available === 0 ? 'Completo' : 'Reservar'}
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header fijo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clases</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="account-circle" size={36} color="#ffa500" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>

        <View style={styles.cardBox}>
          <Searchbar
            placeholder="Buscar clases o instructores"
            value={searchQuery}
            onChangeText={onChangeSearch}
            style={styles.searchbar}
            iconColor="#FF8C00"
            inputStyle={{ color: '#000' }}
            placeholderTextColor="#000"
          />
        </View>

        <View style={styles.cardBoxAlt}>
          <Text style={styles.sectionTitle}>Filtros</Text>
          <View style={styles.filterRow}>
            <Chip selected style={styles.filterChip} textStyle={{ color: '#000' }}>Hoy</Chip>
            <Chip style={styles.filterChip} textStyle={{ color: '#000' }}>Mañana</Chip>
            <Chip style={styles.filterChip} textStyle={{ color: '#000' }}>Esta semana</Chip>
          </View>
        </View>

        <View style={styles.cardBoxGray}>
          <Text style={styles.sectionTitle}>Clases disponibles</Text>
          {filteredClasses.map(renderCard)}
        </View>

        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
            {selectedClass && (
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedClass.name}</Text>
                <Divider style={styles.divider} />
                <Text style={styles.modalText}><Icon name="account" size={16} /> Instructor: {selectedClass.instructor}</Text>
                <Text style={styles.modalText}><Icon name="clock-outline" size={16} /> Horario: {selectedClass.time} ({selectedClass.duration})</Text>
                <Text style={styles.modalText}><Icon name="fire" size={16} /> Calorías: {selectedClass.calories}</Text>
                <Text style={styles.modalText}><Icon name="stairs" size={16} /> Nivel: {selectedClass.level}</Text>
                <Text style={styles.modalText}><Icon name="account-group" size={16} /> Plazas: {selectedClass.available} / {selectedClass.capacity}</Text>
                <Divider style={styles.divider} />
                <Button onPress={hideModal} style={styles.modalBtn} textColor="#000">Cancelar</Button>
                <Button mode="contained" style={[styles.modalBtn, { backgroundColor: '#FF8C00' }]} onPress={() => hideModal()}>Confirmar Reserva</Button>
              </View>
            )}
          </Modal>
        </Portal>

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
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  cardBoxAlt: {
    backgroundColor: '#fff3e0',
    padding: 16,
    marginBottom: 16,
  },
  cardBoxGray: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 24,
  },
  searchbar: {
    backgroundColor: '#ffe0b2',
    borderRadius: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#FFCC80',
    borderRadius: 0,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  instructor: {
    fontSize: 14,
    color: '#000',
  },
  timeBox: {
    backgroundColor: '#BBDEFB',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  timeText: {
    fontWeight: '600',
    color: '#0D47A1',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 8,
  },
  chip: {
    backgroundColor: '#ffe0b2',
    marginRight: 8,
    borderRadius: 0,
  },
  chipText: {
    color: '#000',
  },
  reserveButton: {
    marginTop: 10,
    borderRadius: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 24,
    marginHorizontal: 16,
  },
  modalContent: {
    gap: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
  modalBtn: {
    marginTop: 8,
    borderRadius: 0,
  },
  divider: {
    marginVertical: 8,
  },
});
