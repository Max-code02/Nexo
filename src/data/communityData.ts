import { EventItem, TeamRole, DiscordChannel, RuleItem, LFGPost } from '../types';

export const COMMUNITY_INFO = {
  name: 'NEXO',
  fullName: 'NEXO Gaming Community',
  tagline: 'DEINE NEUE GAMING COMMUNITY',
  subHeadline: 'Gemeinsam zocken, quatschen, Events feiern & zusammen wachsen.',
  description: 'NEXO ist mehr als nur ein Discord Server – wir sind eine Community! Bei uns findest du Mitspieler für deine Lieblingsspiele, spannende Turniere, ein engagiertes Team und eine offene, freundliche Atmosphäre.',
  quote: 'Du musst nicht perfekt sein – wichtig ist, dass du Bock hast, etwas zu bewegen!',
  motto: 'GEMEINSAM. AKTIV. STARK. NEXO.',
  discordInviteCode: 'gj4VUe85',
  discordInviteUrl: 'https://discord.gg/gj4VUe85',
  teamContactDiscord: 'niko_0903',
  stats: {
    members: 534,
    onlineMembers: 142,
    voiceActive: 28,
    tournamentsHosted: 48,
    supportResponseTimeMin: '2-5 Min.',
  }
};

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    title: '1v1 Turnier',
    category: 'Turnier',
    game: 'Valorant / Aim Duel & CS2',
    dayTime: 'Samstag, 18:00 Uhr',
    dateStr: 'Kommender Samstag 18:00 CEST',
    description: 'Beweise dein Aim im großen 1v1 K.O.-Turnier! Spannende Matches mit Live-Stream und Moderation im Discord Voice.',
    prize: 'Discord Nitro & Exklusive Winner-Rolle',
    participants: 28,
    maxParticipants: 32,
    iconType: 'trophy',
    tag: 'Kompetitiv'
  },
  {
    id: 'event-2',
    title: 'Community Abend',
    category: 'Community Event',
    game: 'Jackbox, Scribbl.io, Among Us & Talk',
    dayTime: 'Freitag, 20:00 Uhr',
    dateStr: 'Jeden Freitag 20:00 CEST',
    description: 'Gemeinsam in der Lounge chillen, lustige Minigames zocken, Memes teilen und tolle Preise gewinnen. Für jeden zugänglich!',
    prize: 'XP-Booster & Giveaway-Verlosung',
    participants: 45,
    iconType: 'star',
    tag: 'Chill & Fun'
  },
  {
    id: 'event-3',
    title: 'Minecraft Event',
    category: 'Spezial-Event',
    game: 'Minecraft Bedwars & Build Battle',
    dayTime: 'Sonntag, 16:00 Uhr',
    dateStr: 'Kommender Sonntag 16:00 CEST',
    description: 'Großes Community Build-Battle & Bedwars-Turnier auf unserem dedizierten Server mit Custom Maps und Live-Voting.',
    prize: 'Minecraft Ingame Rang & Discord VIP',
    participants: 36,
    maxParticipants: 50,
    iconType: 'cube',
    tag: 'Creative & Casual'
  }
];

export const TEAM_ROLES: TeamRole[] = [
  {
    id: 'moderation',
    title: 'MODERATION',
    category: 'Sicherheit & Ordnung',
    icon: 'Shield',
    shortDesc: 'Serverüberwachung, Chat-Klima, Durchsetzung der Regeln & Konfliktlösung.'
  },
  {
    id: 'support',
    title: 'SUPPORT',
    category: 'User-Hilfe',
    icon: 'Headphones',
    shortDesc: 'Schnelle & zuverlässige Ticket-Bearbeitung und Onboarding neuer Mitglieder.'
  },
  {
    id: 'organisation',
    title: 'ORGANISATION',
    category: 'Management',
    icon: 'Users',
    shortDesc: 'Strukturierte Koordination von Team-Abläufen und Server-Weiterentwicklung.'
  },
  {
    id: 'event-team',
    title: 'EVENT-TEAM',
    category: 'Entertainment',
    icon: 'Calendar',
    shortDesc: 'Planung, Vorbereitung & Durchführung von Turnieren und Spielabenden.'
  },
  {
    id: 'community-betreuung',
    title: 'COMMUNITY-BETREUUNG',
    category: 'Engagement',
    icon: 'Heart',
    shortDesc: 'Giveaways, Umfragen, Social Media, Mitglieder-Feedback & Wohlfühlatmosphäre.'
  }
];

export const DISCORD_CHANNELS: DiscordChannel[] = [
  { id: 'c1', name: 'willkommen', category: 'WILLKOMMEN', type: 'text', description: 'Begrüßung und erste Schritte bei NEXO.' },
  { id: 'c2', name: 'regeln', category: 'WILLKOMMEN', type: 'text', description: 'Unsere goldenen Verhaltensregeln für fairen Umgang.' },
  { id: 'c3', name: 'chat', category: 'COMMUNITY', type: 'text', unread: true, description: 'Hauptchat für alles rund ums Zocken und den Alltag.' },
  { id: 'c4', name: 'memes', category: 'COMMUNITY', type: 'text', description: 'Lustige Gaming-Memes und Clips teilen.' },
  { id: 'c5', name: 'clips', category: 'COMMUNITY', type: 'text', description: 'Zeige deine besten Highlights und Kills!' },
  { id: 'c6', name: 'suche-gruppe', category: 'GAMING', type: 'text', unread: true, description: 'Finde Teammates für Ranked und Casual.' },
  { id: 'c7', name: 'turniere', category: 'GAMING', type: 'text', description: 'Ankündigungen und Brackets unserer Turniere.' },
  { id: 'c8', name: 'events', category: 'GAMING', type: 'text', description: 'Community-Abende, Minecraft-Realms und Spezialevents.' },
  { id: 'c9', name: 'ticket-erstellen', category: 'SUPPORT', type: 'text', description: 'Öffne ein privates Ticket für Support und Fragen.' },
  { id: 'v1', name: 'Lounge 1', category: 'VOICE', type: 'voice', members: ['Niko (Owner)', 'Alex', 'Shadow_99'] },
  { id: 'v2', name: 'Gaming 2', category: 'VOICE', type: 'voice', members: ['GhostRider', 'Viper', 'Kira'] },
];

export const SERVER_RULES: RuleItem[] = [
  { number: 1, title: 'Respektvoller Umgang', description: 'Behandle alle Mitglieder mit Respekt. Beleidigungen, Diskriminierung, toxisches Verhalten oder Mobbing werden nicht geduldet.', severity: 'Kritisch' },
  { number: 2, title: 'Kein Spam & Fremdwerbung', description: 'Unerlaubte Werbung für andere Server, Produkte oder ständiges Spammen in Chats und Voice-Channels ist untersagt.', severity: 'Wichtig' },
  { number: 3, title: 'Angemessene Kanalnutzung', description: 'Nutze die Kanäle gemäß ihrer Beschreibung (z.B. Memes in #memes, Gruppensuche in #suche-gruppe).', severity: 'Info' },
  { number: 4, title: 'Kein Cheating / Hacking', description: 'Die Verbreitung von Hacks, Cheats oder schädlicher Software führt zum sofortigen permanenten Ausschluss.', severity: 'Kritisch' },
  { number: 5, title: 'Anweisungen des Staff-Teams', description: 'Den Anweisungen der Moderatoren und Administratoren ist jederzeit Folge zu leisten.', severity: 'Wichtig' },
];

export const INITIAL_LFG_POSTS: LFGPost[] = [
  {
    id: 'lfg-1',
    game: 'Valorant',
    author: 'Acrobat_Aim',
    discordTag: 'acrobat#2918',
    lookingFor: 'Suche 2 für Trio/5-Stack Ranked (Plat / Dia). Chillig aber tryhard!',
    rank: 'Platin II',
    timeAgo: 'vor 4 Min.',
    micRequired: true,
    spotsLeft: 2
  },
  {
    id: 'lfg-2',
    game: 'Minecraft',
    author: 'BlockMaster_Nico',
    discordTag: 'nico_craft',
    lookingFor: 'Baue an unserem NEXO Community Citybuild! Helfer willkommen.',
    timeAgo: 'vor 18 Min.',
    micRequired: false,
    spotsLeft: 4
  },
  {
    id: 'lfg-3',
    game: 'Counter-Strike 2',
    author: 'RushB_Sniper',
    discordTag: 'rush_cs2',
    lookingFor: 'Premier Mode 12k-15k Rating. Brauchen noch einen Entry Fragger.',
    rank: '14,200 Elo',
    timeAgo: 'vor 32 Min.',
    micRequired: true,
    spotsLeft: 1
  },
  {
    id: 'lfg-4',
    game: 'Fortnite',
    author: 'NeonSniper',
    discordTag: 'neon_fn',
    lookingFor: 'Zero Build Squads oder Reload Cups. Just for Fun & Kills!',
    timeAgo: 'vor 45 Min.',
    micRequired: true,
    spotsLeft: 2
  }
];

export const FAQ_ITEMS = [
  {
    q: 'Kostet der Beitritt zu NEXO etwas?',
    a: 'Nein, niemals! NEXO ist zu 100% kostenlos und für jeden Gamer offen.'
  },
  {
    q: 'Welche Spiele werden bei NEXO gespielt?',
    a: 'Bei uns wird alles gezockt: Shooter (Valorant, CS2, Fortnite, Warzone, Apex), Sandbox & Survival (Minecraft, Rust, Palworld), Fun & Party Games (Among Us, Rocket League, Roblox) und viele weitere!'
  },
  {
    q: 'Wie kann ich mich für das Team bewerben?',
    a: 'Du kannst direkt auf unserer Website das Bewerbungsformular nutzen, ein Ticket auf Discord (#ticket-erstellen) eröffnen oder dich direkt bei Niko (Discord: niko_0903) melden.'
  },
  {
    q: 'Wie nehme ich an Turnieren teil?',
    a: 'Schau in unserem Kanal #turniere vorbei oder klicke oben in der Event-Übersicht auf "Teilnehmen". Turniere sind für alle verifizierten Community-Mitglieder kostenlos.'
  }
];
