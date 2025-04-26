<template>
  <div class="container">
    <div class="matches-header">
      <h1>Mes matchs</h1>
      <button @click="goToNewMatch" class="btn primary">
        <i class="fas fa-plus"></i> Ajouter un match
      </button>
    </div>
    
    <div v-if="loading" class="loading">
      <Loader />
    </div>
    
    <div v-else-if="matches.length === 0" class="empty-state">
      <p>Aucun match enregistré</p>
      <button @click="goToNewMatch" class="btn primary">
        Créer mon premier match
      </button>
    </div>
    
    <ul v-else class="matches-list">
      <MatchCard
        v-for="match in matches"
        :key="match.id"
        :match="match"
        :canDelete="true"
        @delete="deleteMatchHandler"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMyMatches, deleteMatch } from '../api/matches';
import { useAuth } from '../composables/useAuth';
import MatchCard from '../components/MatchCard.vue';
import Loader from '../components/Loader.vue'; // <= Import Loader ici
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
