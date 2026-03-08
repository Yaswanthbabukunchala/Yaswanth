const textConfig = {
  license: {
    notice:
      "You may use this item multiple times for personal use only. You may not resell, redistribute, or use it for any commercial purpose. Unauthorized use may result in legal action.",
  },

  letter: {
    letterHeaderTitle: "To My Beautiful Girl",
    letterMessage: `My Queen,

Today is not just about celebrating women — it's about celebrating you.

You are the most beautiful girl I have ever seen, and one of the strongest people I have ever known. Your kindness, your sweetness, your dreams, and the way you care for everyone around you make you truly special.

Even when you carry your own pain, you still try to make everyone else happy. That strength in you is something I admire deeply.

On this special day, I just want to say a few things from my heart. You are someone who inspires me a lot. Seeing you every day makes me believe even more in hard work and dedication.

The amount of effort you put in for your family, the sacrifices you make, and the way you keep everyone around you happy is something truly beautiful. You bring light and happiness to the lives of people around you in ways you may not even notice..

Never forget how special you are.`,
    signature: "Forever yours 🥀❤️🌏",
    envelopeClickHint: "Click to open your Women's Day surprise",
    specialDeliveryText: "Women's Day Special Delivery 💐",
    continueButton: "Continue ✨",
    headerTag: "Special Delivery",
    pageHeading: "Happy Women's Day, My Queen🥀❤️🌏",
    pageSubtitle: "A few words from my heart, meant only for you.",
    openingText: "Opening with love...",
    waxSealEmoji: "💌",
    postmarkEmoji: "💌",
  },

  chillZone: {
    heading: "Vibes for My Queen 🎵",
    subheading: "Songs that remind me of you",
    chooseTrackHint: "Pick a vibe ✨",
    continueButton: "Continue the Surprise ✨",
    headerTag: "Your Playlist",
    nowPlayingLabel: "Now Playing",
    idleIcon: "🎵",
    tracks: [
      { id: 1, title: "Dil Ka Jo Haal Hai", caption: "Because you make my heart feel alive 💖" },
      { id: 2, title: "Dooron Dooron", caption: "My heart belongs to you 💕" },
      { id: 3, title: "If the world was ending...", caption: "Every moment with you feels special ✨" },
    ]
  },

  cards: {
    heading: "Women's Day Wishes 💐",
    subheading: "Tap each card to reveal a message!",
    tapLabel: "✨ Open!",
    headerTag: "Memories",
    tapToOpen: "tap to open",
    messageIcon: "💌",
    hintIcon: "✉️",
    popupEmoji: "🎉",
    progress: {
      start: "Start discovering your surprises ✨",
      discovered: (n, total) => `${n} of ${total} wishes unlocked! 💖`,
      complete: "All wishes revealed! 💐✨"
    },
    popup: {
      title: "All Wishes Unlocked!",
      message: "Each one is a reminder of how special you are to me. 💕",
      openFinal: "Open Final Letter 💌",
      stay: "Stay a little longer"
    },
    cardMessages: [
      "Happy Women’s Day to my strong and beautiful Elephant 🐘, who inspires me every single day💖",
      "Behind every strong woman is a story that made her the queen she is today✨",
      "Dream big, work hard, and never stop believing — I know one day you will achieve everything you dream of. 💐"
    ]
  },

  finalLetter: {
    pageTitle: "Final Letter",
    pageSubtitle: "A message from my heart 💕",
    
    title: "A Special Message For You",
    
    sealingText: "Sealing this message with love...",
    sealingEmoji: "💌",
    
    sealButton: "Seal The Letter 💐",
    restartButton: "Experience Again",
    
    sealedTitle: "Message Sealed with Love",
    sealedSubtitle: "Happy Women's Day, My Love 💕",

    heartCount: 7,
    
    typedDefault: "Forever yours 💕",
    experienceAgain: "Experience Again ✨",
    dateLocale: "en-US",
    
    decorativeEmojis: {
      topRight: "💕",
      bottomLeft: "💖"
    },
    
    letterGreeting: "My beautiful girl,",
    letterParagraphs: [
      "You are one of the strongest, kindest, and most inspiring people I know.",
      "On this Women's Day, I just want you to remember how incredible you are. The world is lucky to have you, and I'm even luckier to love you. 💐✨"
    ],
    sealingNote: "Sealing will complete your special surprise.",
    headerTag: "Final Message",
  },
};

export default textConfig;
