export interface Choice {
  text: string;
  next: string;
  interpretiveNote?: string;
}

export interface StoryNode {
  id: string;
  chapter: string;
  chapterTitle: string;
  text: string;
  sourceNote?: string;
  choices: Choice[];
  isEnding?: boolean;
}

export const storyNodes: Record<string, StoryNode> = {
  // ═══════════════════════════════════════════════
  // CHAPTER I — Polydectes's Feast
  // ═══════════════════════════════════════════════
  "feast_begin": {
    id: "feast_begin",
    chapter: "I",
    chapterTitle: "The Feast of Polydectes",
    text: `<p>You are a poor boy in Seriphos. There lives the king, Polydectes.</p>
<p>Polydectes wants your mother, Danaë. You are the reason he has not taken her. You are young and you have nothing. Yet, your presence is what makes the difference.</p>
<p>Polydectes has a plan. That night he holds a feast. The hall is full. The king announces that he is courting Hippodameia and that each man present will contribute a horse as a wedding gift. Everyone does so, however you do can not.</p>
<p>Polydectes looks at you. He waits.</p>
<p>You have no horse. You have no land, no wealth, no gift to offer. The room is watching. Polydectes already knows that he won.</p>
<p>You promised to bring him the head of Medusa.</p>
<p>The room goes quiet. Polydectes accepts your promise in front of witnesses. There is no taking it back.</p>`,
    choices: [
      {
        text: "You walk out of the hall. You said it in front of witnesses. There is no taking it back, and you find you do not want to.",
        next: "divine_aid_heroic",
        interpretiveNote: "Traditional heroic reading — Perseus as bold, rash, but courageous"
      },
      {
        text: "Polydectes built this moment. You see that now. There was never a way out that did not lead here.",
        next: "divine_aid_fate",
        interpretiveNote: "Fate/agency reading — Perseus as instrument of divine will, not free agent"
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CHAPTER II — Divine Aid
  // ═══════════════════════════════════════════════
  "divine_aid_heroic": {
    id: "divine_aid_heroic",
    chapter: "II",
    chapterTitle: "The Gods Take Interest",
    text: `<p>You are alone on a hillside on Seriphos when they come to you.</p>
<p>Hermes was the first to arrive. He is easy to recognize. He carried the harpe, a sword with a sickle edge, and sets it on the ground in front of you. Find the Graeae, he says. They know where the Gorgon lives.</p>
<p>Then Athena speaks. She is standing there as well, though you did not see her arrive. She gives you her shield. The surface is polished metal, bright enough to show your face. She tells you to use it as a mirror.</p>
<p>You are unsure as to why the gods have decided to help you.</p>
<p>You believe it is because you are the son of Zeus.</p>`,
    choices: [
      {
        text: "You take the harpe and the shield. The Graeae are north, and they know the way.",
        next: "graeae_approach",
        interpretiveNote: "Heroic reading continues — divine favor as earned"
      },
      {
        text: "You wonder why Athena, of all goddesses, takes such interest in the death of Medusa. What history lies between them?",
        next: "graeae_approach_questioning",
        interpretiveNote: "Opens feminist/critical reading — questioning Athena's motives"
      }
    ]
  },

  "divine_aid_fate": {
    id: "divine_aid_fate",
    chapter: "II",
    chapterTitle: "Instruments of Olympus",
    text: `<p>Hermes comes first. He sets down the harpe, a blade with a curved edge, made for a specific job. Find the Graeae, he says. They know the way.</p>
<p>Then Athena is there. She hands you the polished shield and explains the mirror technique. Do not look at Medusa directly. Use the reflection. She does not ask whether you want to do this.</p>
<p>You did not choose to be Perseus. You did not choose for your grandfather to receive an oracle. You did not choose for Zeus to visit your mother in a tower of bronze. You did not choose to be born on this island or to be at that feast.</p>
<p>Hermes is an Argive god. Athena is Athenian. Both are here because of where you come from and what your bloodline is. They have been arranged around your life before you were born.</p>
<p>The harpe is on the ground in front of you. The shield is in your hand.</p>
<p>You pick up the sword.</p>`,
    choices: [
      {
        text: "North, then. The Graeae, then the Gorgon's lair. The path was arranged before you arrived at the feast.",
        next: "graeae_approach",
        interpretiveNote: "Fate reading — compliance with divine will"
      },
      {
        text: "You ask Athena directly: \u201CWhy do you want the Gorgon dead?\u201D Her answer, or her silence, tells you everything.",
        next: "graeae_approach_questioning",
        interpretiveNote: "Opens the Athena-Medusa backstory"
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CHAPTER III — The Graeae
  // ═══════════════════════════════════════════════
  "graeae_approach": {
    id: "graeae_approach",
    chapter: "III",
    chapterTitle: "The Grey Sisters",
    text: `<p>The Graeae are sisters of the Gorgons. They were born old. They have always been grey.</p>
<p>There are two of them, twin sisters, daughters of Phorcus. Between them they have one eye and one tooth, which they share. When one holds the eye, the other is blind. They are the only ones who know the way to the Gorgon's lair.</p>
<p>You find them near cold Atlas, behind thick stone walls. One reaches out and the eye moves from one palm to another, passing between them.</p>
<p>You hold still and watch.</p>`,
    choices: [
      {
        text: "You snatch the eye as it passes between their withered hands. \u201CTell me what I need to know, and I\u2019ll return it.\u201D",
        next: "nymphs_gifts",
        interpretiveNote: "Traditional — Perseus as cunning trickster hero (Apollodorus)"
      },
      {
        text: "You approach them openly. \u201CSisters, I seek the Gorgon\u2019s lair. I come with Athena\u2019s blessing.\u201D",
        next: "nymphs_gifts_persuade",
        interpretiveNote: "Alternative — diplomacy over deception"
      },
      {
        text: "You threaten to hurl the eye into the lake unless they speak. There is no room for mercy on this quest.",
        next: "nymphs_gifts_threat",
        interpretiveNote: "Darker heroic reading — the cost of the quest on Perseus's character"
      }
    ]
  },

  "graeae_approach_questioning": {
    id: "graeae_approach_questioning",
    chapter: "III",
    chapterTitle: "The Grey Sisters",
    text: `<p>The Graeae are sisters of the Gorgons, twin daughters of Phorcus, born old, sharing one eye and one tooth between them. They know the way.</p>
<p>But you are carrying a question with you. Athena sent you here, or as much as told you to go. You have started to understand why. In Athena's temple, Poseidon assaulted Medusa. Athena's response was to transform the victim. The hair became snakes. The face became something no one could look at without dying.</p>
<p>Now Athena is helping you kill her.</p>
<p>You watch the Graeae pass the eye between them. One is blind right now, then the other. You could take the eye easily. They cannot stop you.</p>
<p>But you are thinking about what it means to coerce a woman who cannot see you.</p>`,
    choices: [
      {
        text: "You take the eye, but gently. \u201CI do not wish to harm you. I only need to find my way.\u201D",
        next: "nymphs_gifts_sympathetic",
        interpretiveNote: "Feminist/sympathetic reading — Perseus shows compassion"
      },
      {
        text: "Despite your doubts, you snatch the eye. The quest demands ruthlessness, whatever your feelings.",
        next: "nymphs_gifts",
        interpretiveNote: "Internal conflict — duty vs. emerging sympathy"
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CHAPTER IV — The Nymphs' Gifts
  // ═══════════════════════════════════════════════
  "nymphs_gifts": {
    id: "nymphs_gifts",
    chapter: "IV",
    chapterTitle: "The Nymphs of the North",
    text: `<p>The Graeae's directions were correct. You followed them north, to the nymphs.</p>
<p>The nymphs give you three things. The first is the kibisis, a bag of a specific kind, made to hold the Gorgon's head safely. The second is the Cap of Hades. You put it on and you disappear. You are still standing on the ground, but you cannot be seen. The third is the winged sandals. You strap them on and rise into the air.</p>
<p>Then Hermes is there again. He gives you the harpe, the curved blade he brought you at the start. It is the tool that will do what needs to be done.</p>
<p>The shield belongs to Athena. The harpe belongs to Hermes. The sandals, the cap, and the kibisis come from the nymphs.</p>`,
    choices: [
      {
        text: "You put on the sandals and rise off the ground. You turn south toward Libya. The edge of the world is ahead.",
        next: "gorgon_lair_heroic",
        interpretiveNote: "Heroic approach to the Gorgon's lair"
      },
      {
        text: "You put on the cap and vanish, even from yourself. You stand for a moment in your own absence. Then you strap on the sandals and rise.",
        next: "gorgon_lair_reflective",
        interpretiveNote: "Psychological/philosophical reading of heroism"
      }
    ]
  },

  "nymphs_gifts_persuade": {
    id: "nymphs_gifts_persuade",
    chapter: "IV",
    chapterTitle: "The Nymphs of the North",
    text: `<p>The Graeae gave you directions without coercion. You asked and they answered.</p>
<p>The nymphs receive you the same way. You explain the quest. They listen. They give you the three things you need: the kibisis to hold the head safely, the Cap of Hades that makes you invisible, and the winged sandals.</p>
<p>Then Hermes appears again. He gives you the harpe, the curved blade designed for this work. He does not explain why he waits until now.</p>
<p>You strap on the sandals and rise off the ground. The nymphs watch you go. You came asking, not demanding, and the quest responded in kind. You are not sure if that changes what is waiting at the end of the journey.</p>
<p>You fly south, toward Libya.</p>`,
    choices: [
      {
        text: "South. Libya. The edge of the world. You have everything you need, and you asked for it instead of taking it.",
        next: "gorgon_lair_heroic",
        interpretiveNote: "Diplomatic hero arrives with different emotional state"
      }
    ]
  },

  "nymphs_gifts_threat": {
    id: "nymphs_gifts_threat",
    chapter: "IV",
    chapterTitle: "The Nymphs of the North",
    text: `<p>The Graeae cursed you when you left. You heard the words. You kept moving.</p>
<p>The nymphs give you what you need. They look at you with caution. The kibisis. The Cap of Hades. The winged sandals. They do not refuse. They were always going to give these things. But there is no warmth with them.</p>
<p>Hermes comes again and adds the harpe. He says nothing about the Graeae.</p>
<p>You put on the cap and vanish from sight. You put on the sandals and rise into the air. You are invisible and airborne and armed. You are also carrying a curse from three women you threatened.</p>
<p>You fly toward Libya. The wind is cold.</p>`,
    choices: [
      {
        text: "The crags are ahead. Three sisters sleeping. You know exactly what you will do when you get there.",
        next: "gorgon_lair_dark",
        interpretiveNote: "Dark heroic reading — the quest's toll on the hero"
      }
    ]
  },

  "nymphs_gifts_sympathetic": {
    id: "nymphs_gifts_sympathetic",
    chapter: "IV",
    chapterTitle: "The Nymphs of the North",
    text: `<p>The nymphs give you the three items. The kibisis to hold the head. The Cap of Hades that makes you invisible. The winged sandals.</p>
<p>Hermes gives you the harpe last, the curved blade. Presumably for a reason.</p>
<p>But the nymphs tell you something while you are here. They tell you about Medusa. Not the monster. The woman before. They have kept the story. Poseidon came to her in Athena's temple. Athena transformed her afterward. Not Poseidon. Her.</p>
<p>You listen to all of it.</p>
<p>Then you put on the sandals and rise into the air. You are going to kill a woman the gods already destroyed once, carrying a shield that belongs to the goddess who did it. The harpe came from the same gods who arranged all of this.</p>
<p>You fly toward Libya.</p>`,
    choices: [
      {
        text: "At the edge of the world, you will find a woman who was punished twice for someone else's crime. You are going to be the third.",
        next: "gorgon_lair_sympathetic",
        interpretiveNote: "Full feminist/sympathetic reading of the confrontation"
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CHAPTER V — The Gorgon's Lair
  // ═══════════════════════════════════════════════
  "gorgon_lair_heroic": {
    id: "gorgon_lair_heroic",
    chapter: "V",
    chapterTitle: "The Gorgon\u2019s Lair",
    text: `<p>Libya falls away. Then the sea. Then, where the world runs out, the crags.</p>
<p>They are barren. Dead trees spike up from the rock. You see the first stone figure from a distance: a man with his arm raised. Closer: a wolf, frozen mid-run. A woman looking over her shoulder. They line the whole approach, all of them facing inward, stopped in the last second before they understood what they were looking at.</p>
<p>You put on the Cap of Hades. You disappear.</p>
<p>Inside, three Gorgons asleep. Their hair moves on its own. Bronze hands. Two of them are immortal. Medusa is in the center.</p>
<p>You raise the shield and find her face in the bronze. You walk backward, watching the reflection, not the thing itself. The snakes in her hair curl and flex. You step over a stone figure of a deer. Close enough.</p>
<p>You bring the harpe down hard.</p>
<p>Blood hits the floor. From the open neck, Pegasus springs: white, huge, wings already spreading before he is fully free. Chrysaor beside him, golden sword already in his grip. Poseidon's children, kept inside her until now. They rise without looking back.</p>`,
    choices: [
      {
        text: "The other two Gorgons are waking. You push the head into the kibisis, seal it, and run for the sky before they wake.",
        next: "flight_home",
        interpretiveNote: "Heroic triumph — clean and decisive"
      },
      {
        text: "The other two Gorgons stir. You watch where Pegasus went for one second. Something beautiful came from this killing. Then you run.",
        next: "flight_home_reflective",
        interpretiveNote: "Hero begins to question the act"
      }
    ]
  },

  "gorgon_lair_reflective": {
    id: "gorgon_lair_reflective",
    chapter: "V",
    chapterTitle: "The Gorgon\u2019s Lair",
    text: `<p>You have been invisible since before you landed.</p>
<p>The crags are bare rock and dead timber. Around the entrance, frozen in the postures they held when they turned to look: a man with his mouth open, a running deer, two figures side by side with their arms raised. You move past them without touching.</p>
<p>Inside, three Gorgons sleeping. Two are immortal. Medusa is not. She is the only one you can kill.</p>
<p>You raise the shield and find her face in the bronze. She is still. Sleeping. The snakes in her hair move slowly, restless even in silence. You have been thinking about this for three days: to kill something while only looking at its reflection. The cap makes you invisible. The shield gives you a screen. She cannot see you at all.</p>
<p>You bring down the harpe.</p>
<p>Pegasus comes from the blood, white and vast, wings already beating before he is fully free. Chrysaor with him. Poseidon's children, inside her since before any of this. They go up and away without looking back.</p>
<p>You seal the kibisis. The other two Gorgons begin to stir.</p>`,
    choices: [
      {
        text: "The Gorgons are stirring. You think about where Pegasus went. Then you run.",
        next: "flight_home_reflective",
        interpretiveNote: "Psychological reading deepens"
      }
    ]
  },

  "gorgon_lair_dark": {
    id: "gorgon_lair_dark",
    chapter: "V",
    chapterTitle: "The Gorgon\u2019s Lair",
    text: `<p>The crags are bare. Dead trees spike from the rock. Stone figures at the entrance: people and animals both, stopped mid-motion, all of them turned inward.</p>
<p>The cap makes you invisible. You enter.</p>
<p>Three Gorgons sleeping. Two are immortal. Medusa is not. She is the one you can kill.</p>
<p>You raise your shield. You move backward until you have the angle, as you see her reflection through the shield, you take a clean strike at Medusa's head.</p>
<p>The blood of her head pools on the ground. From this, Pegasus rises.</p>
<p>You push the head into the kibisis. You seal it. You do not touch the head with your hands. The other two Gorgons are beginning to stir. You rise into the air, still invisible, and move south.</p>
<p>You are in the sky before they fully wake.</p>`,
    choices: [
      {
        text: "Libya below, then sea, then Seriphos. The head is sealed. Polydectes is still waiting.",
        next: "flight_home",
        interpretiveNote: "Dark reading — the hero as efficient killer"
      }
    ]
  },

  "gorgon_lair_sympathetic": {
    id: "gorgon_lair_sympathetic",
    chapter: "V",
    chapterTitle: "The Gorgon\u2019s Lair",
    text: `<p>You know the story before you arrive.</p>
<p>Poseidon came to her in Athena's temple. Athena punished Medusa. Not Poseidon. Her. The hair became snakes. The face became something lethal to look at. Then Athena arranged for you to come here and finish it.</p>
<p>The crags are barren. Dead trees spike from the rock. The stone figures begin before you reach the entrance: a man with his hands raised, a woman mid-stride, a running deer. They did not look away in time. You move past them, invisible under the cap.</p>
<p>Inside, three Gorgons sleeping. Two immortal. Medusa is in the center. She is the mortal one.</p>
<p>You raise the shield and look at her in the bronze. Her face is still. Sleeping. The snakes in her hair shift slowly. In the reflection she looks like someone sleeping.</p>
<p>You think about what Athena did not say.</p>`,
    choices: [
      {
        text: "You bring down the harpe. You had no choice. You will carry her face for the rest of your life.",
        next: "flight_home_sympathetic",
        interpretiveNote: "Full feminist reading — the hero as complicit, aware, and grieving"
      },
      {
        text: "For one moment you consider lowering the harpe. The myth does not allow it. You bring it down.",
        next: "flight_home_meta",
        interpretiveNote: "Meta-narrative — acknowledging the story's constraints"
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CHAPTER VI — The Flight Home
  // ═══════════════════════════════════════════════
  "flight_home": {
    id: "flight_home",
    chapter: "VI",
    chapterTitle: "The Flight Home",
    text: `<p>You are in the air over the sea.</p>
<p>The kibisis is at your side. The cap is off. You are visible again, riding the winged sandals east and south, back toward the world with names.</p>
<p>You cross into the territory of Atlas. He is the largest thing you have seen. His thousand flocks range across the grass. His orchard has golden fruit on golden boughs.</p>
<p>You ask for hospitality. You cite your father and your deeds. However, Atlas had received an oracle from Delphi long ago: a son of Jove would one day come and rob his golden tree. He believes you are the one.</p>
<p>You look away and raise the Gorgon's head, turning Atlas into stone.</p>
<p>Atlas becomes a mountain. His beard and hair are woods. His shoulders are ridges. His head is the peak. The Atlas Mountains, which are what they are called to this day.</p>
<p>You seal the bag and fly on.</p>`,
    choices: [
      {
        text: "Below you, a coastline. Chained to the rocks, a woman. The sea churns with something vast and hungry.",
        next: "andromeda_heroic",
        interpretiveNote: "Traditional — Perseus as rescuer"
      },
      {
        text: "Below you, a coastline. A woman in chains on the rocks. Your hand finds the kibisis before you even start your descent. You make yourself reach for the harpe instead.",
        next: "andromeda_power",
        interpretiveNote: "Power corruption angle — the head as seductive weapon"
      }
    ]
  },

  "flight_home_reflective": {
    id: "flight_home_reflective",
    chapter: "VI",
    chapterTitle: "The Flight Home",
    text: `<p>You are in the air. The kibisis is sealed at your side.</p>
<p>Below you, Libya. Then the sea begins. You know roughly where Seriphos is. You know what you are going back to: Polydectes, Danaë, the thing you promised at a feast table.</p>
<p>Pegasus was born from her neck. A winged horse, white and impossible, rising from the place where the harpe went. You do not have a framework for that. Something was living inside her, and now it is free, and it went up into the sky.</p>
<p>You fly. The sea passes below.</p>
<p>A coastline. Then: a woman chained to a rock above the water. Something is moving in the sea beneath her.</p>`,
    choices: [
      {
        text: "You bank toward the cliff. The monster has not surfaced yet. You have a few seconds to decide how you want to do this.",
        next: "andromeda_reflective",
        interpretiveNote: "Reflective hero encounters Andromeda"
      }
    ]
  },

  "flight_home_sympathetic": {
    id: "flight_home_sympathetic",
    chapter: "VI",
    chapterTitle: "The Flight Home",
    text: `<p>You are in the air. You sealed the kibisis before you fully processed what you had done.</p>
<p>Below, Libya. Then sea.</p>
<p>You are carrying the head of a woman who was punished by Athena for being Poseidon's victim, then sent to the edge of the world to live as a monster, then hunted by a hero the gods equipped specifically for this purpose. You are that hero. You completed the arrangement.</p>
<p>Pegasus went up into the sky. Chrysaor too. They were her children, in the sense that they were inside her. Now they are free and she is not here to see it.</p>
<p>Below: a coastline. A woman chained to rocks at the water's edge. The sea is moving.</p>`,
    choices: [
      {
        text: "You descend. She cannot see you yet. Another woman, another monster, another structure you are about to complete.",
        next: "andromeda_sympathetic",
        interpretiveNote: "Feminist reading — Andromeda as another victimized woman"
      }
    ]
  },

  "flight_home_meta": {
    id: "flight_home_meta",
    chapter: "VI",
    chapterTitle: "The Flight Home",
    text: `<p>You are in the air.</p>
<p>This story has been told before. Pindar told it in the fifth century BCE. Apollodorus catalogued it in what we call the Library. Ovid gave Medusa a backstory and a reason. In 1975, Hélène Cixous wrote an essay arguing that Medusa is laughing, not screaming, and that the face that turns men to stone is not a weapon but a refusal.</p>
<p>Every version ends the same way. Medusa dies. You fly home. The head goes to Athena's aegis.</p>
<p>What changes is the framing. What changes is who the story is about. Apollodorus is writing a reference work. You are a plot point. Ovid is interested in transformation. You are the agent of one. Cixous centers the severed face and asks what it would mean to read the myth from there.</p>
<p>Below: a woman chained to a rock. The sea stirs.</p>`,
    choices: [
      {
        text: "You descend. The myth continues exactly as it must.",
        next: "andromeda_reflective",
        interpretiveNote: "Meta reading flows into reflective Andromeda"
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CHAPTER VII — Andromeda
  // ═══════════════════════════════════════════════
  "andromeda_heroic": {
    id: "andromeda_heroic",
    chapter: "VII",
    chapterTitle: "Andromeda",
    text: `<p>Her name is Andromeda. She is chained to a sea cliff on the coast of Ethiopia.</p>
<p>Her mother is Cassiopeia, queen of Ethiopia. Cassiopeia boasted that her daughter was more beautiful than the Nereids. Poseidon sent the sea monster Cetus as punishment. The oracle said Andromeda must be offered to it. Her father Cepheus chained her to the cliff.</p>
<p>You see her from the air. The wind moves her hair and tears streak her face. Without those you might have taken her for a marble statue. You catch fire looking at her. You almost forget to beat your wings.</p>
<p>You land. Cepheus and Cassiopeia are weeping at the cliff. The sea is already moving. There is no time for a long negotiation: you tell them you are Perseus, son of Jove, and that you will kill the monster for a price. They agree before Cetus fully surfaces.</p>`,
    choices: [
      {
        text: "You draw the harpe and go into the water. The monster is large and the sea is not your element. You fight it on a ledge above the waves and finish it with the sword.",
        next: "return_seriphus_heroic",
        interpretiveNote: "Traditional — Perseus as rescuer"
      },
      {
        text: "You kill it with the harpe. But your hand went to the kibisis first. You notice that.",
        next: "return_seriphus_power",
        interpretiveNote: "Power reading — growing comfort with the weapon"
      }
    ]
  },

  "andromeda_power": {
    id: "andromeda_power",
    chapter: "VII",
    chapterTitle: "Andromeda",
    text: `<p>Her name is Andromeda. She is chained to a cliff above the sea.</p>
<p>You used the head on Atlas three days ago. The Titan became a mountain range between one breath and the next. The ease of it is the thing you cannot stop thinking about. The harpe takes skill, timing, risk. The head takes a second.</p>
<p>You draw the harpe and go into the water to fight Cetus. You fight it the old way. The monster is huge and you are a man with a curved sword and winged sandals, and it nearly kills you twice. But you kill it.</p>
<p>Cepheus comes from the walls and offers you Andromeda's hand. You accept.</p>
<p>There is a man named Phineus, Andromeda's betrothed before this. At the wedding feast, he comes with armed men. You hold Andromeda and open the kibisis. The hall turns grey.</p>
<p>Andromeda takes your hand afterward. Her eyes go to the bag at your side.</p>`,
    choices: [
      {
        text: "You do not mention Atlas, or Phineus, or how many times you opened it. You take her hand and head for Seriphos.",
        next: "return_seriphus_power",
        interpretiveNote: "The head's power shadows the relationship"
      }
    ]
  },

  "andromeda_reflective": {
    id: "andromeda_reflective",
    chapter: "VII",
    chapterTitle: "Andromeda",
    text: `<p>Her name is Andromeda.</p>
<p>She is chained to a cliff because her mother, Cassiopeia, said that Andromeda was more beautiful than Poseidon's daughters. Poseidon punished the boast by sending Cetus. The oracle said a sacrifice was required. Her father Cepheus chained her to the rock.</p>
<p>Poseidon, again.</p>
<p>You draw the harpe and fight the monster in the water. It is not elegant. Cetus is large and the sea is not your element and you nearly die twice. You kill it. The sea settles.</p>
<p>Cepheus offers you Andromeda's hand in exchange.</p>
<p>You free her from the chains. She is alive. Cetus is dead. Poseidon's punishment will not follow through here.</p>
<p>But none of the conditions that put her here have changed. Poseidon punishes on a whim. The gods arrange oracles and sacrifices. A woman gets chained to a cliff. Another was turned into a monster. A man flies in and kills the beast. You are that man.</p>`,
    choices: [
      {
        text: "Andromeda is alive. Cetus is dead. Poseidon's oracle is satisfied. You have done exactly what the structure required. Seriphos is north.",
        next: "return_seriphus_reflective",
        interpretiveNote: "Reflective/fate reading continues"
      }
    ]
  },

  "andromeda_sympathetic": {
    id: "andromeda_sympathetic",
    chapter: "VII",
    chapterTitle: "Andromeda",
    text: `<p>Her name is Andromeda.</p>
<p>She is chained to a cliff because her mother said the wrong thing to the wrong god, and Poseidon sent a monster, and the oracle said a virgin sacrifice would satisfy it. Her father Cepheus chose her.</p>
<p>You already know Medusa's version of this structure. Poseidon. A woman who did nothing wrong. A punishment that falls on the woman, not the god.</p>
<p>You fight Cetus with the harpe. You kill it. The sea goes still. It takes a long time and you nearly lose twice.</p>
<p>Cepheus comes from the walls. He offers you his daughter's hand in exchange for the monster's death.</p>
<p>You free Andromeda from the chains. She asks your name. You tell her. She asks what you are carrying in the bag. You tell her that too, the whole story. Medusa, the woman before. What Poseidon did. What Athena did. What you did. All of it.</p>
<p>She listens. She does not look away.</p>`,
    choices: [
      {
        text: "She says: I did not know that about Athena. You say: most people don't. You take her hand and head for Seriphos.",
        next: "return_seriphus_sympathetic",
        interpretiveNote: "Full feminist reading — truth-telling as resistance"
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CHAPTER VIII — Return to Seriphus
  // ═══════════════════════════════════════════════
  "return_seriphus_heroic": {
    id: "return_seriphus_heroic",
    chapter: "VIII",
    chapterTitle: "Return to Seriphus",
    text: `<p>Seriphos from the air. Small. Familiar.</p>
<p>Polydectes is in his hall. He is not surprised to see you. He is contemptuous. You never killed the Gorgon, he says. You are lying. His wrath has moved past the feast, past Danaë. He simply will not believe you, and he says it in front of everyone.</p>
<p>You tell him you have brought proof.</p>
<p>You tell the room to look away. Then you open the kibisis.</p>`,
    choices: [
      {
        text: "Polydectes turns to stone mid-sneer. His court with him. You close the bag, make Dictys king, and give the head to Athena. The objects go back to the gods. You are mortal again, standing on the beach with nothing in your hands.",
        next: "ending_heroic",
        interpretiveNote: "Traditional heroic triumph"
      },
      {
        text: "Polydectes turns to stone mid-sneer. His court with him. You stand in a room full of grey figures and look at what you did. The head goes to Athena. The sandals and cap and kibisis go back to the gods. You are mortal again. The room stays quiet.",
        next: "ending_ambiguous",
        interpretiveNote: "Heroic but self-aware ending"
      }
    ]
  },

  "return_seriphus_power": {
    id: "return_seriphus_power",
    chapter: "VIII",
    chapterTitle: "Return to Seriphus",
    text: `<p>Seriphos below. You descend.</p>
<p>You have used the head twice now, on Atlas and on Phineus at the wedding feast. Each time it was the right choice. That is what you tell yourself.</p>
<p>Polydectes moved on Danaë while you were gone. Danaë and Dictys are at an altar. You walk into the palace.</p>
<p>Polydectes sees you. He begins to say something. You open the kibisis.</p>
<p>The room turns to stone. Polydectes, his court, mid-sentence. Grey and still.</p>
<p>You stand in a room full of statues. You have done this three times now and you are counting.</p>`,
    choices: [
      {
        text: "You give the head to Athena. You return the objects. You make Dictys king. You stand on the beach without the sandals or the sword, mortal again. You are glad it is gone.",
        next: "ending_ambiguous",
        interpretiveNote: "Power corruption ending"
      }
    ]
  },

  "return_seriphus_reflective": {
    id: "return_seriphus_reflective",
    chapter: "VIII",
    chapterTitle: "Return to Seriphus",
    text: `<p>Seriphos. You descend.</p>
<p>Polydectes moved against Danaë the moment you were gone. You knew he would. That was the shape of the trap from the beginning. The feast, the promise, the impossible quest. All of it was designed to remove you. And it worked. You were removed.</p>
<p>You went to the edge of the world and back. You did everything the gods and the myth required of you.</p>
<p>Danaë and Dictys are at an altar. You go to Polydectes's hall. You open the kibisis. The king and his court turn to stone.</p>
<p>You close the bag. Your mother is safe.</p>
<p>This is what victory looks like. A hall full of grey statues. A fisherman made king. A woman freed from an altar she should never have had to shelter at.</p>
<p>You give the head to Athena. You return the sandals, the cap, the kibisis. The objects go back to the gods. You are a man on an island. The mission is complete.</p>`,
    choices: [
      {
        text: "You give the head to Athena. You stand on the beach without the sandals or the sword. Acrisius is still out there somewhere, running. The mission is complete.",
        next: "ending_ambiguous",
        interpretiveNote: "Fate/agency ending — hollow victory"
      }
    ]
  },

  "return_seriphus_sympathetic": {
    id: "return_seriphus_sympathetic",
    chapter: "VIII",
    chapterTitle: "Return to Seriphus",
    text: `<p>Seriphos. You descend.</p>
<p>Polydectes moved on Danaë while you were gone. Danaë and Dictys are at an altar. You walk into the palace.</p>
<p>You take the head out of the kibisis. The room turns to stone. Polydectes, mid-word. His court. Grey, still, permanent.</p>
<p>Your mother is free.</p>
<p>You are standing in a hall full of statues, holding the head of a woman who was punished by Athena for surviving an assault by Poseidon, then transformed into a monster, then hunted by a hero the gods prepared, and now used as a weapon to petrify a petty king on a small island. She never agreed to any of this. Not the assault, not the transformation, not the quest, not this.</p>
<p>You give the head to Athena. Athena will mount it on her aegis. Medusa's face will look out from the goddess's armor as a trophy.</p>
<p>You return the other objects. You make Dictys king. You go find your mother.</p>`,
    choices: [
      {
        text: "You find your mother at the altar with Dictys. She is alive. You do not know yet how much of the story you will tell her.",
        next: "ending_ambiguous",
        interpretiveNote: "Feminist ending — the cost counted fully"
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // CHAPTER IX — Endings
  // ═══════════════════════════════════════════════
  "ending_heroic": {
    id: "ending_heroic",
    chapter: "IX",
    chapterTitle: "The Hero\u2019s Glory",
    text: `<p>You leave Seriphos with Andromeda and Danaë.</p>
<p>Argos is your grandfather's kingdom. Acrisius received an oracle before you were born: his daughter's son would kill him. He put Danaë in a bronze chamber to stop it. Zeus came to her anyway, and you were born, and Acrisius put you both in a chest and threw it into the sea. You washed up on Seriphos. The oracle continued moving toward its conclusion while Acrisius tried to stop it.</p>
<p>When Acrisius hears you are coming, he flees Argos. He goes to Thessaly.</p>
<p>You go to Larissa in Thessaly. There are funeral games. You compete in the discus. You throw. The discus goes into the crowd and strikes an old man. The old man is Acrisius. He dies of the wound. The oracle is fulfilled.</p>
<p>You did not know he was there. You did not aim at him.</p>
<p>You cannot rule Argos after this. You have killed a relative, and there are rules about that. You exchange kingdoms with Megapenthes, who rules Tiryns. You become king of Tiryns. Your sons will found Mycenae.</p>
<p>By any measure, you did what a hero is supposed to do. You were brave when you had no reason to be. You were loyal to your mother. You gave up the ultimate weapon instead of keeping it. You made a fisherman king. The discus was fate. You were never going to avoid it and Acrisius was never going to avoid it. The oracle said so before you existed.</p>
<p>This is what it looks like from the inside: courage, skill, divine favor, and a discus in a crowd in Thessaly.</p>`,
    choices: [],
    isEnding: true
  },

  "ending_ambiguous": {
    id: "ending_ambiguous",
    chapter: "IX",
    chapterTitle: "The Weight of Stone",
    text: `<p>You leave Seriphos. You go to Thessaly, eventually, for the games at Larissa.</p>
<p>Acrisius fled when he heard you were coming. The oracle was always there, behind every decision he made. He locked Danaë in bronze to stop it. It did not stop.</p>
<p>At Larissa, you throw the discus. It goes into the crowd and it strikes Acrisius. The oracle is fulfilled, but you did not know he was there.</p>
<p>You carry the weight all the deeds you have done on Seriphos: one was Polydectes whom has tried to kill you and grandfather, in which he recieved an oracle that he was going to die from his grandson, but still chose to keep you alive.</p>
<p>One was intentional. One was not. The difference matters and also does not matter, depending on how you look at it.</p>
<p>Since you killed a relative, you cannot live here anymore and there are rules about this. You trade kingdoms with Megapenthes and take Tiryns. Your line founds Mycenae.</p>
<p>The story ends correctly: villain petrified, mother freed, princess rescued, kingdom established. The discus doesn't fit. You did everything right, and then a discus struck an old man in a crowd and the prophecy that started all of this was finished. Both things are true at the same time.</p>`,
    choices: [],
    isEnding: true
  },

  /* endings currently disabled
  "ending_power": {
    id: "ending_power",
    chapter: "IX",
    chapterTitle: "The Surrendered Weapon",
    text: `<p>The hall on Seriphos. Polydectes and his court, grey and still. You used the head three times. Once on Atlas. Once on Phineus at the wedding feast. Once here.</p>
<p>Each time it was the right choice. Each time the reasons were clear.</p>
<p>You give the head to Athena. You return the sandals, the cap, the kibisis. You stand on the beach of Seriphos with nothing supernatural. You are a man on an island.</p>
<p>You are glad you gave it back. That is the sentence you keep returning to. The head would have been easy to keep. You had already used it three times. The logic of a fourth use, a fifth, was not hard to construct. The reasons would not have stopped arriving.</p>
<p>Athena has the head now.</p>
<p>You go to Argos. Acrisius has fled to Thessaly. You follow the story to Larissa and throw a discus in the games and it kills the old man in the crowd and the old man is Acrisius. The oracle arrives at its destination.</p>
<p>You cannot rule Argos. You take Tiryns. Your sons found Mycenae.</p>
<p>The reading this path invites is about the weapon and what you chose to do with it. The heroic act is not only the killing of the Gorgon. It is giving the head to Athena afterward. Choosing to be mortal again. In a myth full of men who reach for divine power, the unusual move is the surrender of it. The discus in Thessaly is the myth's reminder that fate does not give awards for good choices.</p>`,
    choices: [],
    isEnding: true
  },

  "ending_fate": {
    id: "ending_fate",
    chapter: "IX",
    chapterTitle: "The Prophecy Fulfilled",
    text: `<p>You return the objects. Sandals. Cap. Kibisis. The harpe is simply gone, the way divine objects go.</p>
<p>You are mortal again. You were always mortal. The objects were loans.</p>
<p>Go back to the beginning: Acrisius received an oracle. His daughter's son would kill him. He built a bronze chamber. Zeus circumvented it. You were born. He put you in a chest. The sea brought you to Seriphos. Polydectes wanted Danaë. He set the trap at the feast. The gods appeared with equipment. The Graeae knew the way. The nymphs had the objects. Athena had the shield. Hermes had the harpe.</p>
<p>Every step of this was arranged before you took it.</p>
<p>You go to Argos. Acrisius has fled. You go to Thessaly. The games at Larissa. You throw the discus. The discus kills an old man. The old man is Acrisius.</p>
<p>Whether there is any meaningful sense in which you chose any of this is the question this path has been asking since the feast on Seriphos.</p>
<p>You take Tiryns. Your children found Mycenae. The dynasty is real and its origins are in a chest thrown into the sea and a discus in Thessaly.</p>`,
    choices: [],
    isEnding: true
  },

  "ending_feminist": {
    id: "ending_feminist",
    chapter: "IX",
    chapterTitle: "The Laugh of the Medusa",
    text: `<p>You give the head to Athena.</p>
<p>Athena will mount it on her aegis, the divine breastplate worn by Zeus and lent to Athena. Medusa's face will look out from it as an apotropaic symbol, meant to ward off evil. Her face, which turned men to stone in life, continues to serve that function in death, as a trophy on the armor of the goddess who punished her.</p>
<p>Medusa never agreed to any of it. Not the assault. Not the transformation. Not the quest. Not this.</p>
<p>Hélène Cixous published "The Laugh of the Medusa" in 1975. The essay argues that Medusa is laughing, not screaming, and that men who see her face and turn to stone are turned to stone by their own fear, not by a monster's power. The title reclaims the image. The gorgoneion on Athena's aegis is a trophy. Cixous argues it is also a refusal.</p>
<p>You go to Argos. Acrisius has fled. You find him in Thessaly at the games. You throw the discus. It kills him. The oracle is fulfilled. You did not mean to do it. The oracle did not ask whether you meant to do it.</p>
<p>You take Tiryns. Your children found Mycenae.</p>
<p>The feminist reading asks you to hold two things at once: the Mycenaean dynasty on one side, and on the other, a face mounted on a goddess's armor. The face of a woman who was assaulted, transformed, hunted, killed, and put on display. Cixous says Medusa is laughing. Both of those things can be true.</p>`,
    choices: [],
    isEnding: true
  }
  */
};

export function getNode(id: string): StoryNode | undefined {
  return storyNodes[id];
}

export function getStartNode(): StoryNode {
  return storyNodes["feast_begin"];
}
