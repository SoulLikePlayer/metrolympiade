<template>
  <div class="container">
    <h1>Mes matchs</h1>
    <button @click="goToNewMatch" class="btn primary">Ajouter un match</button>
    
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="matches.length === 0" class="empty-state">Aucun match enregistré</div>
    <ul v-else class="matches-list">
      <li v-for="match in matches" :key="match.id" class="match-item">
        <div>
          <h3>{{ match.activity }} - {{ formatDate(match.startedAt) }}</h3>
          <p>{{ match.team1 }} {{ match.team1Score }} - {{ match.team2Score }} {{ match.team2 }}</p>
        </div>
        <button @click="deleteMatch(match.id)" class="btn danger">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMyMatches, deleteMatch } from '../api/matches';
import { useAuth } from '../composables/useAuth';

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
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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