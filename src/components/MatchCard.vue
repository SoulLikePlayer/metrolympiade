<template>
  <li class="match-item">
    <div class="match-info">
      <h3>
        <i class="sport-icon fas fa-trophy"></i>
        {{ match.activity }}
      </h3>
      <p class="match-date">{{ formattedDate }}</p>
      <p class="match-score">
        {{ match.team1 }} - {{ match.team1Score }} : {{ match.team2Score }} - {{ match.team2 }}
      </p>
    </div>
    <div class="match-actions">
      <button @click="$emit('delete', match.id)" class="btn danger">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue';
import { useAuth } from '../composables/useAuth';
import '../assets/style/MatchCard.css';

const user = useAuth();

const props = defineProps({
  match: {
    type: Object,
    required: true
  }
});

const formattedDate = computed(() => {
  const date = new Date(props.match.startedAt);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
});
</script>
