<template>
  <div class="container">
    <div class="matches-header">
      <h1>Mes matchs</h1>
      <button @click="goToNewMatch" class="btn primary">
        <i class="fas fa-plus"></i> Ajouter un match
      </button>
    </div>
    
    <div v-if="loading" class="loading">Chargement...</div>
    
    <div v-else-if="matches.length === 0" class="empty-state">
      <p>Aucun match enregistré</p>
      <button @click="goToNewMatch" class="btn primary">
        Créer mon premier match
      </button>
    </div>
    
    <ul v-else class="matches-list">
      <li v-for="match in matches" :key="match.id" class="match-item">
        <div class="match-info">
          <h3>
            <i class="sport-icon fas fa-trophy"></i>
            {{ match.activity }}
          </h3>
          <p class="match-date">{{ formatDate(match.startedAt) }}</p>
          <p class="match-score"> {{ match.team1 }} - {{ match.team1Score }} : {{ match.team2Score }} - {{ match.team2 }}
          </p>
        </div>
        <div class="match-actions">
          <button @click="deleteMatchHandler(match.id)" class="btn danger">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMyMatches, deleteMatch } from '../api/matches';
import { useAuth } from '../composables/useAuth';
import '../assets/style/GamesView.css';

const { user } = useAuth();
const router = useRouter();
const matches = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    matches.value = await getMyMatches(user.value.token);
  } catch (error) {
    console.error('Error fetching matches:', error);
  } finally {
    loading.value = false;
  }
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long',
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const goToNewMatch = () => {
  router.push('/game');
};

const deleteMatchHandler = async (matchId) => {
  try {
    await deleteMatch(matchId, user.value.token);
    matches.value = matches.value.filter(match => match.id !== matchId);
  } catch (error) {
    console.error('Error deleting match:', error);
  }
};
</script>