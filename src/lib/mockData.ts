import type { Article, Author, Tag } from '@/types';

export const MOCK_AUTHOR: Author = {
  id: '1',
  name: 'Bappaditya Roy',
  avatar: 'https://ui-avatars.com/api/?name=Bappaditya+Roy&background=6366f1&color=fff&size=256',
  bio: 'Software Engineer passionate about distributed systems, clean architecture, and teaching.',
  github: 'https://github.com/bappadityaroy',
  twitter: 'https://twitter.com/bappadityaroy',
  linkedin: 'https://linkedin.com/in/bappadityaroy',
};

export const MOCK_TAGS: Tag[] = [
  { id: '1', slug: 'java', name: 'Java', articleCount: 18 },
  { id: '2', slug: 'spring-boot', name: 'Spring Boot', articleCount: 14 },
  { id: '3', slug: 'microservices', name: 'Microservices', articleCount: 12 },
  { id: '4', slug: 'kafka', name: 'Kafka', articleCount: 9 },
  { id: '5', slug: 'system-design', name: 'System Design', articleCount: 15 },
  { id: '6', slug: 'docker', name: 'Docker', articleCount: 10 },
  { id: '7', slug: 'kubernetes', name: 'Kubernetes', articleCount: 8 },
  { id: '8', slug: 'ai', name: 'AI', articleCount: 16 },
  { id: '9', slug: 'machine-learning', name: 'Machine Learning', articleCount: 13 },
  { id: '10', slug: 'llm', name: 'LLM', articleCount: 11 },
  { id: '11', slug: 'databases', name: 'Databases', articleCount: 12 },
  { id: '12', slug: 'postgresql', name: 'PostgreSQL', articleCount: 7 },
  { id: '13', slug: 'redis', name: 'Redis', articleCount: 8 },
  { id: '14', slug: 'design-patterns', name: 'Design Patterns', articleCount: 14 },
  { id: '15', slug: 'clean-code', name: 'Clean Code', articleCount: 10 },
  { id: '16', slug: 'interview', name: 'Interview', articleCount: 20 },
  { id: '17', slug: 'career', name: 'Career', articleCount: 9 },
  { id: '18', slug: 'productivity', name: 'Productivity', articleCount: 7 },
  { id: '19', slug: 'python', name: 'Python', articleCount: 8 },
  { id: '20', slug: 'rest-api', name: 'REST API', articleCount: 11 },
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: '101',
    slug: 'what-is-multi-agent-ai-bengali',
    title: 'Multi-Agent AI কী? AI Agent কি শুধু অন্য Agent-কে Call করে, নাকি নিজে Decision নিতে পারে?',
    description: 'বর্তমানে AI application তৈরি করতে গেলে আমরা অনেকেই AI Agent, Multi-Agent System, Orchestrator—এই শব্দগুলো শুনি। কিন্তু আসলে Multi-Agent AI কী?',
    content: `# Multi-Agent AI কী? AI Agent কি শুধু অন্য Agent-কে Call করে, নাকি নিজে Decision নিতে পারে?

বর্তমানে AI application তৈরি করতে গেলে আমরা অনেকেই **AI Agent**, **Multi-Agent System**, **Orchestrator**—এই শব্দগুলো শুনি। কিন্তু আসলে Multi-Agent AI কী?

একজন Agent কি শুধু আরেকজন Agent-কে call করে?

নাকি Agent নিজের মতো করে সিদ্ধান্ত নিতে পারে?

এই প্রশ্নগুলোর উত্তর বুঝতে হলে প্রথমে আমাদের **Simple AI Workflow**, **Orchestrator**, এবং **Multi-Agent System**—এই তিনটি বিষয় আলাদা করে বুঝতে হবে।

---

## ১. Simple AI Workflow কী?

ধরা যাক, আমি একটি application তৈরি করেছি যেখানে user database সম্পর্কে natural language-এ প্রশ্ন করতে পারে।

User প্রশ্ন করল:

> "আমাদের company-তে মোট কতজন employee আছে?"

আমার application-এর flow:

\`\`\`text
User Question
      |
      ▼
Gemini
(Generate SQL)
      |
      ▼
Validate SQL
      |
      ▼
Execute via JDBC
      |
      ▼
Gemini
(Analyze Result)
      |
      ▼
Final Response
\`\`\`

এখানে flow সম্পূর্ণ fixed।

প্রথমে Gemini SQL তৈরি করবে।

তারপর SQL validate হবে।

তারপর JDBC দিয়ে database-এ query execute হবে।

তারপর Gemini database result analyze করে user-কে answer দেবে।

এই architecture কাজ করে, কিন্তু এখানে একটি বড় limitation আছে।

**AI কোনো decision নিচ্ছে না।**

কারণ user যদি জিজ্ঞেস করে:

> "Hello"

তবুও application হয়তো SQL generate করার চেষ্টা করবে।

আবার user যদি জিজ্ঞেস করে:

> "LEFT JOIN কী?"

তাহলেও SQL generate করার চেষ্টা হতে পারে।

অর্থাৎ আমাদের workflow হলো:

\`\`\`text
A → B → C → D
\`\`\`

প্রতিবার একই sequence follow হচ্ছে।

এটি একটি **workflow**, কিন্তু এখনো একটি intelligent agentic system নয়।

---

# ২. তাহলে Orchestrator কী?

এখন আমরা application-এর মধ্যে একটি নতুন component যোগ করলাম:

\`\`\`text
                  User Question
                        |
                        ▼
                Orchestrator
                        |
          +-------------+-------------+
          |             |             |
          ▼             ▼             ▼
      SQL Agent     Chat Agent    Report Agent
          |
          ▼
       JDBC
          |
          ▼
    Result Analysis
          |
          ▼
      Response
\`\`\`

এখন user যখন প্রশ্ন করবে, তখন সরাসরি SQL Agent-কে call করা হবে না।

প্রথমে প্রশ্ন যাবে **Orchestrator-এর কাছে**।

Orchestrator প্রশ্নটি বুঝে সিদ্ধান্ত নেবে:

> "এই প্রশ্নের উত্তর দিতে কোন Agent বা Tool-এর সাহায্য লাগবে?"

এখান থেকেই system intelligent হতে শুরু করে।

---

# ৩. Orchestrator কীভাবে Decision নেয়?

ধরা যাক user বলল:

> "Hi"

Orchestrator বুঝতে পারল:

\`\`\`text
Intent = Greeting
\`\`\`

তখন সে সিদ্ধান্ত নেবে:

\`\`\`text
SQL Agent দরকার নেই।

Chat Agent ব্যবহার করো।
\`\`\`

Flow:

\`\`\`text
User
 |
 ▼
Orchestrator
 |
 ▼
Chat Agent
 |
 ▼
Response
\`\`\`

---

আবার user জিজ্ঞেস করল:

> "আমাদের database-এ মোট কতজন employee আছে?"

Orchestrator বুঝল:

\`\`\`text
Intent = Database Query
\`\`\`

এবার সিদ্ধান্ত:

\`\`\`text
Schema দরকার
SQL Generate করতে হবে
SQL Validate করতে হবে
Database Execute করতে হবে
Result Analyze করতে হবে
\`\`\`

Flow:

\`\`\`text
User
 |
 ▼
Orchestrator
 |
 ▼
Schema Agent
 |
 ▼
SQL Agent
 |
 ▼
SQL Validator
 |
 ▼
JDBC
 |
 ▼
Result Agent
 |
 ▼
Orchestrator
 |
 ▼
Final Response
\`\`\`

এখানে Orchestrator নিজেই decide করছে কোন step প্রয়োজন।

---

# ৪. Multi-Agent AI কোথায় আসে?

এখন ধরুন আমাদের application-এ অনেকগুলো specialized Agent আছে।

\`\`\`text
                 Orchestrator
                      |
        +-------------+-------------+
        |             |             |
        ▼             ▼             ▼
   SQL Agent      Chat Agent    Report Agent
        |
        ▼
   Database
\`\`\`

প্রতিটি Agent-এর আলাদা responsibility।

### SQL Agent

Database-এর জন্য SQL তৈরি করবে।

### Chat Agent

General conversation handle করবে।

### Report Agent

Complex report তৈরি করবে।

### Chart Agent

Data থেকে graph বা visualization তৈরি করবে।

### Research Agent

External information সংগ্রহ করবে।

এখন Orchestrator user-এর request বুঝে এক বা একাধিক Agent ব্যবহার করতে পারে।

এটাই হলো Multi-Agent Architecture-এর একটি basic form।

---

# ৫. Agent কি অন্য Agent-কে Call করতে পারে?

হ্যাঁ।

একটি Agent অন্য Agent-কে call করতে পারে।

উদাহরণ:

\`\`\`text
Research Agent
      |
      ▼
Data Agent
      |
      ▼
Analysis Agent
      |
      ▼
Report Agent
\`\`\`

এখানে Research Agent অন্য Agent-দের ব্যবহার করছে।

এটি Multi-Agent System-এর একটি implementation।

কিন্তু এখানে একটি গুরুত্বপূর্ণ বিষয় আছে।

যদি সবকিছু fixed থাকে:

\`\`\`text
Research
   ↓
Data
   ↓
Analysis
   ↓
Report
\`\`\`

তাহলে এটি অনেকটা workflow-এর মতো।

এখানে Agent শুধু নির্দিষ্ট sequence follow করছে।

---

# ৬. আসল Intelligent Orchestrator

আরও advanced system-এ Orchestrator আগে থেকে জানে না যে কোন Agent-কে কখন call করতে হবে।

সে পরিস্থিতি অনুযায়ী সিদ্ধান্ত নিতে পারে।

ধরা যাক user বলল:

> "গত ৬ মাসে আমাদের sales কেমন হয়েছে? একটা graph তৈরি করে দাও।"

Orchestrator চিন্তা করতে পারে:

\`\`\`text
User wants sales data.

Need database access.

Need SQL.

After getting result,
user also wants visualization.

Therefore:

1. SQL Agent
2. Database Tool
3. Analysis Agent
4. Chart Agent
\`\`\`

Flow:

\`\`\`text
                 User
                  |
                  ▼
             Orchestrator
                  |
                  ▼
              SQL Agent
                  |
                  ▼
              JDBC Tool
                  |
                  ▼
            Analysis Agent
                  |
                  ▼
              Chart Agent
                  |
                  ▼
             Orchestrator
                  |
                  ▼
               User
\`\`\`

এখানে Orchestrator শুধু Agent call করছে না।

সে **পরিকল্পনা করছে**।

---

# ৭. আরও Advanced Scenario: Agent নিজেই সমস্যা বুঝে Decision নেয়

ধরা যাক SQL Agent একটি SQL তৈরি করল।

\`\`\`sql
SELECT COUNT(*) FROM employee;
\`\`\`

কিন্তু database-এ table-এর নাম \`employees\`।

Execution failed।

এখন একটি simple workflow হলে application error return করবে।

কিন্তু একটি intelligent agentic system-এ Orchestrator error দেখতে পারে।

সে সিদ্ধান্ত নিতে পারে:

\`\`\`text
SQL Execution Failed.

Reason:
Table "employee" does not exist.

Next Action:
Ask Schema Agent.
\`\`\`

Schema Agent বলল:

\`\`\`text
Correct table name = employees
\`\`\`

তারপর Orchestrator সিদ্ধান্ত নিল:

\`\`\`text
Call SQL Agent again.
\`\`\`

SQL Agent নতুন query তৈরি করল:

\`\`\`sql
SELECT COUNT(*) FROM employees;
\`\`\`

তারপর আবার execution।

এবার success।

Flow:

\`\`\`text
User
 |
 ▼
Orchestrator
 |
 ▼
SQL Agent
 |
 ▼
JDBC
 |
 X
SQL Error
 |
 ▼
Orchestrator
 |
 ▼
Schema Agent
 |
 ▼
Orchestrator
 |
 ▼
SQL Agent
 |
 ▼
JDBC
 |
 ▼
Success
\`\`\`

এখানে system একটি fixed pipeline নয়।

এটি situation অনুযায়ী নিজের execution path পরিবর্তন করছে।

এটাই Agentic AI-এর একটি গুরুত্বপূর্ণ বৈশিষ্ট্য।

---

# ৮. Agent কি নিজে নিজে Decision নিতে পারে?

হ্যাঁ।

একটি Agent-এর কাছে সাধারণত থাকতে পারে:

\`\`\`text
Goal
Memory
Tools
Reasoning
Planning
Decision Making
\`\`\`

উদাহরণ:

একটি SQL Agent-এর goal:

> "User-এর database-related প্রশ্নের উত্তর দেওয়া।"

তার কাছে tools:

\`\`\`text
Schema Tool
SQL Generator
SQL Validator
JDBC Tool
\`\`\`

Agent decide করতে পারে:

\`\`\`text
প্রথমে Schema দরকার?
      |
      +-- Yes → Schema Tool
      |
      +-- No → SQL Generate

SQL valid?
      |
      +-- No → Fix SQL
      |
      +-- Yes → Execute

Execution failed?
      |
      +-- Yes → Investigate
      |
      +-- No → Analyze Result
\`\`\`

এখানে Agent নিজের goal achieve করার জন্য available tools ব্যবহার করছে।

---

# ৯. Multi-Agent System-এর তিনটি Level

আমরা Multi-Agent AI-কে সহজভাবে তিনটি level-এ ভাবতে পারি।

## Level 1: Fixed Workflow

\`\`\`text
A → B → C → D
\`\`\`

সবকিছু predetermined।

এটি predictable এবং production-এর জন্য সহজ।

---

## Level 2: Orchestrated Multi-Agent System

\`\`\`text
             Orchestrator
             /     |     \\
            /      |      \\
         Agent   Agent   Agent
\`\`\`

Orchestrator decide করে:

* কোন Agent লাগবে
* কোন order-এ লাগবে
* কোন Agent-এর output পরের Agent-কে দিতে হবে

এটি production AI application-এর জন্য খুব practical architecture।

---

## Level 3: Autonomous Multi-Agent System

\`\`\`text
Agent A ←→ Agent B
   ↕           ↕
Agent C ←→ Agent D
\`\`\`

এখানে Agents নিজেদের মধ্যে communicate করতে পারে।

একটি Agent বলতে পারে:

> "আমার এই information দরকার।"

অন্য Agent বলতে পারে:

> "আমি সেটা provide করতে পারি।"

আবার কোনো Agent বলতে পারে:

> "এই approach কাজ করছে না। অন্য strategy try করা উচিত।"

এখানে system অনেক বেশি autonomous হয়ে যায়।

---

# ১০. আমার Current Application কীভাবে Multi-Agent System-এ Convert করা যায়?

আমার current application:

\`\`\`text
User
 |
 ▼
Gemini
 |
 ▼
Generate SQL
 |
 ▼
Validate
 |
 ▼
JDBC
 |
 ▼
Gemini
 |
 ▼
Response
\`\`\`

আমি এটিকে ধীরে ধীরে পরিবর্তন করতে পারি:

\`\`\`text
                    User
                     |
                     ▼
                Orchestrator
                     |
          +----------+----------+
          |                     |
          ▼                     ▼
      Chat Agent           Database Agent
                                |
                         +------+------+
                         |             |
                         ▼             ▼
                    Schema Agent   SQL Agent
                                       |
                                       ▼
                                  JDBC Tool
                                       |
                                       ▼
                                  Result Agent
                                       |
                                       ▼
                                 Orchestrator
\`\`\`

এখানে Orchestrator decide করবে:

\`\`\`text
User-এর প্রশ্ন কি database-related?

        |
        +-- No → Chat Agent
        |
        +-- Yes
              |
              ▼
        Database Agent
              |
              ▼
        Schema দরকার?
              |
              ▼
          SQL Agent
              |
              ▼
          JDBC Tool
              |
              ▼
       Result Analysis
\`\`\`

এভাবে আমার বর্তমান simple application-কে আমি একটি **Agentic Multi-Agent AI System**-এ evolve করতে পারি।

---

# ১১. সবচেয়ে গুরুত্বপূর্ণ বিষয়

Multi-Agent AI মানেই এই নয় যে:

> "একজন Agent অন্য Agent-কে call করবে।"

এটি Multi-Agent System-এর একটি অংশ।

একটি mature Multi-Agent System-এ থাকতে পারে:

\`\`\`text
Agents
   +
Orchestrator
   +
Tools
   +
Memory
   +
Planning
   +
Decision Making
   +
Agent-to-Agent Communication
\`\`\`

সবচেয়ে গুরুত্বপূর্ণ হলো **decision making**।

একটি simple workflow বলে:

> "প্রথমে A, তারপর B, তারপর C করো।"

একটি intelligent orchestrator বলে:

> "User-এর goal কী?"

> "কোন Agent দরকার?"

> "কোন tool ব্যবহার করব?"

> "এই step সফল হয়েছে কি?"

> "ব্যর্থ হলে কী করব?"

> "আরও কোনো Agent-এর সাহায্য দরকার কি?"

> "কখন কাজ শেষ হয়েছে বলে ধরে নেব?"

এই difference-টাই একটি সাধারণ AI workflow এবং একটি Agentic AI System-এর মধ্যে বড় পার্থক্য তৈরি করে।

---

# Conclusion

আমার মতে, একটি বড় Multi-Agent AI System তৈরি করার আগে একটি ছোট system দিয়ে শুরু করা সবচেয়ে ভালো।

প্রথমে:

\`\`\`text
User
 ↓
Orchestrator
 ↓
SQL Agent
 ↓
JDBC
 ↓
Result
\`\`\`

এরপর যোগ করা যায়:

\`\`\`text
Schema Agent
Chat Agent
Chart Agent
Report Agent
Memory
Retry
Error Recovery
\`\`\`

শেষে Orchestrator-কে এমনভাবে তৈরি করা যায় যাতে সে নিজেই decide করতে পারে:

\`\`\`text
কোন Agent ব্যবহার করব?
কোন Tool ব্যবহার করব?
কোন order-এ কাজ করব?
ব্যর্থ হলে কী করব?
আরও information দরকার কি?
কখন task complete?
\`\`\`

তখন আমার application আর শুধু একটি fixed AI pipeline থাকবে না।

এটি ধীরে ধীরে একটি **intelligent, decision-making, multi-agent AI system**-এ পরিণত হবে।

এবং এখানেই Multi-Agent AI-এর আসল শক্তি—**শুধু এক Agent আরেক Agent-কে call করা নয়, বরং বিভিন্ন Agent-এর capabilities ব্যবহার করে একটি বড় goal অর্জনের জন্য intelligent decision নেওয়া।**`,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    category: 'AI',
    categorySlug: 'ai',
    tags: ['ai', 'multi-agent', 'orchestrator'],
    author: MOCK_AUTHOR,
    publishedAt: '2026-07-21T10:00:00Z',
    readingTime: 8,
    featured: true,
    views: 850,
    tableOfContents: [],
  },
  {
    id: '100',
    slug: 'low-level-design-elevator-system',
    title: 'Low-Level Design of an Elevator System in Java Step-by-Step Approach',
    description: 'Every Low-Level Design (LLD) problem can look overwhelming at first. This article covers a structured approach to designing an Elevator System from scratch using plain Java.',
    content: `Every Low-Level Design (LLD) problem can look overwhelming at first. Many developers jump directly into coding, only to realize later that they missed important design decisions.

Over time, I found that following a structured approach makes every LLD problem much easier to solve. Instead of thinking about classes immediately, I first focus on understanding the problem, identifying entities, defining responsibilities, and then implementing the solution.

This same approach works not only for Elevator System but also for Parking Lot, Splitwise, Hotel Booking, Snake & Ladder, Tic-Tac-Toe, and many other design problems.

In this article, we’ll design an Elevator System from scratch using plain Java.

## 📋 Requirements
Before writing any code, understand what the system should do.

### Functional Requirements
1. A user can call an elevator from any floor.
2. The user specifies the direction (UP/DOWN).
3. The system assigns the best elevator.
4. The elevator moves to the requested floor.
5. The elevator door opens.
6. Passenger enters the elevator.
7. Passenger selects the destination floor.
8. Elevator moves to the destination.
9. Door opens.
10. Passenger exits.
11. Door closes.
12. Elevator becomes idle.

## 🏗️ Identify Entities
Central entity/core entity will be Elevator, everything revolves around this.

### Elevator
- id
- currentFloor
- direction
- doorStatus
- elevatorStatus

### Building
- id
- List<Floor>
- List<Elevator>

### Floor
- floorNumber

### Door
- DoorStatus

## 🔗 Relationships
- Building -> Floor (one to Many)
- Building -> Elevator (one to many)
- Elevator -> Door (one to many)

## ⚙️ Business APIs
**External request flow:**
callElevator(floor, direction)

**Internal request flow:**
selectFloor(elevator, destinationFloor)

## 🧠 Service Responsibilities
callElevator() -> Find Best Elevator -> Move Elevator -> Open Door -> Passenger Enters -> selectFloor() -> Close Door -> Move Elevator -> Open Door -> Passenger Exits -> Close Door -> Elevator becomes IDLE

Each method should have a single responsibility, making the code easier to maintain and extend.

## 🚀 Execution Flow
User presses UP button -> Elevator Orchestrator -> ElevatorService.callElevator() -> Strategy selects nearest elevator -> Elevator moves -> Door opens -> Passenger enters

## ⚙️ Code

### Enums

#### Direction
\`\`\`java
public enum Direction {
    UP,
    DOWN
}
\`\`\`

#### DoorStatus
\`\`\`java
public enum DoorStatus {
    DOOR_OPEN,
    DOOR_CLOSED,
}
\`\`\`

#### ElevatorStatus
\`\`\`java
public enum ElevatorStatus {
    IDLE,
    MOVING_UP,
    MOVING_DOWN,
}
\`\`\`

### Entities

#### Building
\`\`\`java
public class Building { 
    int id;
    List<Floor> floors;
    List<Elevator> elevators;

    public List<Elevator> getElevators() {
        return elevators;
    }

    public List<Floor> getFloors() {
        return floors;
    }

    public Building(int id,List<Floor> floors,List<Elevator> elevators) {
        this.id = id;
        this.elevators=elevators;
        this.floors=floors;
    }
}
\`\`\`

#### Door
\`\`\`java
public class Door {

    DoorStatus doorStatus;

    public Door(DoorStatus doorStatus) {
        this.doorStatus = doorStatus;
    }

    public DoorStatus getDoorStatus() {
        return doorStatus;
    }

    public void setDoorStatus(DoorStatus doorStatus) {
        this.doorStatus = doorStatus;
    }
}
\`\`\`

#### Elevator
\`\`\`java
public class Elevator {

    int id;
    Door door;
    ElevatorStatus elevatorStatus;
    int currentFloor;
    Direction direction;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCurrentFloor(int currentFloor) {
        this.currentFloor = currentFloor;
    }

    public ElevatorStatus getElevatorStatus() {
        return elevatorStatus;
    }

    public void setElevatorStatus(ElevatorStatus elevatorStatus) {
        this.elevatorStatus = elevatorStatus;
    }

    public int getCurrentFloor() {
        return currentFloor;
    }

    public void openDoor() {
        door.setDoorStatus(DoorStatus.DOOR_OPEN);
    }

    public void closeDoor() {
        door.setDoorStatus(DoorStatus.DOOR_CLOSED);
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }

    public Elevator(int id, Direction direction, int currentFloor, Door door, ElevatorStatus elevatorStatus) {
        this.id = id;
        this.direction = direction;
        this.currentFloor = currentFloor;
        this.door = door;
        this.elevatorStatus = elevatorStatus;
    }
}
\`\`\``,
    thumbnail: 'https://images.unsplash.com/photo-1541888079549-063f274e144a?w=800&q=80',
    category: 'System Design',
    categorySlug: 'system-design',
    tags: ['system-design', 'java', 'interview'],
    author: MOCK_AUTHOR,
    publishedAt: '2026-07-13T10:00:00Z',
    readingTime: 5,
    featured: true,
    views: 1240,
    tableOfContents: [],
  },
];
