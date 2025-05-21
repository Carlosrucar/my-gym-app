import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Avatar, Card, Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Foto y nombre */}
      <View style={styles.header}>
        <Avatar.Icon size={120} icon="account" style={styles.avatar} />
        <TouchableOpacity style={styles.changePhotoBtn}>
          <Icon name="camera" size={20} color="#ffa500" />
          <Text style={styles.changePhotoText}>Cambiar foto</Text>
        </TouchableOpacity>
        <Text style={styles.userName}>Juan Pérez</Text>
        <Text style={styles.userEmail}>juan.perez@example.com</Text>
      </View>

      {/* Información personal */}
      <Card style={styles.card}>
        <Card.Title title="Información Personal" titleStyle={styles.cardTitle} />
        <Card.Content>
          <View style={styles.infoRow}>
            <Icon name="phone" size={20} color="#ffa500" />
            <Text style={styles.infoText}>+34 612 345 678</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoRow}>
            <Icon name="calendar" size={20} color="#ffa500" />
            <Text style={styles.infoText}>Fecha de nacimiento: 01/01/1990</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoRow}>
            <Icon name="map-marker" size={20} color="#ffa500" />
            <Text style={styles.infoText}>Madrid, España</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Estadísticas resumen */}
      <Card style={styles.card}>
        <Card.Title title="Estadísticas" titleStyle={styles.cardTitle} />
        <Card.Content style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Icon name="dumbbell" size={28} color="#ffa500" />
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Entrenamientos</Text>
          </View>
          <View style={styles.statBox}>
            <Icon name="fire" size={28} color="#ffa500" />
            <Text style={styles.statNumber}>12500</Text>
            <Text style={styles.statLabel}>Calorías quemadas</Text>
          </View>
          <View style={styles.statBox}>
            <Icon name="clock-outline" size={28} color="#ffa500" />
            <Text style={styles.statNumber}>32h</Text>
            <Text style={styles.statLabel}>Tiempo total</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Acciones */}
      <Card style={styles.card}>
        <Card.Content style={styles.actionsContainer}>
          <Button
            mode="contained-tonal"
            icon="account-edit"
            onPress={() => console.log('Editar perfil')}
            buttonColor="#fff3e0"
            textColor="#ffa500"
            style={styles.actionButton}
            labelStyle={{ fontWeight: 'bold' }}
          >
            Editar Perfil
          </Button>
          <Button
            mode="contained-tonal"
            icon="lock-reset"
            onPress={() => console.log('Cambiar contraseña')}
            buttonColor="#fff3e0"
            textColor="#ffa500"
            style={styles.actionButton}
            labelStyle={{ fontWeight: 'bold' }}
          >
            Cambiar Contraseña
          </Button>
          <Button
            mode="contained-tonal"
            icon="logout"
            onPress={() => console.log('Cerrar sesión')}
            buttonColor="#fff3e0"
            textColor="#ffa500"
            style={styles.actionButton}
            labelStyle={{ fontWeight: 'bold' }}
          >
            Cerrar Sesión
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
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    backgroundColor: '#ddd',
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  changePhotoText: {
    marginLeft: 6,
    color: '#ffa500',
    fontWeight: '600',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    color: 'black',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  card: {
    marginBottom: 20,
    borderRadius: 0,
    backgroundColor: 'white',
    elevation: 3,
  },
  cardTitle: {
    color: '#ffa500',
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: 'black',
  },
  divider: {
    height: 1,
    backgroundColor: '#ffd699',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    marginVertical: 6,
    borderRadius: 0,
  },
});
