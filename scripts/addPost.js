const { initializeApp } = require('firebase/app')
const { getFirestore, collection, addDoc } = require('firebase/firestore')
require('dotenv').config({ path: '.env.local' })

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const blogPost = {
  title: "Why Experimentation is the Only Way to Learn Anything",
  date: "2025.03.01",
  author: "Om",
  readingTime: "7 MIN READ",
  categories: ["AI", "Learning", "Experimentation", "Writing", "Online Communities"],
  summary: `Most people get stuck in theory mode—consuming content, reading books, watching tutorials—but never actually doing anything. The best way to learn anything is by experimenting, failing, tweaking, and repeating.

This post dives into why you need to shift from passive learning to active experimentation, backed by my own experiences with:
✅ Writing daily on LinkedIn
✅ Building Ohmniverse & community-driven spaces
✅ Learning AI hands-on
✅ Reverse-engineering websites like Stripe

If you've been waiting for the right moment to start something, this blog is for you.`,
  content: `
    <h2>Introduction</h2>
    <p>I used to believe that learning = consuming more content.<br>
    Watch one more tutorial.<br>
    Read one more blog.<br>
    Take one more course.</p>

    <p>But after months of this, I realized: I wasn't actually getting anywhere.</p>

    <p>You don't learn by watching.<br>
    You learn by doing.</p>

    <p>The moment I stopped watching and started experimenting, everything changed.</p>

    <p>I started writing daily on LinkedIn → Got noticed, landed my first internship.<br>
    I started cold messaging people I admired → Built real connections.<br>
    I started experimenting with AI & automation → Built my own community management system.<br>
    I started breaking down how great websites work → Now I'm replicating Stripe's blog site.</p>

    <p>The pattern? Action beats overthinking. Every. Single. Time.</p>

    <h2>The 3-Step Framework to Learn Anything</h2>
    <p>If you're someone who overthinks and never executes, here's a simple 3-step process that worked for me:</p>

    <h3>1. Pick Something & Start Before You Feel Ready</h3>
    <p>You will never feel ready. Ever.<br>
    You'll always feel like you need "just one more tutorial" before starting.</p>

    <p>Screw that. Pick something and start today.</p>

    <p>Want to write? Post something today.<br>
    Want to learn coding? Build a simple project today.<br>
    Want to connect with people? DM them today.</p>

    <h3>2. Learn Just Enough to Take Action</h3>
    <p>Instead of spending weeks in tutorial hell, learn just enough to start.</p>

    <p>Instead of a 100-hour course, watch a 10-minute explainer.<br>
    Instead of reading 20 blog posts, read one and implement it.</p>

    <h3>3. Reflect, Iterate, and Improve</h3>
    <p>The only way to actually get better is to make mistakes, fix them, and improve.</p>

    <p>My first LinkedIn post? Cringe.<br>
    My first website? Broken.<br>
    My first cold DM? Ignored.</p>

    <p>But I kept tweaking, improving, and iterating. Now, I'm building my own experimental space.</p>

    <h2>Final Thoughts</h2>
    <p>If you take away one thing from this:<br>
    👉 Stop thinking. Start experimenting.</p>

    <p>Nothing changes until you do something.</p>

    <p>Waiting for the perfect time is a lie. The best time to start was yesterday. The second-best time? Right now.</p>

    <p>What's one thing you've been putting off because you don't feel ready?<br>
    Start it today. And let me know how it goes. 🚀</p>
  `
}

async function addBlogPost() {
  try {
    const docRef = await addDoc(collection(db, 'posts'), blogPost)
    console.log('Blog post added with ID:', docRef.id)
  } catch (error) {
    console.error('Error adding blog post:', error)
  }
}

addBlogPost() 