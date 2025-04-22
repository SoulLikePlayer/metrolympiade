<template>
  <div class="team-information container fade-in">
    <div v-if="loading" class="loading-state">Chargement des informations...</div>

    <div v-else-if="!team" class="not-found">
      <h2>Équipe introuvable</h2>
      <p>Impossible de trouver cette équipe. Veuillez vérifier l'URL.</p>
      <router-link to="/ranking" class="back-link">← Retour au classement</router-link>
    </div>

    <div v-else class="card team-card">
      <h1 class="team-title">{{ team.name }}</h1>

      <div class="leader-section card-body">
        <h2><LucideCrown /> Chef d'équipe</h2>
        <p class="leader-name">{{ team.leader.username }}</p>
      </div>

      <div class="team-members card-body">
        <h2><LucideUsers /> Membres</h2>
        <ul v-if="team.members && team.members.length">
          <li 
            v-for="(member, index) in team.members" 
            :key="index" 
            class="member-item"
          >
            <LucideUser /> {{ member }}
          </li>
        </ul>
        <p v-else>Aucun membre dans cette équipe.</p>
      </div>

      <div class="team-matches card-body">
        <h2>Matchs de l'équipe</h2>
        <ul v-if="matches.length" class="matches-list">
          <MatchCard
            v-for="match in matches"
            :key="match.id"
            :match="match"
            :showActions="false"
          />
        </ul>
        <p v-else>Aucun match trouvé pour cette équipe.</p>
      </div>

      <router-link to="/ranking" class="back-link">← Retour au classement</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { getTeamById } from '../api/teams';
import { getMatchesByTeam } from '../api/matches';
import MatchCard from '../components/MatchCard.vue';
import { LucideCrown, LucideUsers, LucideUser } from 'lucide-vue-next';
import '../assets/style/TeamInformation.css';
import '../assets/style/GamesView.css';

const route = useRoute();
const team = ref(null);
const matches = ref([]);
const loading = ref(true);
const { user } = useAuth();

onMounted(async () => {
  const teamId = route.params.id;
  try {
    team.value = await getTeamById(teamId, user.value.token);
    matches.value = await getMatchesByTeam(teamId, user.value.token);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l’équipe:', error);
  } finally {
    loading.value = false;
  }
});
</script>
