const db = {
  POSTS: [
    {
      id: 1,
      title: "Maximizing Productivity with Time Blocking",
      body: "Time blocking has been a game-changer in my daily routine. By setting aside dedicated blocks of time for specific tasks, I've been able to eliminate distractions and stay laser-focused. It helps me manage my workload efficiently and ensures that my personal time is respected. Highly recommend giving it a try if you're looking to boost your productivity!",
      userId: 101
    },
    {
      id: 2,
      title: "The Future of Full-Stack Development",
      body: "As a full-stack developer, it's exciting to see how quickly the technology landscape evolves. From serverless architectures to microservices, the possibilities are endless. It's important to keep up with new tools and trends, but also to focus on mastering the fundamentals. In the end, it's the ability to solve problems efficiently that sets the best developers apart.",
      userId: 102
    },
    {
      id: 3,
      title: "The Power of Real Estate Investment",
      body: "Real estate investment is one of the most stable ways to build wealth. Whether you're flipping houses, renting properties, or exploring commercial spaces, there’s significant potential for long-term gains. What excites me most is the ability to leverage other people's money (OPM) to scale your investments. I'm looking forward to diving deeper into this and exploring strategies for maximizing returns.",
      userId: 103
    }
  ],
  USERS: [
    {
      id: 101,
      name: "John Doe",
      username: "johndoe123",
      password: "aB1d"
    },
    {
      id: 777,
      name: "Georgi K",
      username: "topg",
      password: "top_g"
    },
    {
      id: 102,
      name: "Jane Smith",
      username: "janesmith456",
      password: "zX9p"
    },
    {
      id: 103,
      name: "George Martin",
      username: "georgemartin789",
      password: "sW2v"
    }
  ],
  SESSIONS: []
}

module.exports = {
  db
}